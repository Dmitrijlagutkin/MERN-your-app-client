import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

const SimpleTooltips = ({children, title, placement, arrow=false}) => {
  const classes = useStyles();

  return (
    <div>
      <Tooltip title={title} 
        placement={placement} 
        arrow={arrow}>
          {children}
      </Tooltip>
    </div>
  );
}

export default SimpleTooltips