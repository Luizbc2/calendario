import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CalendarEvent, Holiday, ViewMode } from '@/types/calendar';
import { fetchEvents, fetchHolidays, createEvent } from '@/data/mockApi';
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  addMonths, subMonths, addWeeks, subWeeks, addDays, subDays,
  format, isSameDay, isSameMonth, eachDayOfInterval, getDay,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CalendarContextType {
  currentDate: Date;
  viewMode: ViewMode;
  events: CalendarEvent[];
  holidays: Holiday[];
  selectedDate: Date | null;
  isModalOpen: boolean;
  setViewMode: (mode: ViewMode) => void;
  goNext: () => void;
  goPrev: () => void;
  goToday: () => void;
  selectDate: (date: Date) => void;
  openModal: (date?: Date) => void;
  closeModal: () => void;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => Promise<void>;
  getEventsForDate: (date: Date) => CalendarEvent[];
  getHolidayForDate: (date: Date) => Holiday | undefined;
}

const CalendarContext = createContext<CalendarContextType | null>(null);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents().then(setEvents);
    fetchHolidays().then(setHolidays);
  }, []);

  const goNext = useCallback(() => {
    setCurrentDate((d) => {
      if (viewMode === 'month') return addMonths(d, 1);
      if (viewMode === 'week') return addWeeks(d, 1);
      return addDays(d, 1);
    });
  }, [viewMode]);

  const goPrev = useCallback(() => {
    setCurrentDate((d) => {
      if (viewMode === 'month') return subMonths(d, 1);
      if (viewMode === 'week') return subWeeks(d, 1);
      return subDays(d, 1);
    });
  }, [viewMode]);

  const goToday = useCallback(() => setCurrentDate(new Date()), []);

  const selectDate = useCallback((date: Date) => setSelectedDate(date), []);

  const openModal = useCallback((date?: Date) => {
    if (date) setSelectedDate(date);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const addEvent = useCallback(async (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent = await createEvent(event);
    setEvents((prev) => [...prev, newEvent]);
  }, []);

  const getEventsForDate = useCallback(
    (date: Date) => events.filter((e) => e.date === format(date, 'yyyy-MM-dd')),
    [events]
  );

  const getHolidayForDate = useCallback(
    (date: Date) => holidays.find((h) => h.date === format(date, 'yyyy-MM-dd')),
    [holidays]
  );

  return (
    <CalendarContext.Provider
      value={{
        currentDate, viewMode, events, holidays, selectedDate, isModalOpen,
        setViewMode, goNext, goPrev, goToday, selectDate, openModal, closeModal,
        addEvent, getEventsForDate, getHolidayForDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const ctx = useContext(CalendarContext);
  if (!ctx) throw new Error('useCalendar must be used within CalendarProvider');
  return ctx;
}
