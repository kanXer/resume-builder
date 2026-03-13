import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Analytics } from "@vercel/analytics/next"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Make Your Resume | Professional Resume Builder & PDF Utilities",
  description: "Create ATS-friendly professional resumes and manage your PDF documents with ease. Fast, secure, and free online PDF tools.",
  keywords: ["Resume Builder", "PDF Tools", "ATS Resume", "PDF Converter", "Next.js PDF"],
  authors: [{ name: "Sahil Srivastava" }],
  creator: "Sahil Srivastava",
  icons: {
    icon: "/favicon.ico", // Ensure you have a favicon in your public folder
  },
  openGraph: {
    title: "Make Your Resume - Build Your Career",
    description: "The ultimate tool for PDF management and professional resume building.",
    url: "https://your-domain.com",
    siteName: "PDFTools",
    locale: "en_US",
    type: "website",
  },
};
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
        <Navbar />
        {children}
        <Footer />
        <Analytics/>
      </body>
    </html>
  );
}
