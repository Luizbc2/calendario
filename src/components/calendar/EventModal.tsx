import { useState } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { EventCategory } from '@/types/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FaTimes, FaBriefcase, FaUser, FaGamepad } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FaRegCommentDots } from 'react-icons/fa6';

const categories: { value: EventCategory; label: string; icon: React.ReactNode }[] = [
  { value: 'work', label: 'Trabalho', icon: <FaBriefcase className="h-4 w-4" /> },
  { value: 'personal', label: 'Pessoal', icon: <FaUser className="h-4 w-4" /> },
  { value: 'leisure', label: 'Lazer', icon: <FaGamepad className="h-4 w-4" /> },
  { value: 'other', label: 'Outro', icon: <FaRegCommentDots className="h-4 w-4" /> },
];

const categoryColorVar: Record<EventCategory, string> = {
  work: 'var(--cal-event-work)',
  personal: 'var(--cal-event-personal)',
  leisure: 'var(--cal-event-leisure)',
  other: 'var(--cal-event-other)',
};

export function EventModal() {
  const { isModalOpen, closeModal, selectedDate, addEvent } = useCalendar();
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [category, setCategory] = useState<EventCategory | null>(null);
  const [otherCategoryNote, setOtherCategoryNote] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  if (!isModalOpen || !selectedDate) return null;

  const handleCategoryChange = (next: EventCategory) => {
    setCategory(next);
    if (next !== 'other') {
      setOtherCategoryNote('');
    }
  };

  const resetForm = () => {
    setTitle('');
    setStartTime('09:00');
    setEndTime('10:00');
    setCategory(null);
    setOtherCategoryNote('');
    setNotes('');
  };

  const handleCloseModal = () => {
    if (saving) return;
    resetForm();
    closeModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category) return;

    const mergedNotes = [
      notes.trim(),
      category === 'other' && otherCategoryNote.trim()
        ? `Tipo "Outro": ${otherCategoryNote.trim()}`
        : '',
    ]
      .filter(Boolean)
      .join('\n');

    setSaving(true);
    try {
      await addEvent({
        title: title.trim(),
        date: format(selectedDate, 'yyyy-MM-dd'),
        startTime,
        endTime,
        category,
        notes: mergedNotes,
      });
      resetForm();
      closeModal();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={handleCloseModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md mx-4 animate-fade-in"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-lg">Novo Evento</h2>
          <button onClick={handleCloseModal} className="text-muted-foreground hover:text-foreground cal-transition">
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="text-sm text-muted-foreground capitalize">
            {format(selectedDate, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </div>

          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Nome do evento..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="start">Início</Label>
              <Input id="start" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="end">Fim</Label>
              <Input id="end" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="mt-1" />
            </div>
          </div>

          <div>
            <Label>Categoria</Label>

            {category === 'other' && (
              <div className="mt-1.5 mb-2 rounded-lg border border-violet-400/50 bg-violet-500/10 p-2.5 animate-fade-in">
                <Label htmlFor="other-category-note" className="text-xs text-violet-700 dark:text-violet-300">
                  Anotação da categoria "Outro"
                </Label>
                <Input
                  id="other-category-note"
                  placeholder="Ex.: estudo, saúde, finanças..."
                  value={otherCategoryNote}
                  onChange={(e) => setOtherCategoryNote(e.target.value)}
                  className="mt-1 border-violet-400/60 focus-visible:ring-violet-500"
                />
              </div>
            )}

            <div className="flex gap-2 mt-1.5">
              {categories.map((cat) => {
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleCategoryChange(cat.value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cal-transition border ${
                      category === cat.value
                        ? 'border-transparent shadow-sm'
                        : 'border-border text-muted-foreground hover:text-foreground'
                    }`}
                    style={
                      category === cat.value
                        ? {
                            backgroundColor: `hsl(${categoryColorVar[cat.value]} / 0.15)`,
                            color: `hsl(${categoryColorVar[cat.value]})`,
                          }
                        : undefined
                    }
                  >
                    {cat.icon}
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
              

          <div>
            <Label htmlFor="notes">Anotações</Label>
            <Textarea
              id="notes"
              placeholder="Adicionar detalhes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 min-h-[80px]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!title.trim() || !category || saving}>
              {saving ? 'Salvando...' : 'Criar Evento'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
