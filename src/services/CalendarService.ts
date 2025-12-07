import * as Calendar from 'expo-calendar';
import { Platform } from 'react-native';

export const CalendarService = {
  async getPermissions() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    return status === 'granted';
  },

  async getDefaultCalendarId(): Promise<string | null> {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    let defaultCalendarId: string | null = null;

    if (Platform.OS === 'ios') {
      const defaultCalendar = calendars.find((c) => c.source.name === 'Default');
      if (defaultCalendar) {
        defaultCalendarId = defaultCalendar.id;
      } else {
     
        defaultCalendarId = calendars[0]?.id || null;
      }
    } else {
   
      const visibleCalendar = calendars.find(
        (c) => c.accessLevel === Calendar.CalendarAccessLevel.OWNER || c.accessLevel === Calendar.CalendarAccessLevel.EDITOR
      );
      defaultCalendarId = visibleCalendar?.id || null;
    }
    return defaultCalendarId;
  },

  async addEvent(title: string, startDate: Date, endDate: Date, notes?: string) {
    const calendarId = await this.getDefaultCalendarId();
    if (!calendarId) throw new Error("No writable calendar found.");

    const eventId = await Calendar.createEventAsync(calendarId, {
      title,
      startDate,
      endDate,
      notes,
      timeZone: 'GMT',
    });
    return eventId;
  },

  async getEventsForDate(date: Date) {
    const calendarId = await this.getDefaultCalendarId();
    if (!calendarId) return [];

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const events = await Calendar.getEventsAsync([calendarId], startOfDay, endOfDay);
    return events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  },

  async deleteEvent(eventId: string) {
    await Calendar.deleteEventAsync(eventId);
  }
};