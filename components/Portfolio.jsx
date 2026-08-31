"use client";

import React, { useEffect, useState, useRef } from "react";
import { Github, Mail, ExternalLink, X, Code2, FlaskConical, Rocket, Trophy, GraduationCap, Linkedin, Instagram, Award, Minus } from "lucide-react";
import Link from "next/link";
import { PROJECTS } from "../data/projects";
import Header from "./Header";
import TypewriterTitle from "./TypewriterTitle";
import Reveal from "./Reveal";

const SKILLS = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "Angular", "TypeScript", "Tailwind CSS"],
  },
  {
    group: "Mobile",
    items: ["React Native", "Expo"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express.js", "C#", "Python", "REST APIs"],
  },
  {
    group: "Data & Design",
    items: ["MySQL", "Supabase", "MongoDB", "PostgreSQL", "Figma", "Photoshop", "Illustrator"],
  },
];

const WHAT_I_CAN_DO = [
  {
    group: "Web & Mobile Development",
    description:
      "Building high-performance web and mobile applications end to end - from typed, component-driven frontends to APIs and databases - with a focus on clean code, speed, and great UX.",
    visual: "dev",
    size: "large",
    items: [
      "React",
      "Next.js",
      "Angular",
      "TypeScript",
      "React Native",
      "Expo",
      "Node.js",
      "Express.js",
      "C#",
      "Python",
      "MySQL",
      "Supabase",
      "Testing",
      "AI-Assisted Development",
    ],
  },
  {
    group: "Creative & UI Design",
    description: "Designing beautiful, intuitive interfaces and brand visuals - turning ideas into polished prototypes and developer-ready designs.",
    visual: "design",
    items: [
      "UI/UX Design",
      "Figma",
      "Prototyping",
      "Photoshop",
      "Illustrator",
      "Branding",
      "Design Systems",
      "Responsive Design",
    ],
  },
];

const SOCIALS = [
  { label: "Email", value: "pauco.filip1@gmail.com", href: "mailto:pauco.filip1@gmail.com", icon: Mail, color: "#000000" },
  { label: "GitHub", value: "github.com/Cajam11", href: "https://github.com/Cajam11", icon: Github, color: "#000000" },
  { label: "LinkedIn", value: "linkedin.com/in/filip-pauco", href: "https://www.linkedin.com/in/filip-pau%C4%8Do/", icon: Linkedin, color: "#000000" },
  { label: "Instagram", value: "instagram.com/fil_1pp", href: "https://instagram.com/fil_1pp", icon: Instagram, color: "#000000" },
];

const CARDS = [
  "Disciplined",
  "Creative",
  "Detail-Oriented",
  "Reliable",
  "Fast Learner",
  "Ambitious",
  "Team Player",
  "Consistent",
  "User-Focused",
  "Problem Solver",
];

// Fixed "chaotic" rotation/offset per card so each trait keeps its own
// scattered position as it cycles through the stack (looks like a messy
// pile of photos rather than a neat deck).
const CARD_SCATTER = [
  { rot: -7, x: 6, y: -4 },
  { rot: 5, x: -8, y: 3 },
  { rot: -3, x: 10, y: 6 },
  { rot: 9, x: -5, y: -6 },
  { rot: -10, x: 4, y: 5 },
  { rot: 4, x: -10, y: -2 },
  { rot: -5, x: 9, y: -5 },
  { rot: 8, x: -3, y: 7 },
  { rot: -8, x: 7, y: 2 },
  { rot: 3, x: -6, y: -7 },
];

const CURRENTLY = [
  { icon: Rocket, label: "Building", detail: "Tap-it - gym & fitness SaaS" },
  { icon: Code2, label: "Shipping", detail: "Reward - fashion marketplace" },
  { icon: GraduationCap, label: "Studying", detail: "Programming & Digital Technologies" },
];

const CERTIFICATIONS = [
  { title: "Claude Code in Action", issuer: "Anthropic" },
  { title: "Claude Code 101", issuer: "Anthropic" },
];

const EDUCATION = [
  {
    school: "Stredná priemyselná škola Zochova",
    degree: "High School Diploma - Programovanie digitálnych technológií",
    date: "September 2023 - June 2027",
  },
  {
    school: "ZŠ Vazovova",
    degree: "Primary and lower secondary education",
    date: "September 2014 - July 2023",
  },
];

