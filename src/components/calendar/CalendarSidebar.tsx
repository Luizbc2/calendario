import { useCalendar } from '@/hooks/useCalendar';
import { format, isBefore, isToday, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarDays, FileText, Briefcase, User, Gamepad2, Sun, Moon } from 'lucide-react';
import { EventCategory, CalendarEvent } from '@/types/calendar';
import { useTheme } from '@/hooks/useTheme';
import { Link } from 'react-router-dom';

const categoryIcons: Record<EventCategory, React.ReactNode> = {
  work: <Briefcase className="h-3.5 w-3.5" />,
  personal: <User className="h-3.5 w-3.5" />,
  leisure: <Gamepad2 className="h-3.5 w-3.5" />,
};

const categoryColorVar: Record<EventCategory, string> = {
  work: 'var(--cal-event-work)',
  personal: 'var(--cal-event-personal)',
  leisure: 'var(--cal-event-leisure)',
};

export function CalendarSidebar() {
  const { events } = useCalendar();
  const { isDark, toggle } = useTheme();
  const today = new Date();

  // Upcoming events: today + future, sorted
  const upcoming = events
    .filter((e) => {
      const eventDate = new Date(e.date + 'T' + e.startTime);
      return eventDate >= new Date(today.toDateString());
    })
    .sort((a, b) => {
      const da = new Date(a.date + 'T' + a.startTime);
      const db = new Date(b.date + 'T' + b.startTime);
      return da.getTime() - db.getTime();
    })
    .slice(0, 5);

  // Recent notes: events with notes
  const recentNotes = events
    .filter((e) => e.notes.trim().length > 0)
    .slice(0, 4);

  return (
    <aside className="w-72 border-l border-border bg-card flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border flex items-center justify-between">
        <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 cal-transition">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
            JS
          </div>
          <span className="text-sm font-medium">João Silva</span>
        </Link>
        <button onClick={toggle} className="text-muted-foreground hover:text-foreground cal-transition p-1.5 rounded-lg hover:bg-secondary">
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>

      {/* Upcoming */}
      <div className="p-4 flex-1 overflow-auto scrollbar-thin">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          Próximos Compromissos
        </h3>
        {upcoming.length === 0 ? (
          <p className="text-xs text-muted-foreground">Nenhum evento próximo.</p>
        ) : (
          <div className="space-y-2">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            Anotações Recentes
          </h3>
          {recentNotes.length === 0 ? (
            <p className="text-xs text-muted-foreground">Nenhuma anotação.</p>
          ) : (
            <div className="space-y-2">
              {recentNotes.map((event) => (
                <div key={event.id} className="p-2.5 rounded-lg bg-secondary/50 animate-slide-in">
                  <p className="text-xs font-medium">{event.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">{event.notes}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

function EventCard({ event }: { event: CalendarEvent }) {
  const eventDate = new Date(event.date);
  const today = isToday(eventDate);

  return (
    <div className="p-2.5 rounded-lg border border-border hover:border-primary/30 cal-transition animate-slide-in">
      <div className="flex items-center gap-2">
        <div
          className="p-1 rounded"
          style={{
            backgroundColor: `hsl(${categoryColorVar[event.category]} / 0.12)`,
            color: `hsl(${categoryColorVar[event.category]})`,
          }}
        >
          {categoryIcons[event.category]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate">{event.title}</p>
          <p className="text-[10px] text-muted-foreground">
            {today ? 'Hoje' : format(eventDate, "dd MMM", { locale: ptBR })} · {event.startTime} - {event.endTime}
          </p>
        </div>
      </div>
    </div>
  );
}
