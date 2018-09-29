import React from 'react';
import injectSheet from 'react-jss';
import styles from './style';

const ToolBar = (props) => {
  const { classes, children } = props;

  return (
    <div className={classes.toolbar}>
      {children}
    </div>
  );
};

const component = injectSheet(styles)(ToolBar);

export default component;
