import { useState } from 'react';
import { useSelector } from 'react-redux';
// Material UI
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
// css classes
import classes from './Event.module.css'
// constants
import EventConstants from '../../data/EventConstants';
// API
import HackIdeasAPI from '../../api/HackIdeasAPI';

const Event = (props) => {
  const userId = useSelector((state) => state.auth.userId);

  const getLikeCount = () => {
    return props.eventData.favoriteCounter;
  };
  const isFavoriteEvent = () => {
    return props.eventData.likedBy.indexOf(userId) > -1;
  };
  const [isFavorite, setIsFavorite] = useState(isFavoriteEvent());
  const [favoriteCount, setIsFavoriteCount] = useState(getLikeCount());

  const getDateString = (creationDate) => {
    return new Date(creationDate).toDateString();
  };

  const toggleFavHander = async () => {
    let data;
    try {
      const eventId = props.eventData.eventId;
      data = await HackIdeasAPI.updateEvent(eventId, userId, isFavorite);
    } catch (error) {
      console.log(error.message || EventConstants.customErrorMsg);
    }
    setIsFavorite(!isFavorite);
    setIsFavoriteCount(data.favoriteCounter);
  };

  return (
    <Card className={classes.event}>
      <CardHeader
        title={props.eventData.eventTitle}
        subheader={getDateString(props.eventData.eventCreationDate)}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">{props.eventData.eventDescription}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label={EventConstants.favoriteAriaLabel}
          onClick={toggleFavHander}
        >
          {isFavorite ? <Favorite className={classes['favorite-icon']}/> : <FavoriteBorder />}
        </IconButton>
        <span>{favoriteCount}</span>
      </CardActions>
    </Card>
  );
  
};

export default Event;