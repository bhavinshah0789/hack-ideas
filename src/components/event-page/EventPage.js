import { Fragment, useState, useCallback, useEffect } from 'react';
// components
import BaseDialog from '../base-dialog/BaseDialog';
import BaseSpinner from '../base-spinner/BaseSpinner';
import EventSortFilter from '../event-sort-filter/EventSortFilter';
import EventList from '../event-list/EventList';
// API
import HackIdeasAPI from '../../api/HackIdeasAPI';
// Constants
import EventPageConstants from '../../data/EventPageConstants';

const EventPage = () => {
  const [eventList, setEventList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateSortFilter = (sortBy) => {
    fetchEvents(sortBy);
  };

  const handleError = () => {
    setError(null);
  };

  const fetchEvents = useCallback(async (sortBy) => {
    setIsLoading(true);
    setError(null);

    let transformedEventList = [];
    try {
      transformedEventList = await HackIdeasAPI.getEvents(sortBy, setEventList);
    } catch (error) {
      setError(error.message || EventPageConstants.customErrorMsg);
    }

    setEventList(transformedEventList);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <Fragment>
      <EventSortFilter
        updateSortFilter={updateSortFilter}
      />
      <BaseDialog
        open={!!error}
        title={EventPageConstants.dialogErrorTitle}
        desc={error}
        closeDialog={handleError}
      />
      <BaseDialog
        open={isLoading}
        hideActions={true}
        title={EventPageConstants.loadingText}
        desc={<BaseSpinner />}
      />
      <EventList eventList={eventList}></EventList>
    </Fragment>
  );
};

export default EventPage;
