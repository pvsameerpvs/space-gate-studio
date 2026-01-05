import localFont from "next/font/local";

export const headland = localFont({
  src: [
    {
      path: "../../public/fonts/headland-one-400.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-headland",
  display: "swap",
});

export const play = localFont({
  src: [
    {
      path: "../../public/fonts/play-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/play-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-play",
  display: "swap",
});

export const stalinist = localFont({
  src: [
    {
      path: "../../public/fonts/stalinist-one-400.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-stalinist",
  display: "swap",
});

export const raleway = localFont({
  src: [
    {
      path: "../../public/fonts/raleway-300.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/raleway-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/raleway-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/raleway-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/raleway-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-raleway",
  display: "swap",
});

export const pressStart2P = localFont({
  src: [
    {
      path: "../../public/fonts/press-start-2p-400.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-press-start",
  display: "swap",
});

export const spaceMono = localFont({
  src: [
    {
      path: "../../public/fonts/space-mono-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/space-mono-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-space-mono",
  display: "swap",
});
