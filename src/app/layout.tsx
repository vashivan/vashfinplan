import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";

const ubuntuSans = Oswald({
  variable: '--font-ubuntu-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Ваш Фінансовий План | VashFinPlan",
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
