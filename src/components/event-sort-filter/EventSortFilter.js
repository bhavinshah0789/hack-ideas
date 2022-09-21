
import { useState } from 'react';
// materialUI
import { FormControl, Select, MenuItem } from '@mui/material';
// css classes
import classes from './EventSortFilter.module.css';
// constants
import EventSortFilterConstants from '../../data/EventSortFilterConstants';

const EventSortFilter = (props) => {
  const [sortFilter, setSortFilter] = useState(EventSortFilterConstants.eventCreationDate);

  const handleChange = (event) => {
    const value = event.target.value;
    setSortFilter(value);
    props.updateSortFilter(value);
  };

  return (
    <div className={classes['sortby-filter-section']}>
      <span className={classes['sortby-filter-text']}>Sort By</span>
      <FormControl
        variant="filled"
        className={classes['form-control']}
        sx={{ m: 1, minWidth: 180, backgroundColor: "white" }}
        hiddenLabel
      >
        <Select
          displayEmpty
          id="sort-by-select"
          value={sortFilter}
          className={classes['sort-select']}
          onChange={handleChange}
        >
          <MenuItem value={EventSortFilterConstants.eventCreationDate}>{EventSortFilterConstants.creationDateSelect}</MenuItem>
          <MenuItem value={EventSortFilterConstants.favoriteCounter}>{EventSortFilterConstants.favoriteCounterSelect}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default EventSortFilter;