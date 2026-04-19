import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConfigureAmplify from "@/src/components/ConfigureAmplify";
import AuthenticatorProvider from "@/src/components/AuthenticatorProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hedge",
  description: "Community-powered copilot for energy-driven economic shocks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Initializes Amplify on the client — renders nothing */}
        <ConfigureAmplify />
        {/* Gates the entire app behind the Amplify login screen */}
        <AuthenticatorProvider>{children}</AuthenticatorProvider>
      </body>
    </html>
  );
}
