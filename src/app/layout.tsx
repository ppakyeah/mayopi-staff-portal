import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar/navbar";

export const metadata: Metadata = {
  title: "Mayopi Family",
  description: "마요피갤러리 스텝 식구들을 위한 정보 공유 플랫폼",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <div className="fixed inset-0 -z-10 bg-[url('/images/mayopi-logo.jpeg')] opacity-5" />
        </div>
      </body>
    </html>
  );
}
