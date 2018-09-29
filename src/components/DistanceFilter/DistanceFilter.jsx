import React from 'react';
import injectSheet from 'react-jss';
import styles from './style';

const DistanceFilter = (props) => {
  const { classes, sortByDistance, toggleFilter } = props;

  return (
    <span>
      <input
        id="sortByDistance"
        className={classes.distanceFilter}
        type="checkbox"
        onChange={toggleFilter}
        checked={sortByDistance}
      />
      <label htmlFor="sortByDistance" className={classes.distanceFilterLabel}>
 Сначала ближайшие
      </label>
    </span>

  );
};

const component = injectSheet(styles)(DistanceFilter);

export default component;
