import { useCalendar } from '@/hooks/useCalendar';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { ViewMode } from '@/types/calendar';

const viewLabels: Record<ViewMode, string> = {
  month: 'Mês',
  week: 'Semana',
  day: 'Dia',
};

export function CalendarHeader() {
  const { currentDate, viewMode, setViewMode, goNext, goPrev, goToday } = useCalendar();

  const title = viewMode === 'month'
    ? format(currentDate, "MMMM 'de' yyyy", { locale: ptBR })
    : viewMode === 'week'
    ? `Semana de ${format(currentDate, "dd MMM", { locale: ptBR })}`
    : format(currentDate, "EEEE, dd 'de' MMMM", { locale: ptBR });

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        <Calendar className="h-5 w-5 text-primary" />
        <h1 className="text-xl font-semibold capitalize">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={goToday}>
          Hoje
        </Button>
        <Button variant="ghost" size="icon" onClick={goPrev}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={goNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="flex ml-2 bg-secondary rounded-lg p-0.5">
          {(['month', 'week', 'day'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md cal-transition ${
                viewMode === mode
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {viewLabels[mode]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
