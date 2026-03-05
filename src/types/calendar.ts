export type EventCategory = 'work' | 'personal' | 'leisure' | 'other';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  category: EventCategory;
  notes: string;
}

export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
}

export type ViewMode = 'month' | 'week' | 'day';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}
