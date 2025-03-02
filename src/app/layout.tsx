import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar/navbar";

export const metadata: Metadata = {
  title: "마요피 스텝 포털",
  description: "마요피갤러리 게스트하우스 스텝을 위한 정보 공유 플랫폼",
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
          <div className="fixed inset-0 -z-10 bg-[url('/images/mayopi-pattern.svg')] opacity-5" />
        </div>
      </body>
    </html>
  );
}
