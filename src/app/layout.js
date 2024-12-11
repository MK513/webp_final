import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FontProvider } from "@/components/FontProvider";
import { RightSidebarProvider } from "@/components/RightSidebarContext";
import Menubar from "@/components/ui/MenuBar";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const Agro = localFont({
  src: "./fonts/SB 어그로 M.ttf",
  variable: "--font-agro",
  weight: "100 900",
});

const Chosun = localFont({
  src: "./fonts/ChosunCentennial_ttf.ttf",
  variable: "--font-chosun",
  weight: "100 900",
});

const Logy = localFont({
  src: "./fonts/Paperlogy-4Regular.ttf",
  variable: "--font-logy",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${Agro.variable} ${Chosun.variable} ${Logy.variable} antialiased`}
      >
        <SessionProvider>
          <ThemeProvider>
            <FontProvider>
              <RightSidebarProvider>
                <div className='flex min-h-screen'>
                  <Menubar />

                  {/* Page Content */}
                  <main className='flex-1 bg-white'>{children}</main>
                </div>
              </RightSidebarProvider>
            </FontProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
