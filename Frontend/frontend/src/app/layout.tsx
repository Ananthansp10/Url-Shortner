"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>{children}</Provider>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: "#4ade80",
                color: "white",
              },
            },
            error: {
              style: {
                background: "#f87171",
                color: "white",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