// Roles from my LinkedIn. Tap-it leads (my own product), the rest is
// reverse-chronological. `images` is optional - add a photo array to any entry
// and it renders the photo stack instead of the meta panel.
const EXPERIENCE = [
  {
    title: "Founder & CEO",
    org: "Tap-it",
    date: "March 2026 - Present",
    location: "Slovakia",
    desc: "Building a SaaS platform for gym and fitness center management, with both web and mobile applications. Features I have developed include QR code member check-ins, real-time gym occupancy tracking, Stripe-powered subscription billing, membership and transaction management, a booking system for trainers and group workouts, an analytics dashboard and admin panel, and employee shift management.",
    tags: ["SaaS", "Web & Mobile", "QR Check-ins", "Stripe Billing", "Analytics", "Admin Panel"],
    certificates: [],
  },
  {
    title: "Mobile Application Developer",
    org: "MS Digital s.r.o",
    date: "July 2026 - Present",
    location: "Bratislava, Slovakia",
    imageLeft: true,
    desc: "Developing mobile applications for everyday use - building intuitive, reliable apps that people actually open every day. I am involved across the full cycle, from concept and design through development to a finished product in the user's hands.",
    tags: ["Mobile Development", "Product Design", "Full Cycle"],
    certificates: [],
  },
  {
    title: "Administrative Assistant",
    org: "OVB Allfinanz Slovensko",
    date: "July 2026 - Present",
    location: "Bratislava, Slovakia",
    desc: "Versatile administrative assistant - from office tasks to warehouse and hands-on support. Helping with whatever needs doing, whether at a desk or on the floor.",
    tags: ["Administration", "Operations", "Hands-on Support"],
    certificates: [],
  },
  {
    title: "IT Intern",
    subtitle: "Erasmus+ internship",
    org: "KV-Media Studio - kreativní a multimediální studio",
    date: "May 2026",
    location: "Ostrava, Czechia",
    imageLeft: true,
    desc: "Completed technical tasks focused on web development, improved my practical programming skills, and gained experience working in a professional IT environment. I was also responsible for testing the company's CRM application, identifying bugs and usability issues, and creating detailed reports based on the testing process.",
    tags: ["Web Development", "QA / Testing", "Bug Reporting", "Erasmus+"],
    certificates: [],
  },
  {
    title: "Software Developer",
    org: "Reward",
    date: "November 2025 - Present",
    location: "Slovakia",
    desc: "Building Reward, a modern fashion marketplace focused on second-hand shopping, aimed at making buying and selling clothing more seamless, social, and personalized. I design and develop the full-stack marketplace from the ground up: role-based platform architecture for users, brands and admins, real-time dashboards and admin tools, product discovery with search, filtering and favorites, user and brand onboarding flows, Supabase for authentication, database and backend logic, a user-to-user messaging system, and a fully responsive, production-ready UI.",
    tags: ["Full-Stack", "Supabase", "Marketplace", "Real-time Dashboards", "Auth", "Responsive UI"],
    certificates: [],
  },
  {
    title: "IT Intern",
    org: "DXC Technology",
    date: "May 2025 - June 2025",
    location: "Bratislava, Slovakia",
    imageLeft: true,
    desc: "A two-month IT internship at DXC Technology in Bratislava.",
    tags: ["Internship", "IT"],
    certificates: [],
  },
  {
    title: "IT Intern",
    subtitle: "Erasmus+ internship",
    org: "Expertgroup - Tolaptop.gr",
    date: "October 2024",
    location: "Thessaloniki, Greece",
    desc: "An Erasmus+ internship at a device repair company, where we mainly worked on repairing and diagnosing laptops. I gained a lot of skills, both in hands-on work with devices and in diagnosing them using various software tools.",
    tags: ["Hardware", "Diagnostics", "Erasmus+"],
    certificates: [],
  },
  {
    title: "IT Assistant",
    org: "The Nuclear Regulatory Authority of the Slovak Republic",
    date: "August 2024",
    location: "Bratislava, Slovakia",
    imageLeft: true,
    desc: "Worked on the development of an application in IBM Lotus Notes aimed at digitalizing internal processes. The work included designing the database structure, creating forms and views, and implementing workflow automation. Through this project I improved my programming and database management skills.",
    tags: ["IBM Lotus Notes", "Databases", "Workflow Automation"],
    certificates: [],
  },
];

// Same click-to-flick mechanic as the About-me trait cards: the front image
// flies off and the next one in the pile takes its place.
function ExperienceImageStack({ images, title }) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  return (
    <div
      className="experience-image-stack"
      onClick={() => setIndex((prev) => (prev + 1) % count)}
    >
      {images.map((src, i) => {
        const offset = (i - index + count) % count;
        const isExiting = offset === count - 1;
        // Only the front 3 images and the one that just got flicked away are rendered.
        if (offset > 2 && !isExiting) return null;

        const scatter = CARD_SCATTER[i % CARD_SCATTER.length];
        let style;

        if (isExiting) {
          style = {
            "--tx": `${scatter.x + 100}px`,
            "--ty": `${scatter.y - 40}px`,
            "--rot": `${scatter.rot + 25}deg`,
            "--sc": 0.88,
            "--op": 0,
            zIndex: 5,
          };
        } else {
          const depth = offset;
          const isFront = depth === 0;
          const calm = 0.4; // dampens the scatter chaos for the album stack
          const dir = depth % 2 === 1 ? -1 : 1; // alternate: mid card peeks up, back card peeks down
          style = {
            "--tx": isFront ? "0px" : `${scatter.x * calm + depth * 8}px`,
            "--ty": isFront ? "0px" : `${scatter.y * calm + dir * depth * 10}px`,
            "--rot": isFront ? "0deg" : `${scatter.rot * calm + depth * (scatter.rot >= 0 ? 1.5 : -1.5)}deg`,
            "--sc": isFront ? 1 : 1 - depth * 0.06,
            "--op": isFront ? 1 : 0.75 - (depth - 1) * 0.2,
            zIndex: 30 - depth * 10,
          };
        }

        return (
          <img
            key={src}
            src={src}
            alt={`${title} ${i + 1}`}
            className={`stacked-image${offset === 0 ? " stacked-image-front" : ""}`}
            style={style}
          />
        );
      })}
    </div>
  );
}

