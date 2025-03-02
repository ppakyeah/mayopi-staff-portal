import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { collection, onSnapshot, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format, addDays, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, RefreshCw } from 'lucide-react';

interface Schedule {
  id: string;
  start: string;
  staffName: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  backgroundColor: string;
  classNames: string[];
  extendedProps: {
    staffName: string;
  };
}

interface NewEventForm {
  startDate: string;
  endDate: string;
  staffName: string;
}

interface CalendarProps {
  onScheduleChange?: () => void;
}

export default function Calendar({ onScheduleChange }: CalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEvent, setNewEvent] = useState<NewEventForm>({
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    staffName: ''
  });

  // Firestore 데이터 가져오기 함수
  const fetchSchedules = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'schedules'));
      const scheduleData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Schedule[];
      
      const calendarEvents = scheduleData.map(schedule => ({
        id: schedule.id,
        title: schedule.staffName,
        start: schedule.start,
        backgroundColor: '#FF6B35',
        classNames: ['calendar-event'],
        extendedProps: {
          staffName: schedule.staffName
        }
      }));
      
      setEvents(calendarEvents);
      if (onScheduleChange) {
        onScheduleChange();
      }
    } catch (error) {
      console.error('스케줄 데이터 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchSchedules();

    const unsubscribe = onSnapshot(collection(db, 'schedules'), () => {
      fetchSchedules();
    });

    return () => unsubscribe();
  }, [onScheduleChange]);

  const handleDateSelect = (selectInfo: any) => {
    setSelectedDate(selectInfo.start);
    const endDate = new Date(selectInfo.end);
    endDate.setDate(endDate.getDate() - 1);

    setNewEvent({
      startDate: format(selectInfo.start, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      staffName: ''
    });
    setIsAddEventOpen(true);
  };

  const handleEventAdd = async () => {
    try {
      if (!newEvent.staffName) {
        alert('이름을 입력해주세요.');
        return;
      }

      const startDate = parseISO(newEvent.startDate);
      const endDate = parseISO(newEvent.endDate);

      // 시작일이 종료일보다 늦은 경우 체크
      if (startDate > endDate) {
        alert('시작일은 종료일보다 늦을 수 없습니다.');
        return;
      }

      let currentDate = startDate;
      
      // 시작일부터 종료일까지 반복하면서 일정 생성
      while (currentDate <= endDate) {
        const formattedDate = format(currentDate, 'yyyy-MM-dd');
        
        await addDoc(collection(db, 'schedules'), {
          start: formattedDate,
          staffName: newEvent.staffName
        });
        
        currentDate = addDays(currentDate, 1);
      }

      setIsAddEventOpen(false);
      setNewEvent({
        startDate: format(new Date(), 'yyyy-MM-dd'),
        endDate: format(new Date(), 'yyyy-MM-dd'),
        staffName: ''
      });

      fetchSchedules();
    } catch (error) {
      console.error('일정 추가 중 오류 발생:', error);
      alert('일정 추가 중 오류가 발생했습니다.');
    }
  };

  const handleEventDelete = async (eventId: string) => {
    try {
      await deleteDoc(doc(db, 'schedules', eventId));
      if (onScheduleChange) {
        onScheduleChange();
      }
    } catch (error) {
      console.error('일정 삭제 중 오류 발생:', error);
      alert('일정 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <div className="border-b p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsAddEventOpen(true)}
              className="px-4 py-2 mayopi-gradient text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Plus size={18} />
              <span>일정 등록</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <style jsx global>{`
          .calendar-event {
            padding: 2px 4px;
            font-weight: 600;
            border-radius: 4px;
            color: white !important;
          }
          .fc-event-title {
            font-size: 0.95em;
            white-space: normal !important;
            overflow: visible;
          }
          .fc .fc-toolbar-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1a1a1a;
          }
          .fc .fc-button {
            background-color: white !important;
            border: 1px solid #e5e7eb !important;
            color: #374151 !important;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            transition: all 0.2s;
          }
          .fc .fc-button:hover {
            background-color: #f9fafb !important;
          }
          .fc .fc-button-primary:not(:disabled).fc-button-active,
          .fc .fc-button-primary:not(:disabled):active {
            background-color: #FF6B35 !important;
            border-color: #FF6B35 !important;
            color: white !important;
          }
          .fc .fc-button:focus {
            box-shadow: none !important;
            outline: 2px solid #FF6B35 !important;
            outline-offset: 2px;
          }
          .fc .fc-today-button {
            background: linear-gradient(to right, #FF6B35, #FF8C64) !important;
            border: none !important;
            color: white !important;
          }
          .fc .fc-today-button:disabled {
            opacity: 0.7;
          }
          .fc .fc-day-today {
            background-color: #FFF5F1 !important;
          }
          .fc .fc-day:hover {
            background-color: #f9fafb;
          }
          /* Dialog 스타일 수정 */
          :global(.fixed.inset-0) {
            background-color: rgba(0, 0, 0, 0.5) !important;
            backdrop-filter: blur(4px);
          }
          :global([role="dialog"]) {
            background-color: white !important;
            border: 1px solid #e5e7eb;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          :global(.dialog-content) {
            color: #000000 !important;
          }
          :global(.dialog-header) {
            color: #000000 !important;
          }
          :global(.dialog-title) {
            color: #000000 !important;
          }
          :global(.dialog-description) {
            color: #000000 !important;
          }
        `}</style>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale="ko"
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={3}
          eventDisplay="block"
          select={handleDateSelect}
          eventClick={(info) => {
            if (window.confirm(`${info.event.title} 일정을 삭제하시겠습니까?`)) {
              handleEventDelete(info.event.id);
            }
          }}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth'
          }}
          eventContent={(eventInfo) => {
            return (
              <>
                <div className="font-semibold">{eventInfo.event.title}</div>
              </>
            );
          }}
        />
      </div>

      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="dialog-content">
          <DialogHeader className="dialog-header">
            <DialogTitle className="dialog-title">새 근무 일정 등록</DialogTitle>
            <DialogDescription className="dialog-description"></DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">이름</label>
              <Input
                value={newEvent.staffName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewEvent({ ...newEvent, staffName: e.target.value })
                }
                placeholder="이름 입력"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">시작일</label>
              <Input
                type="date"
                value={newEvent.startDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewEvent({
                    ...newEvent,
                    startDate: e.target.value,
                    endDate: e.target.value > newEvent.endDate ? e.target.value : newEvent.endDate
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">종료일</label>
              <Input
                type="date"
                value={newEvent.endDate}
                min={newEvent.startDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewEvent({
                    ...newEvent,
                    endDate: e.target.value
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
              취소
            </Button>
            <Button onClick={handleEventAdd}>등록</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 