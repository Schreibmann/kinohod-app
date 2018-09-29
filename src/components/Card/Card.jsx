import React from 'react';
import injectSheet from 'react-jss';
import styles from './style';

const Card = (props) => {
  const {
    classes, title, adress, subway, labels,
  } = props;

  const textLabels = labels.length > 0
    ? labels.map((label, idx) => {
      if (label.type === 'text') {
        return <label key={idx}>{label.text.toUpperCase()}</label>;
      }
    })
    : null;

  const metroStations = subway.length > 0
    ? subway.map((station, idx) => (
      <div className={classes.station} key={idx}>
        <div
          className={classes.branchSign}
          style={{ border: `solid 3px #${station.color}` }}
        />
        <div className={classes.stationName}>{station.name}</div>
      </div>
    ))
    : null;

  return (
    <div className={classes.card}>
      <div className={classes.left}>
        <div className={classes.title}>{title}</div>
        <div className={classes.adress}>{adress}</div>
        <div className={classes.subway}>{metroStations}</div>
      </div>
      <div className={classes.right}>
        <div className={classes.labels}>{textLabels}</div>
        <div className={classes.addButton}>
          <button>+</button>
        </div>
      </div>
    </div>
  );
};

const component = injectSheet(styles)(Card);

export default component;
