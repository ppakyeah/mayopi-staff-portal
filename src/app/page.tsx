import Link from 'next/link'
import { BookOpen, Calendar, ExternalLink, BookMarked } from 'lucide-react'

const quickLinks = [
  {
    title: '입퇴실 스케줄',
    href: 'https://docs.google.com/spreadsheets/d/1KWy8IQF5dLa9SpUW5Y6uvTSq8a6bVssshZJxmbaeGLI/htmlview#',
    description: '마요피갤러리 입퇴실 스케줄 스프레드 시트'
  },
  {
    title: '홈페이지',
    href: 'https://mayopigallery.modoo.at/',
    description: '마요피갤러리 소개 페이지'
  },
  {
    title: '블로그',
    href: 'https://blog.naver.com/mayopi',
    description: '마요피갤러리 네이버 블로그'
  }
];

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 mayopi-gradient opacity-10" />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">
            Mayopi Family
          </h1>
          <p className="text-xl text-gray-600">
            마요피갤러리 스텝 식구들을 위한 정보 공유 플랫폼입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Link
            href="/guidelines"
            className="mayopi-card p-8 flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 mayopi-gradient rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="mayopi-subtitle">
              객실 청소 가이드라인
            </h2>
            <p className="text-gray-600">
              마요피갤러리 객실 청소 가이드라인을 확인하세요.
            </p>
          </Link>

          <Link
            href="/schedule"
            className="mayopi-card p-8 flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 mayopi-gradient rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h2 className="mayopi-subtitle">
              근무 스케줄
            </h2>
            <p className="text-gray-600">
              스텝들의 근무 일정을 확인하고 관리하세요.
            </p>
          </Link>

          <Link
            href="/guestbook"
            className="mayopi-card p-8 flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 mayopi-gradient rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookMarked className="w-8 h-8 text-white" />
            </div>
            <h2 className="mayopi-subtitle">
              방명록
            </h2>
            <p className="text-gray-600">
              마요피에서의 추억과 추천하는 장소를 공유하세요.
            </p>
          </Link>
        </div>

        <div className="mayopi-card p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border border-gray-200 hover:border-orange-200 hover:bg-orange-50 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{link.title}</h3>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
                </div>
                <p className="text-sm text-gray-600">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
