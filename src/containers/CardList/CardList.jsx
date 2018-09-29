import React from 'react';
import injectSheet from 'react-jss';
import Card from '../../components/Card/Card';
import styles from './style';

const CardList = (props) => {
  const { classes, cinemas } = props;
  const cards = cinemas.map(cinema => (
    <Card
      key={cinema.id}
      title={cinema.attributes.shortTitle !== '' ? cinema.attributes.shortTitle : cinema.title}
      adress={cinema.attributes.mall !== '' ? cinema.attributes.mall : cinema.attributes.adress}
      subway={cinema.attributes.subway}
      labels={cinema.attributes.labels}
    />
  ));

  return (
    <div className={classes.cardList}>
      {cards}
    </div>
  );
};

const component = injectSheet(styles)(CardList);

export default component;
