import { 
  Headland_One, 
  Play, 
  Stalinist_One, 
  Raleway, 
  Space_Mono, 
  Press_Start_2P 
} from "next/font/google";

export const headland = Headland_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-headland",
  display: "swap",
});

export const play = Play({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-play",
  display: "swap",
});

export const stalinist = Stalinist_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-stalinist",
  display: "swap",
});

export const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

export const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});
