// components
import Event from '../event/Event';
// css classes
import classes from './EventList.module.css';

const EventList = (props) => {
  return (
    <div className={classes['event-list']}>
      {
        props.eventList && props.eventList.length &&
          props.eventList.map((eventData) => {
            return (
              <Event
                key={eventData.eventId}
                eventData={eventData}
              />
            )
          })
      }
    </div>
  );
};

export default EventList;