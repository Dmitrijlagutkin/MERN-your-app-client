import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from "@material-ui/icons/Close"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "10px",
    width: "350px",
  },
  headerWpapper: {
    height: "50px",
    maxWidth: "100%",
    margin: "0 auto 10px auto",
    display: "grid",
    gridTemplateColumns: "1fr 5fr 1fr",
    alignItems: "center",
    
  },
  title: {
    fontWeight: 600,
    textAlign: "center",
    fontSize: "18px"
  },
  closeButton: {
    textAlign: "end",
    cursor: "pointer"
  },
  body: {
    margin: "10px auto",
    textAlign: "center"
  }
}));

const TransitionsModal = ({children, withHeader, onClickClose, open, title}) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={onClickClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {<div className={classes.paper}>
            {withHeader && <div className={classes.headerWpapper}>
              <span/>
              <span className={classes.title}>{title}</span>
              <span className={classes.closeButton}>
                <CloseIcon onClick={onClickClose} />
              </span>
              
            </div>}
            <div className={classes.body}>
              {children}
            </div>
          </div>}
        </Fade>
      </Modal>
    </div>
  );
}

export default TransitionsModal