import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  body: {
    padding: "10px"
  }
}));

const SimplePopover = ({anchorEl, onClose, children}) => {
  const classes = useStyles();
  

  const open = !!anchorEl;
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      {/* <MoreVertIcon onClick={onClick}/> */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={classes.body}>
          {children}
        </div>
      </Popover>
    </div>
  );
}

export default SimplePopover