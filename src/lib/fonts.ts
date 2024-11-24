import { Balsamiq_Sans, Inter } from "next/font/google";

export const balsamiqSans = Balsamiq_Sans({
  subsets: ["latin"],
  variable: "--font-balsamiq-sans",
  weight: ["400", "700"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["500"],
});
