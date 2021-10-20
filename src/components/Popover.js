import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles((theme) => ({
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