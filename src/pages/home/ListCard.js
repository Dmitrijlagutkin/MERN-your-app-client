import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux"
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareModal from "./shareModal/ShareModal"
import Tooltip from "../../components/Tooltip"
import Popover from '../../components/Popover.js';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { ROUTE_CREATE_LIST } from '../../constants';
import {updateList, deleteList} from "../../store/listsSlice"
import { useDate } from '../../hooks/useDate';
import CheckBox from "../../components/CheckBox"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    '& .MuiCardHeader-title': {
      fontWeight: 800,
      fontSize: "16px",
      textTransform: "uppercase"
    }, 
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  category: {
    fontSize: "12px",
    backgroundColor: "#ebebeb",
    color: "#000",
    padding: "3px 5px",
    marginRight: "5px",
    borderRadius: "10px"
  },
  listItemsWrapper: {
      maxWidth: "90%",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      alignItems: "center",
      fontSize: "18px"
  },
  itemNumber: {
    textAlign: "start",
    color: "#f44336",
  },
  itemName: {
    textAlign: "start",
    marginLeft: "10px",
    maxWidth: "150px",
    width: "150px",
    whiteSpace: "nowrap", 
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&:hover": {
      backgroundColor: "#fff",
      overflow: "visible",
      whiteSpace: "normal", 
    }
  },
  itemNameCompleted: {
    textDecoration: "line-through",
    color: "rgba(0, 0, 0, 0.4)",
  },
  isFavoriteActiveColor: {
    color: "#f44336",
    marginTop: "-5px"
  },
  isFavoriteUnActiveColor: {
      color: "rgba(0, 0, 0, 0.54)",
      marginTop: "-5px"
  },
  popoverIconButtons: {
    display: "block",
    cursor: "pointer"
  },
  popoverIconDelete: {
    color: "#f44336",
    cursor: "pointer",
    display: "block",
    paddingBottom: "10px"
  }
}));

const ListCard = ({listData}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const date = useDate()
  const isFavorites = listData.isFavorites
  const {user} = useSelector((state) => state?.user)
  const userId = user?.user?.id
  const [expanded, setExpanded] = useState(false);
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const [anchorElPopover, setAnchorElPopover] = useState(null);
  const [targetItemId, setTargetItemId] = useState("")
  const [changeItemIsConfirm, setChangeItemIsConfirm] = useState([])

  const onClickId = (id) => {
    setTargetItemId(id)
  }

  useEffect(() => {
    if(!!targetItemId) {
      setChangeItemIsConfirm(listData.listItem.map((item) => {
        if (item._id === targetItemId) {
          const newItem = {
            _id: item._id,
            itemName: item.itemName,
            isComplete: !item.isComplete
          }
          return newItem
        } else {
          return item
        }
      })) 
      setTargetItemId('')
    }
  }, [targetItemId])


  useEffect(() => {
    if(!!changeItemIsConfirm.length) {
      dispatch(updateList({
        listTitle: listData.listTitle, 
        date, 
        category: listData.category, 
        listItem: changeItemIsConfirm, 
        isFavorites: listData.isFavorites,
        id: listData._id,
        userId
      }))
    }
  }, [changeItemIsConfirm])

  const handleClickAnchorElPopover = (event) => {
    setAnchorElPopover(event.currentTarget);
  };

  const handleCloseAnchorElPopover = () => {
    setAnchorElPopover(null);
  };

  const handleExpandClick = () => setExpanded(!expanded)
  const onClickOpenShareModal = () => setIsOpenShareModal(true)
  const onClickCloseShareModal = () => setIsOpenShareModal(false)
  const onClickToUpdate = () => history.push(ROUTE_CREATE_LIST)
  const handleDeleteList = () => {
    dispatch(deleteList({id: listData?._id, userId}))
  }
  
  const onClickChangeIsFavorite = () => {
    dispatch(updateList({
        listTitle: listData.listTitle, 
        date, 
        category: listData.category, 
        listItem: listData.listItem, 
        isFavorites: !isFavorites,
        id: listData._id,
        userId
      }))
  }
  
  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {listData.listTitle.slice(0, 1).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon onClick={handleClickAnchorElPopover} />
              <Popover anchorEl={anchorElPopover} 
                onClose={handleCloseAnchorElPopover}>
                  <div>
                    <DeleteIcon className={classes.popoverIconDelete} 
                      onClick={handleDeleteList}/>
                    <CreateIcon className={classes.popoverIconButtons} 
                      color="primary"
                      onClick={onClickToUpdate}
                      />
                  </div>
              </Popover>
            </IconButton>
          }
          
          title={listData.listTitle}
          subheader={listData.date}
        />
        
        <div>
          <span className={classes.category}>category</span>
          <span>{listData?.category ? listData?.category : "no category"}</span>
        </div>
        <CardActions disableSpacing>
          <Tooltip title={listData.isFavorites ? "Remove from favorites" : "Add to favourites"}
              placement="bottom"
              arrow={true}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon className={listData.isFavorites ? classes.isFavoriteActiveColor : classes.isFavoriteUnActiveColor}
                onClick={onClickChangeIsFavorite}
              />
            </IconButton>
          </Tooltip>
          <IconButton aria-label="share">
            <ShareIcon onClick={onClickOpenShareModal}/>
            <ShareModal open={isOpenShareModal} 
              onClickClose={onClickCloseShareModal}
              listData={listData}
            />
          </IconButton> 
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {listData.listItem.map((item, index) => {
              return (
                <div className={classes.listItemsWrapper} key={item.itemName} onClick={() => onClickId(item._id)}>
                  <span className={classes.itemNumber}>{index + 1}.</span>
                  <span className={classes.itemName, !!item.isComplete && classes.itemNameCompleted}>{item.itemName}</span>
                  <CheckBox defoultCheckbox={true} isComplete={item.isComplete}/>
                </div>
              )
            })}
            
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}

export default ListCard