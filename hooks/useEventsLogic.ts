// utils
import {
  getSortedEvents,
  isCurrentEvent,
  isStartWithinAnHourEvent,
  getVerboseDate,
  getVerboseTime,
} from '../utils/eventsLogic';

const useEventsLogic = () => {
  return {
    getSortedEvents,
    isCurrentEvent,
    isStartWithinAnHourEvent,
    getVerboseDate,
    getVerboseTime,
  };
};

export default useEventsLogic;