// Mobile-only stacked album for the Work Gallery — same click-to-flick
// mechanic as the Experience section's image stack, but cycling through
// project cover images instead of a single experience's photos.
function WorkAlbumStack({ projects, activeIndex, onAdvance }) {
  const count = projects.length;

  return (
    <div className="work-mobile-stack" onClick={onAdvance}>
      {projects.map((project, i) => {
        const offset = (i - activeIndex + count) % count;
        const isExiting = offset === count - 1;
        // Only the front 3 cards and the one that just got flicked away are rendered.
        if (offset > 2 && !isExiting) return null;

        const scatter = CARD_SCATTER[i % CARD_SCATTER.length];
        let style;

        if (isExiting) {
          style = {
            "--tx": `${scatter.x + 100}px`,
            "--ty": `${scatter.y - 40}px`,
            "--rot": `${scatter.rot + 25}deg`,
            "--sc": 0.88,
            "--op": 0,
            zIndex: 5,
          };
        } else {
          const depth = offset;
          const isFront = depth === 0;
          const calm = 0.4; // dampens the scatter chaos for the album stack
          const dir = depth % 2 === 1 ? -1 : 1; // alternate: mid card peeks up, back card peeks down
          style = {
            "--tx": isFront ? "0px" : `${scatter.x * calm + depth * 8}px`,
            "--ty": isFront ? "0px" : `${scatter.y * calm + dir * depth * 10}px`,
            "--rot": isFront ? "0deg" : `${scatter.rot * calm + depth * (scatter.rot >= 0 ? 1.5 : -1.5)}deg`,
            "--sc": isFront ? 1 : 1 - depth * 0.06,
            "--op": isFront ? 1 : 0.75 - (depth - 1) * 0.2,
            zIndex: 30 - depth * 10,
          };
        }

        return (
          <img
            key={project.num}
            src={project.image}
            alt={project.title}
            className={`stacked-image${offset === 0 ? " stacked-image-front" : ""}`}
            style={style}
            draggable={false}
          />
        );
      })}
    </div>
  );
}

