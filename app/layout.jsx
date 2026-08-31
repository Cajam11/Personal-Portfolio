import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { PageTransitionProvider } from "../components/PageTransition";

export const metadata = {
  title: "FILIP PAUČO",
  description: "Medior Programmer and IT student based in Bratislava. Full-stack web development, mobile apps with React Native, Python, and graphic design.",
  openGraph: {
    title: "FILIP PAUČO",
    description: "Medior Programmer and IT student based in Bratislava. Full-stack web development, mobile apps with React Native, Python, and graphic design.",
    url: "https://filip-pauco.vercel.app",
    siteName: "FILIP PAUČO",
    images: [
      {
        url: "/images/about/profile.png",
        width: 1200,
        height: 630,
        alt: "FILIP PAUČO",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FILIP PAUČO",
    description: "Medior Programmer and IT student based in Bratislava. Full-stack web development, mobile apps with React Native, Python, and graphic design.",
    images: ["/images/about/profile.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500&family=Great+Vibes&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          <PageTransitionProvider>
            {children}
          </PageTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
