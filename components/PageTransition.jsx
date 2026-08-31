"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const PageTransitionContext = createContext(null);

// Horizontal bands that slide in from the right, each one staggered behind the
// band below it, so the leading edge reads as a diagonal staircase.
// Keep STRIPES / the timings in sync with the .page-wipe rules in globals.css:
//   cover  = STRIPE_MS + (STRIPES - 1) * STAGGER_MS
//   reveal = STRIPE_OUT_MS + (STRIPES - 1) * STAGGER_MS
const STRIPES = 5;
const COVER_MS = 640;
const REVEAL_MS = 600;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PageTransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // "idle" -> "covering" (bands slide in over the old page)
  // -> "revealing" (bands slide off, showing the new page) -> "idle"
  const [phase, setPhase] = useState("idle");

  // Set while a transition is in flight, so the pathname effect below knows the
  // navigation it is seeing is one we started (and where to scroll afterwards).
  const pendingRef = useRef(null);
  const phaseRef = useRef("idle");
  phaseRef.current = phase;

  const navigate = useCallback(
    (href) => {
      // A second click mid-transition would strand pendingRef on a route we
      // never navigate to.
      if (phaseRef.current !== "idle") return;

      const url = new URL(href, window.location.href);
      const target = url.pathname + url.search + url.hash;

      if (prefersReducedMotion()) {
        router.push(target);
        return;
      }

      pendingRef.current = { pathname: url.pathname, hash: url.hash };
      setPhase("covering");

      // Push once the bands fully cover the viewport, so the swap and the
      // browser's scroll reset both happen behind them.
      window.setTimeout(() => router.push(target), COVER_MS);

      // Failsafe: if the route never commits, lift the bands anyway rather
      // than leaving the site covered and unusable.
      window.setTimeout(() => {
        if (pendingRef.current) {
          pendingRef.current = null;
          setPhase("revealing");
        }
      }, COVER_MS + 2500);
    },
    [router]
  );

  // The new route has rendered: put the viewport where it belongs, then pull
  // the bands away.
  useEffect(() => {
    const pending = pendingRef.current;
    if (!pending || pending.pathname !== pathname) return;
    pendingRef.current = null;

    let inner = 0;
    const outer = requestAnimationFrame(() => {
      const el = pending.hash ? document.querySelector(pending.hash) : null;
      if (el) {
        el.scrollIntoView({ behavior: "instant", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }

      // Second frame: the scroll above and the incoming page's first paint have
      // both landed, so the bands pull away over a settled page instead of one
      // still mid-layout.
      inner = requestAnimationFrame(() => setPhase("revealing"));
    });

    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [pathname]);

  useEffect(() => {
    if (phase !== "revealing") return;
    const id = window.setTimeout(() => setPhase("idle"), REVEAL_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  // One delegated listener instead of swapping every <a> for a custom
  // component: catches the nav, the logo, the CTAs and next/link alike.
  useEffect(() => {
    const onClick = (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!(e.target instanceof Element)) return;

      const anchor = e.target.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const raw = anchor.getAttribute("href");
      if (!raw || raw.startsWith("mailto:") || raw.startsWith("tel:")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      // Static files (the resume PDF, images) must keep their normal behaviour.
      if (/\.[a-z0-9]+$/i.test(url.pathname)) return;

      if (url.pathname === window.location.pathname) {
        // Anchor on the current page: the browser's native smooth scroll is
        // exactly right, and a full-screen wipe for it would be obnoxious.
        if (url.hash) return;

        // Self-link with no hash -- the logo while already on the home page.
        // Left alone the browser treats it as a fresh navigation and reloads,
        // which is the very "loading a new page" feel we are removing.
        if (raw !== "#") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      e.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    };

    // Capture phase on purpose. next/link attaches its own click handler and
    // calls preventDefault() itself, so a bubble-phase listener would always
    // see next/link's navigation as already handled and skip the transition --
    // which is why <Link href="/work"> used to jump straight to the page while
    // the plain <a> links animated. Running first lets us preventDefault before
    // next/link decides, and it bails out when it sees defaultPrevented.
    // We deliberately do NOT stopPropagation: React onClick handlers on the
    // links (e.g. closing the mobile menu) still need to run.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  return (
    <PageTransitionContext.Provider value={{ navigate, phase }}>
      {children}
      {phase !== "idle" && (
        <div
          className={`page-wipe page-wipe--${phase}`}
          style={{ "--n": STRIPES }}
          aria-hidden="true"
        >
          {Array.from({ length: STRIPES }, (_, i) => (
            <span key={i} className="page-wipe-stripe" style={{ "--i": i }} />
          ))}
        </div>
      )}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used within PageTransitionProvider");
  return ctx;
}
