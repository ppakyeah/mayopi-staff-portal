import { useEffect, useState, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { collection, onSnapshot, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format, addDays, parseISO } from 'date-fns';
import koLocale from '@fullcalendar/core/locales/ko';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';

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

interface DateSelectInfo {
  start: Date;
  end: Date;
}

export default function Calendar({ onScheduleChange }: CalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<NewEventForm>({
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    staffName: ''
  });

  // Firestore 데이터 가져오기 함수
  const fetchSchedules = useCallback(async () => {
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
  }, [onScheduleChange]);

  useEffect(() => {
    fetchSchedules();

    const unsubscribe = onSnapshot(collection(db, 'schedules'), () => {
      fetchSchedules();
    });

    return () => unsubscribe();
  }, [onScheduleChange, fetchSchedules]);

  const handleDateSelect = (selectInfo: DateSelectInfo) => {
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
      <div className="pb-6 pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <div className="flex items-center gap-3">
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button 
              onClick={() => setIsAddEventOpen(true)}
              className="w-full sm:w-auto px-4 py-2 mayopi-gradient text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              <span>일정 등록</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <style jsx global>{`
          .calendar-event {
            padding: 2px 4px;
            font-weight: 600;
            border-radius: 4px;
            color: white !important;
            border: 1px solid rgba(255, 107, 53, 0.3);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          }
          .fc {
            border: none !important;
          }
          .fc-col-header-cell-cushion,
          .fc-daygrid-day-number,
          .fc-daygrid-more-link {
            color: #000000 !important;
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
          
          /* 모바일 최적화 스타일 */
          @media (max-width: 768px) {
            .fc {
              font-size: 0.9em;
            }
            .fc .fc-toolbar {
              flex-direction: column;
              gap: 1rem;
            }
            .fc .fc-toolbar-title {
              font-size: 1.1rem;
              margin: 0.5rem 0;
            }
            .fc .fc-button {
              padding: 0.4rem 0.8rem !important;
              font-size: 0.9rem !important;
            }
            .fc .fc-toolbar-chunk {
              display: flex;
              gap: 0.5rem;
              flex-wrap: wrap;
              justify-content: center;
            }
            .fc-event-title {
              font-size: 0.85em;
              line-height: 1.2;
            }
            .fc .fc-daygrid-day-number {
              padding: 4px !important;
            }
            .fc .fc-daygrid-day-top {
              flex-direction: row;
              justify-content: center;
            }
            .calendar-event {
              padding: 1px 3px;
              margin-bottom: 1px;
            }
            .fc .fc-daygrid-more-link {
              font-size: 0.85em;
              margin-top: 1px;
              padding: 1px 2px;
              background: #f3f4f6;
              border-radius: 4px;
            }
            .fc .fc-daygrid-day-frame {
              min-height: 65px !important;
            }
          }

          /* 기존 스타일 유지 */
          .fc-theme-standard td, 
          .fc-theme-standard th,
          .fc-theme-standard .fc-scrollgrid {
            border: 1px solid #e5e7eb !important;
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
          
          /* 리스트 뷰 스타일 */
          .fc-list-event {
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .fc-list-event:hover {
            background-color: #FFF5F1 !important;
          }
          .fc-list-event-title {
            font-weight: 500;
          }
          .fc-list-day-cushion {
            background-color: #f9fafb !important;
          }
        `}</style>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale={koLocale}
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
            right: ''
          }}
          eventContent={(eventInfo) => {
            return (
              <>
                <div className="font-semibold text-sm sm:text-base">{eventInfo.event.title}</div>
              </>
            );
          }}
        />
      </div>

      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="dialog-content w-[95vw] max-w-md mx-auto">
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