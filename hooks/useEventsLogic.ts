import { useCallback } from 'react';
import moment from 'moment';

// interfaces
import { IEvent } from '../interfaces';

// enums
import { EventsFilter } from '../enums';

const useEventsLogic = () => {
  const getStartDate = useCallback((event: IEvent): Date | null => {
    let start = null;
    if (event.start && event.timezone) {
      start = moment(`${event.start}${event.timezone}`).toDate();
    }
    return start;
  }, []);

  const getEndDate = useCallback((event: IEvent): Date | null => {
    let end = null;
    if (event.end && event.timezone) {
      end = moment(`${event.end}${event.timezone}`).toDate();
    } else if (event.start && event.timezone) {
      //
      // NOTE!
      // if no end time set, use start time + 1 hour
      //
      end = moment(`${event.start}${event.timezone}`).toDate(); // convert to js Date object
      end.setTime(end.getTime() + 1 * 60 * 60 * 1000); // add an hour
    }
    return end;
  }, []);

  const getSortedEvents = useCallback(
    (events: Array<IEvent>, filterType: EventsFilter): Array<IEvent> => {
      const now = new Date();
      let sortedEvents: Array<IEvent> = [];

      if (filterType === EventsFilter.Upcoming) {
        sortedEvents = events.filter((event: IEvent) => {
          let end = getEndDate(event);
          return end && end > now;
        });

        sortedEvents.sort((a: IEvent, b: IEvent) => {
          if (a.start > b.start) {
            return 1;
          } else if (a.start < b.start) {
            return -1;
          }
          return 0;
        });
      } else if (filterType === EventsFilter.Past) {
        const currentEvents = events.filter((event: IEvent) => {
          let end = getEndDate(event);
          let start = getStartDate(event);
          return end && end > now && start && start < now;
        });
        currentEvents.sort((a: IEvent, b: IEvent) => {
          if (a.start < b.start) {
            return 1;
          } else if (a.start > b.start) {
            return -1;
          }
          return 0;
        });

        const pastEvents = events.filter((event: IEvent) => {
          let end = getEndDate(event);
          return end && end < now;
        });
        pastEvents.sort((a: IEvent, b: IEvent) => {
          if (a.start < b.start) {
            return 1;
          } else if (a.start > b.start) {
            return -1;
          }
          return 0;
        });

        sortedEvents = [...currentEvents, ...pastEvents];

        //
        // NOTE!
        // Cut array to 10 items to increase performance
        //
        sortedEvents = sortedEvents.slice(0, 9);
      }

      return sortedEvents;
    },
    [getStartDate, getEndDate],
  );

  const isCurrentEvent = useCallback(
    (event: IEvent) => {
      const now = new Date();
      let end = getEndDate(event);
      let start = getStartDate(event);
      return end && end > now && start && start < now;
    },
    [getEndDate, getStartDate],
  );

  const isStartWithinAnHourEvent = useCallback(
    (event: IEvent) => {
      const now = new Date();
      let start = getStartDate(event);
      let minusHour = new Date();
      if (start) {
        minusHour.setTime(start.getTime() - 1 * 60 * 60 * 1000); // extract an hour
      }
      return start && start > now && minusHour && minusHour < now;
    },
    [getStartDate],
  );

  return { getSortedEvents, isCurrentEvent, isStartWithinAnHourEvent };
};

export default useEventsLogic;
