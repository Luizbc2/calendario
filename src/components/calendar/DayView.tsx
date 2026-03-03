import { useCalendar } from '@/hooks/useCalendar';
import { isSameDay, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { EventCategory } from '@/types/calendar';

const hours = Array.from({ length: 24 }, (_, i) => i);

const categoryBg: Record<EventCategory, string> = {
  work: 'var(--cal-event-work)',
  personal: 'var(--cal-event-personal)',
  leisure: 'var(--cal-event-leisure)',
};

export function DayView() {
  const { currentDate, getEventsForDate, openModal, getHolidayForDate } = useCalendar();
  const today = new Date();
  const isToday = isSameDay(currentDate, today);
  const dayEvents = getEventsForDate(currentDate);
  const holiday = getHolidayForDate(currentDate);

  return (
    <div className="flex-1 overflow-auto animate-fade-in scrollbar-thin">
      <div className="sticky top-0 bg-card z-10 px-6 py-3 border-b border-border flex items-center gap-3">
        <span className={`text-2xl font-bold ${isToday ? 'text-cal-today' : ''}`}>
          {format(currentDate, 'd')}
        </span>
        <span className="text-muted-foreground capitalize">
          {format(currentDate, 'EEEE', { locale: ptBR })}
        </span>
        {holiday && (
          <span className="text-xs text-destructive font-medium ml-2">🎉 {holiday.name}</span>
        )}
      </div>

      <div className="grid grid-cols-[60px_1fr]">
        {hours.map((hour) => {
          const hourEvents = dayEvents.filter((e) => parseInt(e.startTime) === hour);
          return (
            <div key={hour} className="contents">
              <div className="h-16 pr-3 text-right text-xs text-muted-foreground pt-1 border-b border-cal-grid">
                {String(hour).padStart(2, '0')}:00
              </div>
              <div
                onClick={() => openModal(currentDate)}
                className="h-16 border-b border-cal-grid cal-cell-hover relative px-2"
              >
                {hourEvents.map((event) => (
                  <div
                    key={event.id}
                    className="absolute inset-x-2 top-1 px-3 py-1.5 rounded-md text-sm font-medium"
                    style={{
                      backgroundColor: `hsl(${categoryBg[event.category]} / 0.12)`,
                      color: `hsl(${categoryBg[event.category]})`,
                      borderLeft: `3px solid hsl(${categoryBg[event.category]})`,
                    }}
                  >
                    <span className="font-semibold">{event.title}</span>
                    <span className="ml-2 opacity-70">{event.startTime} - {event.endTime}</span>
                    {event.notes && (
                      <p className="mt-0.5 text-xs opacity-60 truncate">{event.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
