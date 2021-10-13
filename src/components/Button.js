import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: 0,
    },
  }
}));

const ContainedButtons = ({color, isDisabled, variant, buttonText, onClickButton}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant={variant} 
        color={color} 
        disabled={isDisabled} 
        onClick={onClickButton} 
        size="small" 
        className={classes.myButton}>
          {buttonText}
      </Button>

    </div>
  );
}

export default ContainedButtons