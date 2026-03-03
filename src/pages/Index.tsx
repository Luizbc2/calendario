import { CalendarProvider } from '@/hooks/useCalendar';
import { CalendarLayout } from '@/components/calendar/CalendarLayout';

const Index = () => {
  return (
    <CalendarProvider>
      <CalendarLayout />
    </CalendarProvider>
  );
};

export default Index;
