import { useCallback } from 'react';
import moment from 'moment';

// interfaces
import { IEvent } from '../../../interfaces';

const useLabels = () => {
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

  const isCurrentEvent = useCallback(
    (event: IEvent) => {
      const now = new Date();
      let end = getEndDate(event);
      let start = getStartDate(event);
      return end && end > now && start && start < now;
    },
    [getEndDate, getStartDate],
  );

  return { isCurrentEvent };
};

export default useLabels;
