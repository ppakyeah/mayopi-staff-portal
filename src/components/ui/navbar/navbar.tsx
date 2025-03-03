'use client';

import Link from 'next/link'
import Image from 'next/image'
import { Home, BookOpen, Calendar, Menu, X, BookMarked, Users2 } from 'lucide-react'
import { useState } from 'react'

const menuItems = [
  { href: '/', icon: Home, label: '홈' },
  { href: '/guidelines', icon: BookOpen, label: '청소 가이드라인' },
  { href: '/staff-guidelines', icon: Users2, label: '생활 가이드라인' },
  { href: '/schedule', icon: Calendar, label: '스케줄' },
  { href: '/guestbook', icon: BookMarked, label: '방명록' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden relative">
              <Image 
                src="/images/mayopi-logo.jpeg" 
                alt="Mayopi Logo" 
                fill
                className="object-cover"
              />
            </div>
            <span className="mayopi-nav-title">Mayopi Family
            </span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-500"
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 모바일 메뉴 패널 */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 