import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import Script from "next/script";

export const metadata: Metadata = {
  title: "AXTCloud | Premium Cloud Hosting Partner",
  description: "AXTCloud - Premium VPS, Dedicated Servers, and Enterprise Cloud Hosting with advanced DDoS protection and white-glove support.",
  icons: {
    icon: "https://cdn.goaxt.cloud/logo.jpg",
    shortcut: "https://cdn.goaxt.cloud/logo.jpg",
  },
  openGraph: {
    type: "website",
    title: "AXTCloud - Premium Hosting",
    images: ["https://cdn.goaxt.cloud/logo.jpg"],
  }
};

export const viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <RevealObserver />
        <Header />
        <main style={{ paddingTop: 'var(--header-height)' }}>
          {children}
        </main>
        <Footer />
        <Script src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async />
      </body>
    </html>
  );
}
