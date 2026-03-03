import { CalendarEvent, Holiday, UserProfile } from '@/types/calendar';

export const mockHolidays: Holiday[] = [
  { date: '2026-01-01', name: 'Confraternização Universal' },
  { date: '2026-02-16', name: 'Carnaval' },
  { date: '2026-02-17', name: 'Carnaval' },
  { date: '2026-04-03', name: 'Sexta-feira Santa' },
  { date: '2026-04-21', name: 'Tiradentes' },
  { date: '2026-05-01', name: 'Dia do Trabalho' },
  { date: '2026-06-04', name: 'Corpus Christi' },
  { date: '2026-09-07', name: 'Independência do Brasil' },
  { date: '2026-10-12', name: 'Nossa Senhora Aparecida' },
  { date: '2026-11-02', name: 'Finados' },
  { date: '2026-11-15', name: 'Proclamação da República' },
  { date: '2026-12-25', name: 'Natal' },
];

export const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Reunião de Sprint',
    date: '2026-03-02',
    startTime: '09:00',
    endTime: '10:00',
    category: 'work',
    notes: 'Revisar tarefas da sprint atual e planejar próximas entregas.',
  },
  {
    id: '2',
    title: 'Almoço com equipe',
    date: '2026-03-02',
    startTime: '12:00',
    endTime: '13:30',
    category: 'personal',
    notes: 'Restaurante italiano na Paulista.',
  },
  {
    id: '3',
    title: 'Code Review',
    date: '2026-03-04',
    startTime: '14:00',
    endTime: '15:00',
    category: 'work',
    notes: 'Revisar PR #342 — refatoração do módulo de autenticação.',
  },
  {
    id: '4',
    title: 'Academia',
    date: '2026-03-05',
    startTime: '07:00',
    endTime: '08:00',
    category: 'leisure',
    notes: 'Treino de pernas + cardio.',
  },
  {
    id: '5',
    title: 'Apresentação do Projeto',
    date: '2026-03-06',
    startTime: '10:00',
    endTime: '11:30',
    category: 'work',
    notes: 'Apresentar MVP para stakeholders.',
  },
  {
    id: '6',
    title: 'Happy Hour',
    date: '2026-03-06',
    startTime: '18:00',
    endTime: '20:00',
    category: 'leisure',
    notes: 'Bar do lado do escritório.',
  },
  {
    id: '7',
    title: 'Dentista',
    date: '2026-03-10',
    startTime: '09:00',
    endTime: '10:00',
    category: 'personal',
    notes: 'Consulta de rotina.',
  },
  {
    id: '8',
    title: 'Planning Q2',
    date: '2026-03-12',
    startTime: '14:00',
    endTime: '16:00',
    category: 'work',
    notes: 'Definir OKRs do segundo trimestre.',
  },
];

export const mockUser: UserProfile = {
  name: 'João Silva',
  email: 'joao.silva@email.com',
  avatar: '',
};

// Simulated API functions
export const fetchEvents = (): Promise<CalendarEvent[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockEvents]), 300);
  });
};

export const fetchHolidays = (): Promise<Holiday[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockHolidays]), 200);
  });
};

export const createEvent = (event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> => {
  return new Promise((resolve) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setTimeout(() => resolve(newEvent), 200);
  });
};
