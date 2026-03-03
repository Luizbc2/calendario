import { useCalendar } from '@/hooks/useCalendar';
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameMonth, isSameDay, format, getDay,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { EventCategory } from '@/types/calendar';

const categoryColors: Record<EventCategory, string> = {
  work: 'bg-cal-work',
  personal: 'bg-cal-personal',
  leisure: 'bg-cal-leisure',
};

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function MonthView() {
  const { currentDate, openModal, getEventsForDate, getHolidayForDate, selectDate } = useCalendar();
  const today = new Date();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  const handleDayClick = (day: Date) => {
    selectDate(day);
    openModal(day);
  };

  return (
    <div className="flex-1 animate-fade-in">
      <div className="grid grid-cols-7 border-b border-border">
        {weekDays.map((d, i) => (
          <div
            key={d}
            className={`py-2 text-center text-xs font-medium ${
              i === 0 || i === 6 ? 'text-cal-weekend' : 'text-muted-foreground'
            }`}
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 flex-1">
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isToday = isSameDay(day, today);
          const dayEvents = getEventsForDate(day);
          const holiday = getHolidayForDate(day);
          const isWeekend = getDay(day) === 0 || getDay(day) === 6;

          return (
            <div
              key={day.toISOString()}
              onClick={() => handleDayClick(day)}
              className={`min-h-[100px] border-b border-r border-cal-grid p-1.5 cal-cell-hover ${
                !isCurrentMonth ? 'opacity-30' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`inline-flex items-center justify-center w-7 h-7 text-sm rounded-full ${
                    isToday
                      ? 'bg-cal-today text-cal-today-foreground font-bold'
                      : isWeekend
                      ? 'text-cal-weekend'
                      : 'text-foreground'
                  }`}
                >
                  {format(day, 'd')}
                </span>
                {holiday && (
                  <span className="text-[10px] text-destructive font-medium truncate max-w-[80px]">
                    {holiday.name}
                  </span>
                )}
              </div>
              <div className="mt-1 space-y-0.5">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium truncate ${categoryColors[event.category]} bg-opacity-15`}
                    style={{ backgroundColor: `hsl(var(--cal-event-${event.category}) / 0.12)`, color: `hsl(var(--cal-event-${event.category}))` }}
                  >
                    <span className="truncate">{event.startTime} {event.title}</span>
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <span className="text-[10px] text-muted-foreground pl-1">
                    +{dayEvents.length - 3} mais
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
