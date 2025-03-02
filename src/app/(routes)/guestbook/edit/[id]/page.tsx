'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';

interface GuestbookEntry {
  id: string;
  content: string;
  recommendations?: string;
  authorName: string;
  createdAt: Timestamp;
}

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function GuestbookEditPage({ params }: PageProps) {
  const router = useRouter();
  const [entry, setEntry] = useState<GuestbookEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const docRef = doc(db, 'guestbook', params.id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setEntry({
            id: docSnap.id,
            ...docSnap.data()
          } as GuestbookEntry);
        } else {
          console.error('No such document!');
          router.push('/guestbook');
        }
      } catch (error) {
        console.error('Error fetching entry:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntry();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!entry || !entry.content || !entry.authorName) return;

    try {
      await updateDoc(doc(db, 'guestbook', entry.id), {
        content: entry.content,
        recommendations: entry.recommendations,
        authorName: entry.authorName,
      });
      router.push('/guestbook');
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <p className="text-center text-gray-600">로딩 중...</p>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <p className="text-center text-gray-600">방명록을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          돌아가기
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">
        방명록 수정하기
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            이름
          </label>
          <Input
            value={entry.authorName}
            onChange={(e) => setEntry({ ...entry, authorName: e.target.value })}
            placeholder="당신의 이름을 입력해주세요"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            내용
          </label>
          <Textarea
            value={entry.content}
            onChange={(e) => setEntry({ ...entry, content: e.target.value })}
            placeholder="마요피에서의 추억을 남겨주세요"
            required
            className="min-h-[200px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            추천하는 장소
          </label>
          <Input
            value={entry.recommendations}
            onChange={(e) => setEntry({ ...entry, recommendations: e.target.value })}
            placeholder="제주도에서 추천하고 싶은 장소가 있다면 알려주세요"
          />
        </div>
        <div className="flex gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex-1"
          >
            취소
          </Button>
          <Button type="submit" className="mayopi-gradient flex-1">
            수정하기
          </Button>
        </div>
      </form>
    </div>
  );
} 