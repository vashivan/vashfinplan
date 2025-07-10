import type { Metadata } from "next";
import { Ubuntu_Sans_Mono } from "next/font/google";
import "./globals.css";

const ubuntuSans = Ubuntu_Sans_Mono({
  variable: '--font-ubuntu-sans',
  subsets: ['latin'],
  weight: ['400', '700'], 
});

export const metadata: Metadata = {
  title: "Ваш фінансовий план",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntuSans.className} border-primary/20`}
      >
        {children}
      </body>
    </html>
  );
}