// Shown on the opposite side of an experience card when that role has no
// photos: real role metadata rather than a placeholder image.
function ExperienceMeta({ period, location, tags }) {
  return (
    <div className="experience-meta">
      <div className="experience-meta-row">
        <span className="experience-meta-label">Period</span>
        <span className="experience-meta-value">{period}</span>
      </div>
      {location && (
        <div className="experience-meta-row">
          <span className="experience-meta-label">Location</span>
          <span className="experience-meta-value">{location}</span>
        </div>
      )}
      {tags && tags.length > 0 && (
        <div className="experience-meta-row experience-meta-row--tags">
          <span className="experience-meta-label">Focus</span>
          <div className="experience-meta-tags">
            {tags.map((t) => (
              <span key={t} className="experience-meta-tag">{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rootRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const heroRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardPaused, setCardPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalMinimized, setIsModalMinimized] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const activeProject = PROJECTS[activeIndex];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goTo = (index) => {
    const normalized = ((index % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;
    setActiveIndex(normalized);
  };

  useEffect(() => {
    const handleMouse = (e) => {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    const syncMarqueeSpeed = () => {
      const enterSeconds = 8; // matches marquee-enter duration in CSS
      const pxPerSecond = window.innerWidth / enterSeconds; // entrance travels 100vw in 4s
      const loopDistance = track.scrollWidth / 2; // loop travels -50% of the doubled track
      const loopSeconds = loopDistance / pxPerSecond;
      // Set on the hero section (not the track itself) so every bg-name-track
      // descendant -- the center row and all mobile fill rows -- inherits the
      // exact same duration and stays in perfect sync as one cohesive animation.
      heroRef.current?.style.setProperty("--marquee-loop-duration", `${loopSeconds}s`);
    };

    syncMarqueeSpeed();
    window.addEventListener("resize", syncMarqueeSpeed);
    return () => window.removeEventListener("resize", syncMarqueeSpeed);
  }, []);

  useEffect(() => {
    if (cardPaused) return;
    const id = setInterval(() => {
      setCardIndex((prev) => (prev + 1) % CARDS.length);
    }, 1500);
    return () => clearInterval(id);
  }, [cardPaused]);

  return (
    <div
  ref={rootRef}
  className="portfolio-root"
>
      <svg className="bg-lines" viewBox="0 0 1440 5000" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{width:'100%',height:'100%'}}>
        <g opacity="0.28">
          <path d="M-100 200 C 200 100, 500 300, 800 200 C 1100 100, 1300 280, 1540 180" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 350 C 300 250, 600 400, 900 320 C 1200 240, 1400 380, 1440 300" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-80 500 C 240 420, 540 580, 840 500 C 1140 420, 1360 560, 1500 480" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
        </g>
        <g opacity="0.32">
          <path d="M0 700 C 320 620, 620 780, 920 700 C 1220 620, 1420 760, 1440 680" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-100 850 C 260 780, 560 920, 860 860 C 1160 800, 1380 940, 1540 880" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 1000 C 300 940, 600 1060, 900 1000 C 1200 940, 1400 1080, 1440 1020" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
        </g>
        <g opacity="0.22">
          <path d="M-120 1250 C 200 1180, 500 1320, 820 1260 C 1140 1200, 1340 1340, 1560 1280" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 1400 C 280 1340, 580 1460, 880 1400 C 1180 1340, 1380 1480, 1440 1420" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-60 1550 C 240 1490, 540 1610, 840 1550 C 1140 1490, 1360 1630, 1500 1570" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 1700 C 320 1640, 620 1760, 920 1700 C 1220 1640, 1420 1780, 1440 1720" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
        </g>
        <g opacity="0.3">
          <path d="M-140 1950 C 220 1880, 520 2020, 860 1960 C 1200 1900, 1400 2040, 1580 1980" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 2100 C 300 2040, 600 2160, 900 2100 C 1200 2040, 1400 2180, 1440 2120" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-80 2250 C 240 2190, 540 2310, 840 2250 C 1140 2190, 1360 2330, 1500 2270" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
        </g>
        <g opacity="0.26">
          <path d="M0 2500 C 320 2440, 620 2560, 920 2500 C 1220 2440, 1420 2580, 1440 2520" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-100 2650 C 260 2590, 560 2710, 860 2650 C 1160 2590, 1380 2730, 1540 2670" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 2800 C 300 2740, 600 2860, 900 2800 C 1200 2740, 1400 2880, 1440 2820" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-60 2950 C 240 2890, 540 3010, 840 2950 C 1140 2890, 1360 3030, 1500 2970" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
        </g>
        <g opacity="0.34">
          <path d="M-120 3250 C 200 3180, 500 3320, 820 3260 C 1140 3200, 1340 3340, 1560 3280" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 3400 C 280 3340, 580 3460, 880 3400 C 1180 3340, 1380 3480, 1440 3420" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-80 3550 C 240 3490, 540 3610, 840 3550 C 1140 3490, 1360 3630, 1500 3570" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 3700 C 320 3640, 620 3760, 920 3700 C 1220 3640, 1420 3780, 1440 3720" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
        </g>
        <g opacity="0.24">
          <path d="M-100 4050 C 260 3990, 560 4110, 860 4050 C 1160 3990, 1380 4130, 1540 4070" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 4200 C 300 4140, 600 4260, 900 4200 C 1200 4140, 1400 4280, 1440 4220" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-60 4350 C 240 4290, 540 4410, 840 4350 C 1140 4290, 1360 4430, 1500 4370" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
        </g>
        <g opacity="0.3">
          <path d="M-140 4600 C 220 4540, 520 4660, 860 4600 C 1200 4540, 1400 4680, 1580 4620" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 4750 C 300 4690, 600 4810, 900 4750 C 1200 4690, 1400 4830, 1440 4770" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
        </g>
      </svg>
      <Header />

      {/* HERO */}
      <section id="hero" className="hero-root" ref={heroRef}>

<div className="bg-name-marquee">
          <div className="bg-name-track" ref={marqueeTrackRef}>
            <span className="bg-name-text">FILIP PAUČO</span>
            <span className="bg-name-text">FILIP PAUČO</span>
          </div>
        </div>

        {/* Mobile-only fill rows: 4 above + 4 below, same animation/style as the center row = 9 total */}
        {["t1", "t2", "t3", "t4", "b1", "b2", "b3", "b4"].map((pos) => (
          <div
            key={pos}
            className={`bg-name-marquee bg-name-marquee--mobile-extra bg-name-marquee--${pos}`}
            aria-hidden="true"
          >
            <div className="bg-name-track">
              <span className="bg-name-text">FILIP PAUČO</span>
              <span className="bg-name-text">FILIP PAUČO</span>
            </div>
          </div>
        ))}

        <div className="concentric-circles">
          <div className="circle circle-1" />
          <div className="circle circle-2" />
          <div className="circle circle-3" />
        </div>

        {/* Hero portrait removed for now. To bring it back, restore:
            <div className="profile-wrap">
              <img src="/images/profile.png" alt="FILIP" className="profile-image" draggable={false} />
            </div>
            (styles for .profile-wrap / .profile-image are still in globals.css) */}

        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span className="scroll-text">Scroll Down</span>
        </div>
      </section>

      {/* WORK GALLERY */}
      <section id="work" className="section">
        <Reveal>
          <div className="work-header">
            <div>
              <div className="section-label">Selected Work</div>
              <TypewriterTitle text="Work Gallery" />
              <div className="section-desc">A collection of web apps, products, and experiments I've built.</div>
            </div>
            <Link href="/work" className="work-album-btn-top">
              View More Projects <ExternalLink size={14} />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="work-album">
            <div className="work-album-inner">
              {PROJECTS.map((project, index) => {
                const total = PROJECTS.length;

                let diff = (index - activeIndex + total) % total;
                if (diff > total / 2) diff -= total;

                const isCenter = diff === 0;
                const distance = Math.abs(diff);
                const dir = isCenter ? 0 : diff / distance;

                const style = isCenter
                  ? {
                      transform: "translate(-50%, -50%) scale(1)",
                      zIndex: 5,
                      opacity: 1,
                    }
                  : {
                      transform: `translate(calc(-50% + ${
                        dir * (200 + (distance - 1) * 130)
                      }px), -50%) scale(${Math.max(0.55, 1 - distance * 0.28)})`,
                      zIndex: 5 - distance,
                      opacity: distance <= 2 ? Math.max(0, 0.85 - (distance - 1) * 0.55) : 0,
                      pointerEvents: distance <= 2 ? "auto" : "none",
                    };

                return (
                  <div
                    key={project.num}
                    className={`work-album-item${isCenter ? " work-album-item-center" : ""}`}
                    style={style}
                    onClick={() => !isCenter && goTo(index)}
                  >
                    <img src={project.image} alt={project.title} className="work-album-img" draggable={false} />
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="work-mobile-stack-wrap">
            <WorkAlbumStack
              projects={PROJECTS}
              activeIndex={activeIndex}
              onAdvance={() => goTo(activeIndex + 1)}
            />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="work-info" key={activeProject.num}>
            <h3 className="work-info-title">{activeProject.title}</h3>
            <p className="work-info-desc">{activeProject.desc}</p>

            <a
              href={activeProject.link}
              className="work-info-link"
              target={activeProject.link !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              {activeProject.linkText}
            </a>
          </div>
        </Reveal>
      </section>

      {/* WHAT I CAN DO */}
      <section id="what-i-can-do" className="section">
        <div className="what-i-can-do-grid">
          <div className="what-i-can-do-left">
            <Reveal>
              <div className="section-label">My Capabilities</div>
              <TypewriterTitle text="What I Can Do" />
              <div className="what-i-can-do-desc">
                I combine full-stack engineering, mobile development, and creative design to build digital products that are fast, reliable, and beautiful.
              </div>
              <div className="tech-stack">
                <div className="tech-stack-column">
                  <div className="tech-stack-item">
                    <img src="/images/logos/javascript.svg" alt="JavaScript" draggable={false} />
                    <span className="tech-stack-label">JavaScript</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/typescript.svg" alt="TypeScript" draggable={false} />
                    <span className="tech-stack-label">TypeScript</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/react.svg" alt="React" draggable={false} />
                    <span className="tech-stack-label">React</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/nextjs.svg" alt="Next.js" draggable={false} />
                    <span className="tech-stack-label">Next.js</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/angular.svg" alt="Angular" draggable={false} />
                    <span className="tech-stack-label">Angular</span>
                  </div>
                </div>
                <div className="tech-stack-column">
                  <div className="tech-stack-item">
                    <img src="/images/logos/nodejs.svg" alt="Node.js" draggable={false} />
                    <span className="tech-stack-label">Node.js</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/express.svg" alt="Express" draggable={false} />
                    <span className="tech-stack-label">Express</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/csharp.svg" alt="C#" draggable={false} />
                    <span className="tech-stack-label">C#</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/python.svg" alt="Python" draggable={false} />
                    <span className="tech-stack-label">Python</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/mysql.svg" alt="MySQL" draggable={false} />
                    <span className="tech-stack-label">MySQL</span>
                  </div>
                </div>
                <div className="tech-stack-column workspace-column">
                  <div className="tech-stack-item">
                    <img src="/images/logos/supabase.svg" alt="Supabase" draggable={false} />
                    <span className="tech-stack-label">Supabase</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/mongodb.svg" alt="MongoDB" draggable={false} />
                    <span className="tech-stack-label">MongoDB</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/postgresql.svg" alt="PostgreSQL" draggable={false} />
                    <span className="tech-stack-label">PostgreSQL</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/tailwindcss.svg" alt="Tailwind CSS" draggable={false} />
                    <span className="tech-stack-label">Tailwind</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/figma.svg" alt="Figma" draggable={false} />
                    <span className="tech-stack-label">Figma</span>
                  </div>
                </div>
                <div className="tech-stack-column workspace-column">
                  <div className="tech-stack-item">
                    <img src="/images/logos/photoshop.svg" alt="Photoshop" draggable={false} />
                    <span className="tech-stack-label">Photoshop</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/illustrator.svg" alt="Illustrator" draggable={false} />
                    <span className="tech-stack-label">Illustrator</span>
                  </div>
            </div>
          </div>
        </Reveal>
          </div>

          <div className="what-i-can-do-right">
            {WHAT_I_CAN_DO.map((group, index) => (
              <Reveal key={group.group} delay={150 + index * 120}>
                <div className={`bento-card ${group.size === "large" ? "bento-large" : "bento-medium"}`}>
                  <div className="bento-header">
                    <div className="bento-number">{String(index + 1).padStart(2, "0")}</div>
                    <div className="bento-category">{group.group}</div>
                  </div>

                  <div className="bento-visual">
                    {index === 0 && (
                      <img src="/images/gif/coding.gif" alt="Web & Mobile Development" className="bento-gif" draggable={false} />
                    )}
                    {index === 1 && (
                      <img src="/images/gif/social.gif" alt="Creative & UI Design" className="bento-gif" draggable={false} />
                    )}
                    {index === 2 && (
                      <img src="/images/gif/social.gif" alt="Content & Digital" className="bento-gif" draggable={false} />
                    )}
                  </div>

                  <p className="bento-desc">{group.description}</p>

                  <div className="bento-skills">
                    {group.items.map((item) => (
                      <span key={item} className="bento-tag">{item}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <Reveal>
          <div className="section-label">ABOUT ME</div>
          <TypewriterTitle text={isMobile ? "Medior Programmer.\nCreative Designer." : "Medior Programmer. Creative Designer."} />
        </Reveal>

        <Reveal delay={100}>
          <div className="about-profile-card">
            <div className="about-profile-header">
              <div className="about-profile-image-wrapper">
                <img src="/images/about/profile.png" alt="Profile" className="about-profile-image" draggable={false} />
              </div>
              <div className="about-profile-info">
                <div className="about-profile-name">
                  FILIP PAUČO
                  <img src="/images/about/badge.svg" alt="Verified" className="about-profile-badge" draggable={false} />
                </div>
                <div className="about-profile-stats">
                  <div className="about-stat-item">
                    <span className="about-stat-label">PROJECTS</span>
                    <span className="about-stat-value">10+</span>
                  </div>
                  <div className="about-stat-item">
                    <span className="about-stat-label">ROLES</span>
                    <span className="about-stat-value">8</span>
                  </div>
                  <div className="about-stat-item">
                    <span className="about-stat-label">BASED IN</span>
                    <span className="about-stat-value">Bratislava</span>
                  </div>
                </div>
                <div className="about-description">
                  <p>
                    I'm a motivated student of Programming and Digital Technologies with a strong passion for IT and modern innovations. I have hands-on experience in full-stack web development and a foundational understanding of mobile development with React Native. I also work with Python and have skills in graphic design using Adobe Photoshop and Illustrator. I'm a responsible and proactive person who enjoys learning new things and continuously improving - comfortable working both independently and as part of a team. Outside of technology I regularly go to the gym, which helps me maintain discipline, consistency, and focus. Right now I'm building Tap-it, my own gym and fitness management SaaS, and I'm open to opportunities where I can gain practical experience and contribute to meaningful projects.
                  </p>
                  <p>
                    Want to know more about my experience? <a href="/resume/Filip_Pauco_Resume.pdf" className="about-resume-link" target="_blank" rel="noopener noreferrer">Download my resume</a>.
                  </p>
                </div>
              </div>
            </div>
            {/* CURRENTLY + CARD STACK */}
            <div className="about-bottom-row">
              <div className="currently-strip">
                <div className="currently-strip-label">CURRENTLY</div>
                <div className="currently-strip-items">
                  {CURRENTLY.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div className="currently-item" key={item.label}>
                        <span className="currently-icon">
                          <Icon size={16} strokeWidth={2} />
                        </span>
                        <div className="currently-text">
                          <div className="currently-item-label">{item.label}</div>
                          <div className="currently-item-detail">{item.detail}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="card-stack">
                <div
                  className="card-stack-container"
                  onClick={() => setCardIndex((prev) => (prev + 1) % CARDS.length)}
                  onMouseEnter={() => setCardPaused(true)}
                  onMouseLeave={() => setCardPaused(false)}
                >
                {CARDS.map((trait, i) => {
                  const offset = (i - cardIndex + CARDS.length) % CARDS.length;
                  const isExiting = offset === CARDS.length - 1;
                  // Only the front 3 cards and the one that just got flicked away are rendered.
                  if (offset > 2 && !isExiting) return null;

                  const scatter = CARD_SCATTER[i];
                  let style;

                  if (isExiting) {
                    style = {
                      "--tx": `${scatter.x + 140}px`,
                      "--ty": `${scatter.y - 60}px`,
                      "--rot": `${scatter.rot + 40}deg`,
                      "--sc": 0.85,
                      "--op": 0,
                      zIndex: 5,
                    };
                  } else {
                    const depth = offset;
                    style = {
                      "--tx": `${scatter.x + depth * 10}px`,
                      "--ty": `${scatter.y + depth * 8}px`,
                      "--rot": `${scatter.rot + depth * (scatter.rot >= 0 ? 5 : -5)}deg`,
                      "--sc": 1 - depth * 0.045,
                      "--op": depth === 0 ? 1 : 0.55 + (2 - depth) * 0.15,
                      zIndex: 30 - depth * 10,
                    };
                  }

                  return (
                    <div
                      key={trait}
                      className={`card-stack-card${offset === 0 ? " card-stack-card-front" : ""}`}
                      style={style}
                    >
                      <div className="card-stack-label">TRAIT</div>
                      <div className="card-stack-value">{trait}</div>
                    </div>
                  );
                })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* AWARDS */}
      <section id="awards" className="section">
        <Reveal>
          <div className="section-label">Recognition</div>
          <TypewriterTitle text="Certifications" />
          <div className="section-desc">
            Courses and certifications I have completed alongside school and work.
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="awards-layout">
            <img src="/images/awards/awards.svg" alt="Awards" className="awards-img" />
            <div className="awards-column">
              {/* Add a `link` to any entry (e.g. a PDF in public/awards/) to make it clickable. */}
              {CERTIFICATIONS.map((cert) => (
                <div className="award-item" key={cert.title}>
                  <div className="award-icon"><Award size={18} /></div>
                  <div className="award-title">{cert.title}</div>
                  <span className="award-issuer">{cert.issuer}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
      <section id="trainings" className="section">
        <Reveal>
          <div className="section-label">Growth & Experience</div>
          <TypewriterTitle text="Experience" />
          <div className="section-desc">
            Work, freelance projects, and hands-on experience that shaped my technical and creative skills.
          </div>
        </Reveal>

        <div className="experience-list">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className={`experience-card${exp.imageLeft ? " experience-card-reverse" : ""}`}>
              <div className="experience-text">
                <div className="experience-header">
                  <div className="experience-title">
                    {exp.title}
                    {exp.subtitle && <div className="experience-subtitle">{exp.subtitle}</div>}
                  </div>
                  <div className="experience-date">{exp.date}</div>
                </div>
                <div className="experience-org">{exp.org}</div>
                <div className="experience-desc">{exp.desc}</div>
                {exp.certificates && exp.certificates.map((cert, i) => (
                  <div key={i}>
                    <a href={cert.link} className="experience-certificate" target="_blank" rel="noopener noreferrer">
                      {cert.name}
                      <ExternalLink size={12} style={{ marginLeft: 6 }} />
                    </a>
                  </div>
                ))}
              </div>
              {exp.images && exp.images.length > 0 ? (
                <ExperienceImageStack images={exp.images} title={exp.title} />
              ) : (
                <ExperienceMeta period={exp.date} location={exp.location} tags={exp.tags} />
              )}
            </div>
          ))}
        </div>

        <Reveal>
          <div className="education-block">
            <div className="education-label">EDUCATION</div>
            <div className="education-list">
              {EDUCATION.map((edu) => (
                <div className="education-item" key={edu.school}>
                  <div className="education-icon"><GraduationCap size={18} /></div>
                  <div className="education-info">
                    <div className="education-school">{edu.school}</div>
                    <div className="education-degree">{edu.degree}</div>
                  </div>
                  <div className="education-date">{edu.date}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="contact-grid">
          <div className="contact-left">
            <Reveal>
              <div className="contact-eyebrow">GET IN TOUCH</div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="contact-headline">
                LET'S<br />
                <span className="contact-headline-accent">WORK</span><br />
                TOGETHER
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="contact-description">Got a project in mind? Let's make it real.</p>
            </Reveal>
            <Reveal delay={300}>
              <p className="contact-secondary">
                I'm open to opportunities in web and mobile development, freelance projects, and creative collaborations.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <a href="/resume/Filip_Pauco_Resume.pdf" className="contact-resume-btn" target="_blank" rel="noopener noreferrer">DOWNLOAD RESUME →</a>
            </Reveal>
          </div>

          <div className="contact-right">
            <div className="contact-cards">
              <Reveal delay={200}>
                <a href="mailto:pauco.filip1@gmail.com" className="contact-card" target="_blank" rel="noopener noreferrer">
                  <span className="contact-card-number">01</span>
                  <div className="contact-card-icon">
                    <Mail size={20} />
                  </div>
                  <div className="contact-card-info">
                    <div className="contact-card-label">EMAIL</div>
                    <div className="contact-card-value">pauco.filip1@gmail.com</div>
                  </div>
                </a>
              </Reveal>
              <Reveal delay={280}>
                <a href="https://github.com/Cajam11" className="contact-card" target="_blank" rel="noopener noreferrer">
                  <span className="contact-card-number">02</span>
                  <div className="contact-card-icon">
                    <Github size={20} />
                  </div>
                  <div className="contact-card-info">
                    <div className="contact-card-label">GITHUB</div>
                    <div className="contact-card-value">github.com/Cajam11</div>
                  </div>
                  <ExternalLink size={16} className="contact-card-arrow" />
                </a>
              </Reveal>
              <Reveal delay={360}>
                <a href="https://www.linkedin.com/in/filip-pau%C4%8Do/" className="contact-card" target="_blank" rel="noopener noreferrer">
                  <span className="contact-card-number">03</span>
                  <div className="contact-card-icon">
                    <Linkedin size={20} />
                  </div>
                  <div className="contact-card-info">
                    <div className="contact-card-label">LINKEDIN</div>
                    <div className="contact-card-value">linkedin.com/in/filip-pauco</div>
                  </div>
                  <ExternalLink size={16} className="contact-card-arrow" />
                </a>
              </Reveal>
              <Reveal delay={440}>
                <a href="https://instagram.com/fil_1pp" className="contact-card" target="_blank" rel="noopener noreferrer">
                  <span className="contact-card-number">04</span>
                  <div className="contact-card-icon">
                    <Instagram size={20} />
                  </div>
                  <div className="contact-card-info">
                    <div className="contact-card-label">INSTAGRAM</div>
                    <div className="contact-card-value">instagram.com/fil_1pp</div>
                  </div>
                  <ExternalLink size={16} className="contact-card-arrow" />
                </a>
              </Reveal>
            </div>
            <Reveal delay={440}>
              <button className="contact-cta" onClick={() => { setIsModalOpen(true); setIsModalMinimized(false); }}>
                SEND ME A MESSAGE →
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className={`contact-modal${isModalMinimized ? " contact-modal--minimized" : ""}`}>
          <div className="contact-modal-header" onClick={() => isModalMinimized && setIsModalMinimized(false)}>
            <h3 className="contact-modal-title">Send Me a Message</h3>
            <div className="contact-modal-controls">
              <button
                type="button"
                className="contact-modal-icon-btn contact-modal-minimize-btn"
                aria-label={isModalMinimized ? "Expand" : "Minimize"}
                onClick={(e) => { e.stopPropagation(); setIsModalMinimized((v) => !v); }}
              >
                <Minus size={16} />
              </button>
              <button
                type="button"
                className="contact-modal-icon-btn"
                aria-label="Close"
                onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isModalMinimized && (
            <div className="contact-modal-inner">
              <form
                className="contact-modal-form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target;
                  const data = {
                    name: form.name.value.trim(),
                    email: form.email.value.trim(),
                    message: form.message.value.trim(),
                  };

                  setFormStatus("submitting");

                  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
                  if (!endpoint) {
                    // No form endpoint configured yet - open the visitor's mail client instead.
                    window.location.href = `mailto:pauco.filip1@gmail.com?subject=${encodeURIComponent("Portfolio message from " + data.name)}&body=${encodeURIComponent(data.message + "\n\n" + data.name + " <" + data.email + ">")}`;
                    setFormStatus("idle");
                    form.reset();
                    setIsModalOpen(false);
                    return;
                  }

                   try {
                     await fetch(endpoint, {
                       method: 'POST',
                       mode: 'no-cors',
                       headers: { 'Content-Type': 'application/json' },
                       body: JSON.stringify(data),
                     });
                     setFormStatus("success");
                     form.reset();
                     setIsModalOpen(false);
                     setShowSuccessModal(true);
                   } catch (error) {
                     setFormStatus("error");
                   }
                }}
              >
                <div className="contact-modal-field">
                  <label className="contact-modal-label">Full Name</label>
                  <input type="text" name="name" className="contact-modal-input" placeholder="Your full name" required />
                </div>

                <div className="contact-modal-field">
                  <label className="contact-modal-label">Email Address</label>
                  <input type="email" name="email" className="contact-modal-input" placeholder="your.email@example.com" required />
                </div>

                <div className="contact-modal-field contact-modal-field--grow">
                  <label className="contact-modal-label">Message</label>
                  <textarea rows="6" name="message" className="contact-modal-input" placeholder="Tell me about your project..." required />
                </div>

                <button type="submit" className="contact-modal-submit" disabled={formStatus === "submitting"}>
                  {formStatus === "submitting" ? "SENDING..." : formStatus === "success" ? "MESSAGE SENT" : "SEND MESSAGE →"}
                </button>

                {formStatus === "error" && (
                  <div className="contact-modal-error">
                    Failed to send message. Please try again or contact me directly.
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      )}

      {showSuccessModal && (
        <div className="success-modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <button className="success-modal-close" onClick={() => setShowSuccessModal(false)}>
              <X size={20} />
            </button>
            <div className="success-modal-icon">✓</div>
            <h3 className="success-modal-title">Message Sent!</h3>
            <p className="success-modal-text">Thanks for reaching out. I'll get back to you as soon as possible.</p>
            <button className="success-modal-btn" onClick={() => setShowSuccessModal(false)}>
              CONTINUE BROWSING
            </button>
          </div>
        </div>
      )}
    </div>
  );
}