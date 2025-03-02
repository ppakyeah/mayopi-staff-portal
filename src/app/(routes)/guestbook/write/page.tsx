'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';

export default function GuestbookWritePage() {
  const router = useRouter();
  const [newEntry, setNewEntry] = useState({
    content: '',
    recommendations: '',
    authorName: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newEntry.content || !newEntry.authorName) return;

    try {
      await addDoc(collection(db, 'guestbook'), {
        ...newEntry,
        createdAt: new Date(),
      });
      router.push('/guestbook');
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

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
        방명록 작성하기
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            이름
          </label>
          <Input
            value={newEntry.authorName}
            onChange={(e) => setNewEntry({ ...newEntry, authorName: e.target.value })}
            placeholder="당신의 이름을 입력해주세요"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            내용
          </label>
          <Textarea
            value={newEntry.content}
            onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
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
            value={newEntry.recommendations}
            onChange={(e) => setNewEntry({ ...newEntry, recommendations: e.target.value })}
            placeholder="추천하고 싶은 장소가 있다면 알려주세요"
          />
        </div>
        <div className="flex gap-2 pt-4 text-gray-700">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex-1"
          >
            취소
          </Button>
          <Button type="submit" className="mayopi-gradient flex-1">
            등록하기
          </Button>
        </div>
      </form>
    </div>
  );
} 