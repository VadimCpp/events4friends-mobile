import moment from 'moment';

// utils
import { IEvent } from '../utils/interfaces';
import { DEFAULT_EVENT_DURATION } from '../utils/сonstants';
import { EventsFilter } from '../utils/enums';
import { timeZoneToCityName } from '../utils/misc';

/**
 * Возвращает время начала мероприятия
 */
export const getStartDate = (event: IEvent): Date | null => {
  let start = null;
  if (event.start && event.timezone) {
    start = moment(`${event.start}${event.timezone}`).toDate();
  }
  return start;
};

/**
 * Возвращает время окончания мероприятия
 */
export const getEndDate = (event: IEvent): Date | null => {
  let end = null;
  if (event.end && event.timezone) {
    end = moment(`${event.end}${event.timezone}`).toDate();
  } else if (event.start && event.timezone) {
    end = moment(`${event.start}${event.timezone}`).toDate();
    end.setTime(end.getTime() + DEFAULT_EVENT_DURATION * 60 * 60 * 1000);
  }
  return end;
};

/**
 * Функция сравнения мероприятий для формировании списка предстоящих мероприятий.
 */
export const sortAscending = (a: IEvent, b: IEvent): number => {
  let retVal = 0;
  if (a.start > b.start) {
    retVal = 1;
  } else if (a.start < b.start) {
    retVal = -1;
  }
  return retVal;
};

/**
 * Функция сравнения мероприятий для формировании списка прошедших мероприятий.
 */
export const sortDescending = (a: IEvent, b: IEvent): number => {
  let retVal = 0;
  if (a.start < b.start) {
    retVal = 1;
  } else if (a.start > b.start) {
    retVal = -1;
  }
  return retVal;
};

/**
 * Функция формировании списка предстоящих мероприятий.
 */
export const sortUpcomingEvents = (
  events: Array<IEvent>,
  now: Date,
): Array<IEvent> => {
  let sortedEvents = [];
  sortedEvents = events.filter((event: IEvent) => {
    const end = getEndDate(event);
    return end && end > now;
  });

  sortedEvents.sort(sortAscending);
  return sortedEvents;
};

/**
 * Функция формировании списка прошедших мероприятий.
 */
export const sortPastEvents = (
  events: Array<IEvent>,
  now: Date,
): Array<IEvent> => {
  let sortedEvents = [];
  const currentEvents = events.filter((event: IEvent) => {
    const end = getEndDate(event);
    const start = getStartDate(event);
    return end && end > now && start && start < now;
  });
  currentEvents.sort(sortDescending);

  const pastEvents = events.filter((event: IEvent) => {
    const end = getEndDate(event);
    return end && end < now;
  });
  pastEvents.sort(sortDescending);

  sortedEvents = [...currentEvents, ...pastEvents];
  return sortedEvents;
};

/**
 * Формирование списка прошедших или предстоящих мероприятий.
 */
export const getSortedEvents = (
  events: Array<IEvent>,
  filterType: EventsFilter,
): Array<IEvent> => {
  const now = new Date();
  let sortedEvents: Array<IEvent> = [];
  if (filterType === EventsFilter.Upcoming) {
    sortedEvents = sortUpcomingEvents(events, now);
  } else if (filterType === EventsFilter.Past) {
    sortedEvents = sortPastEvents(events, now);
  }
  return sortedEvents;
};

/**
 * Функция проверяет идет ли сейчас мероприятие
 */
export const isCurrentEvent = (event: IEvent): boolean => {
  const now = new Date();
  const end = getEndDate(event);
  const start = getStartDate(event);
  return Boolean(end && end > now && start && start < now);
};

/**
 * Функция проверяет начнется ли мероприятие в течение часа
 */
export const isStartWithinAnHourEvent = (event: IEvent): boolean => {
  const now = new Date();
  const start = getStartDate(event);
  const minusHour = new Date();
  if (start) {
    minusHour.setTime(start.getTime() - 1 * 60 * 60 * 1000); // отнимаем час
  }
  return Boolean(start && start > now && minusHour && minusHour < now);
};

/**
 * Функция возвращает дату в удобном для пользователя формате
 */
export const getVerboseDate = (event: IEvent): string => {
  return moment(`${event.start}`).format('D MMMM, dddd');
};

/**
 * Функция возвращает время в удобном для пользователя формате
 */
export const getVerboseTime = (event: IEvent): string => {
  const withTimezone = moment(`${event.start}${event.timezone}`)
    .toDate()
    .getTime();
  const noTimezone = moment(`${event.start}`)
    .toDate()
    .getTime();

  let verbose = `${moment(event.start).format('HH:mm')} ${timeZoneToCityName(
    event.timezone,
  )}`;
  if (withTimezone !== noTimezone) {
    const localTime = `${moment(`${event.start}${event.timezone}`).format(
      'HH:mm',
    )}`;
    verbose += ` (${localTime} по вашему времени)`;
  }

  return verbose;
};
