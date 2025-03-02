'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { BookMarked, User2, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface GuestbookEntry {
  id: string;
  content: string;
  recommendations?: string;
  authorName: string;
  createdAt: Timestamp;
}

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'guestbook'), (snapshot) => {
      const entriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as GuestbookEntry[];

      entriesData.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      setEntries(entriesData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('정말로 이 방명록을 삭제하시겠습니까?')) {
      try {
        await deleteDoc(doc(db, 'guestbook', id));
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedEntry(expandedEntry === id ? null : id);
  };

  if (entries.length === 0) {
    return (
      <div className="max-w-[1024px] mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold mayopi-title">방명록</h1>
          <Link href="/guestbook/write">
            <Button className="mayopi-gradient">방명록 작성하기</Button>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full opacity-20 blur-lg"></div>
            <div className="relative bg-white rounded-full p-4">
              <BookMarked className="w-12 h-12 text-orange-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2 mayopi-title">아직 작성된 방명록이 없어요</h2>
          <p className="mb-6">제주도에서의 추억과 숨은 명소를 공유해주세요</p>
          <Link href="/guestbook/write">
            <Button className="mayopi-gradient">첫 번째 방명록 작성하기</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1024px] mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold mayopi-title">방명록</h1>
        <Link href="/guestbook/write">
          <Button className="mayopi-gradient">방명록 작성하기</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {entries.map((entry) => (
            <div 
              key={entry.id} 
              className="p-6 hover:bg-orange-50 transition-colors cursor-pointer"
              onClick={() => toggleExpand(entry.id)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                    <User2 className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg truncate text-black">{entry.authorName}</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-black">
                        {entry.createdAt?.toDate().toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/guestbook/edit/${entry.id}`);
                          }}
                          className="text-black hover:text-black"
                        >
                          수정
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(entry.id);
                          }}
                          className="text-black hover:text-black"
                        >
                          삭제
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className={`${expandedEntry === entry.id ? '' : 'line-clamp-3'}`}>
                    <p className="whitespace-pre-wrap text-base text-black leading-relaxed">{entry.content}</p>
                  </div>
                  {entry.recommendations && (
                    <div className="mt-4 flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div className={`text-base text-black leading-relaxed ${expandedEntry === entry.id ? '' : 'line-clamp-1'}`}>
                        {entry.recommendations}
                      </div>
                    </div>
                  )}
                  {(entry.content.length > 200 || (entry.recommendations && entry.recommendations.length > 100)) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(entry.id);
                      }}
                      className="mt-2 text-sm font-medium text-orange-500 hover:text-orange-600"
                    >
                      {expandedEntry === entry.id ? '접기' : '더 보기'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 