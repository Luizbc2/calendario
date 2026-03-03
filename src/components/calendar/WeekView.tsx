import { useCalendar } from '@/hooks/useCalendar';
import { startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { EventCategory } from '@/types/calendar';

const hours = Array.from({ length: 24 }, (_, i) => i);

const categoryBg: Record<EventCategory, string> = {
  work: 'var(--cal-event-work)',
  personal: 'var(--cal-event-personal)',
  leisure: 'var(--cal-event-leisure)',
};

export function WeekView() {
  const { currentDate, getEventsForDate, openModal, selectDate, getHolidayForDate } = useCalendar();
  const today = new Date();

  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const handleSlotClick = (day: Date) => {
    selectDate(day);
    openModal(day);
  };

  return (
    <div className="flex-1 overflow-auto animate-fade-in scrollbar-thin">
      {/* Day headers */}
      <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border sticky top-0 bg-card z-10">
        <div className="p-2" />
        {days.map((day) => {
          const isToday = isSameDay(day, today);
          const holiday = getHolidayForDate(day);
          return (
            <div key={day.toISOString()} className="p-2 text-center border-l border-cal-grid">
              <span className="text-xs text-muted-foreground">
                {format(day, 'EEE', { locale: ptBR })}
              </span>
              <span
                className={`block text-lg font-semibold mt-0.5 ${
                  isToday ? 'text-cal-today' : ''
                }`}
              >
                {format(day, 'd')}
              </span>
              {holiday && (
                <span className="text-[9px] text-destructive">{holiday.name}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="grid grid-cols-[60px_repeat(7,1fr)]">
        {hours.map((hour) => (
          <div key={hour} className="contents">
            <div className="h-14 pr-2 text-right text-[10px] text-muted-foreground pt-0.5 border-b border-cal-grid">
              {String(hour).padStart(2, '0')}:00
            </div>
            {days.map((day) => {
              const dayEvents = getEventsForDate(day);
              const hourEvents = dayEvents.filter((e) => parseInt(e.startTime) === hour);

              return (
                <div
                  key={`${day.toISOString()}-${hour}`}
                  onClick={() => handleSlotClick(day)}
                  className="h-14 border-b border-l border-cal-grid cal-cell-hover relative"
                >
                  {hourEvents.map((event) => (
                    <div
                      key={event.id}
                      className="absolute inset-x-0.5 top-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium truncate"
                      style={{
                        backgroundColor: `hsl(${categoryBg[event.category]} / 0.15)`,
                        color: `hsl(${categoryBg[event.category]})`,
                        borderLeft: `2px solid hsl(${categoryBg[event.category]})`,
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
