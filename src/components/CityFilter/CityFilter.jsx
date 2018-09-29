import React from 'react';
import injectSheet from 'react-jss';
import styles from './style';

const CityFilter = (props) => {
  const {
    classes, cityID, cities, setCity,
  } = props;
  const options = cities.map(city => (
    <option key={city.id} value={city.id}>
      {city.attributes.name}
    </option>
  ));

  return (
    <select className={classes.CityFIlter} onChange={setCity} value={cityID}>
      {options}
    </select>
  );
};

const component = injectSheet(styles)(CityFilter);

export default component;
