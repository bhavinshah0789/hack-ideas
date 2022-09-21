import { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
// components
import BaseDialog from '../base-dialog/BaseDialog';
import BaseSpinner from '../base-spinner/BaseSpinner';
// css classes
import classes from './AddEvent.module.css';
// constants
import AddEventConstants from '../../data/AddEventConstants';
// API
import HackIdeasAPI from '../../api/HackIdeasAPI';

const AddEvent = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const eventPattern = "^.+$";

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      await HackIdeasAPI.addEvent({
        eventId: uuidv4(),
        eventTitle: eventTitle,
        eventDescription: eventDesc,
        eventCreationDate: Date.now(),
        likedBy: [],
        favoriteCounter: 0,
      })
    } catch (err) {
      const error = new Error(
        err.message || AddEventConstants.customErrorMsg
      );
      throw error;
    }

    history.push('/events');
  };

  const updateEventTitle = (event) => {
    setEventTitle(event.target.value);
  };

  const updateEventDescription = (event) => {
    setEventDesc(event.target.value);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <Fragment>
      <main className={classes['add-event']}>
          <BaseDialog
            open={isLoading}
            hideActions={true}
            title={AddEventConstants.loadingText}
            desc={<BaseSpinner/>}
            >
          </BaseDialog>
          <section>
            <form onSubmit={submitForm}>
              <div className={classes.control}>
                <label htmlFor='event-title'>{AddEventConstants.eventTitleText}</label>
                <input
                  type='text'
                  id='event-title'
                  pattern={eventPattern}
                  value={eventTitle}
                  onChange={updateEventTitle}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor='event-description'>{AddEventConstants.eventDescriptionText}</label>
                <textarea
                  id='event-description'
                  pattern={eventPattern}
                  value={eventDesc}
                  rows="5"
                  onChange={updateEventDescription}
                />
              </div>
              <div className={classes.control}>
                <button type="submit">{AddEventConstants.addEventButtonText}</button>
              </div>
            </form>
          </section>
        </main>
    </Fragment>
  );
};

export default AddEvent;