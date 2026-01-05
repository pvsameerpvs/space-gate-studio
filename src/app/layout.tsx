import "./globals.css";
import type { Metadata } from "next";
import { headland, play, stalinist, raleway, spaceMono, pressStart2P } from "./fonts";
import { SoundProvider } from "@/components/sound/SoundProvider";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { PageTransition } from "@/components/motion/PageTransition";
import { TopNav } from "@/components/nav/TopNav";
import { CinematicCursor } from "@/components/fx/CinematicCursor";
import { LoadingGate } from "@/components/fx/LoadingGate";

export const metadata: Metadata = {
  title: "Space Gate Studio — Open the Gate to the Future of Digital Experiences",
  description: "Cinematic, interactive, viral-ready digital experiences. Next.js + Motion + 3D + Sound.",
  metadataBase: new URL("https://spacegatestudio.com"),
  openGraph: {
    title: "Space Gate Studio",
    description: "Open the Gate to the Future of Digital Experiences",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Space Gate Studio",
    description: "Cinematic, interactive, viral-ready digital experiences."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${headland.variable} ${play.variable} ${stalinist.variable} ${raleway.variable} ${spaceMono.variable} ${pressStart2P.variable} dark`}>
      <body className="font-ui text-white antialiased">
        <SoundProvider>
          <LenisProvider>
            <LoadingGate />
            <TopNav />
            <CinematicCursor />
            <div className="pt-2">
              <PageTransition>{children}</PageTransition>
            </div>
          </LenisProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
