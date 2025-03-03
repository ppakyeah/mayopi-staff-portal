'use client';

import { useState, useEffect } from 'react';
import { Users } from 'lucide-react'
import Calendar from '@/components/calendar/Calendar';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format } from 'date-fns';

interface Schedule {
  id: string;
  start: string;
  end: string;
  staffName: string;
}

export default function SchedulePage() {
  const [todayShifts, setTodayShifts] = useState<Schedule[]>([]);

  // 오늘의 근무자 데이터 가져오기
  const fetchTodayShifts = async () => {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const shiftsQuery = query(
        collection(db, 'schedules'),
        where('start', '==', today)
      );
      
      const querySnapshot = await getDocs(shiftsQuery);
      const todaySchedules = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Schedule[];
      
      setTodayShifts(todaySchedules);
    } catch (error) {
      console.error('오늘의 근무자 데이터 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchTodayShifts();
  }, []);

  return (
    <div className="max-w-[1024px] mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold mayopi-title">근무 스케줄</h1>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 mayopi-gradient rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h2 className="mayopi-card-title">오늘의 근무자</h2>
            </div>
            <div className="space-y-4">
              {todayShifts.length > 0 ? (
                todayShifts.map((shift) => (
                  <div key={shift.id} className="p-3 bg-orange-50 rounded-lg">
                    <div className="font-medium text-black">
                      {shift.staffName}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="text-sm text-gray-600">
                    오늘 배정된 근무자가 없습니다.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <Calendar onScheduleChange={fetchTodayShifts} />
          </div>
        </div>
      </div>
    </div>
  );
} 