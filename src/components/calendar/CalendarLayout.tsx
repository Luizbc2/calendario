import { CalendarHeader } from './CalendarHeader';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { DayView } from './DayView';
import { CalendarSidebar } from './CalendarSidebar';
import { EventModal } from './EventModal';
import { useCalendar } from '@/hooks/useCalendar';

export function CalendarLayout() {
  const { viewMode } = useCalendar();

  return (
    <div className="flex h-screen w-full bg-background">
      <div className="flex-1 flex flex-col min-w-0">
        <CalendarHeader />
        <div className="flex-1 overflow-auto scrollbar-thin">
          {viewMode === 'month' && <MonthView />}
          {viewMode === 'week' && <WeekView />}
          {viewMode === 'day' && <DayView />}
        </div>
      </div>
      <CalendarSidebar />
      <EventModal />
    </div>
  );
}
