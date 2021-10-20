import {useEffect, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import { makeStyles } from '@material-ui/styles';
import Button from "../../components/Button";
import {ROUTE_LOGIN, ROUTE_CREATE_LIST} from "../../constants"
import ListCard from "./ListCard"
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import Tooltip from "../../components/Tooltip"
import ShareWithFriends from "../sharePage/ShareWithFriends"

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        maxWidth: "100vw",
    },
    titleWrapper: {
        maxWidth: "95%",
        margin: "0 auto",
    },
    topTitle: {
        maxWidth: "95%",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "4fr 4fr 4fr",
        alignItems: "center",
    },
    titleText: {
        fontSize: "24px",
        textTransform: "uppercase"
    },
    listWrapper: {
        maxWidth: "95%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    listItem: {
        padding: "15px",
    },
    bottomButton: {
        cursor: "pointer",
        display: "inline-block",
        marginBottom: "50px",
    },
    emailActivated: {
        padding: "10px 15px",
        display: "block",
        // fontWeight: "600",
        maxWidth: "100%",
        backgroundColor: "rgb(255, 183, 77)"
    },
    buttonCheckNow: {
        marginLeft: "10px",
        cursor: "pointer",
        color: "#3f51b5",
        textDecoration: "underline",
        fontWeight: "600",
    }
}));

const ListsPage = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const {lists} = useSelector((state) => state?.lists)
    const {isEmailActivated} = useSelector((state) => state?.isEmailActivated)
    const { isAuth } = useSelector((state) => state?.isAuth)
    const [searchText, setSearchText] = useState('')
    const auth = localStorage.getItem("auth")

    useEffect(() => {
        if(!isAuth && !auth) {
            history.push(ROUTE_LOGIN)
        }
    }, [isAuth])

    const onClickToCreateList = () => history.push(ROUTE_CREATE_LIST)
    const onChangeSearchText = (e) => setSearchText(e.target.value)

    return (
        <div className={classes.root}>
            {!isEmailActivated && !auth && <span className={classes.emailActivated}>
                Please check your email and follow the link to activate your email address
                <a href="https://mail.google.com/mail/u/0/?tab=rm#inbox" className={classes.buttonCheckNow}>check now</a>
            </span>}
            {!lists?.length && !auth ? 
                <div className={classes.titleWrapper}>
                    <h4 className={classes.titleText}>You don't have any lists yet. Start creating your lists.</h4>
                    <Button buttonText="Create your first list"
                        variant="contained"
                        color="primary"
                        onClickButton={onClickToCreateList}
                    />
                </div>
                :
                <div>
                    <div className={classes.topTitle}>
                        <span/>
                        <h4 className={classes.titleText}>Your lists</h4>
                        <div className={classes.titleWrapper}>
                            <Button buttonText="Create new list"
                            variant="contained"
                            color="primary"
                            onClickButton={onClickToCreateList}
                            />
                        </div>
                    </div>
                    
                    <div className={classes.listWrapper}>
                        {lists?.map((list, index) => {
                            return (
                                <div className={classes.listItem} key={list._id}>
                                    <ListCard listData={list}/>
                                </div>
                            )
                        })}
                    </div>
                    
                    <Tooltip title="Create new list"
                        placement="bottom"
                        arrow={true}>
                            <div className={classes.bottomButton}>
                                <LibraryAddIcon color="primary" onClick={onClickToCreateList}/>
                            </div>
                    </Tooltip>
                </div>
            }
        </div>
    )
}

export default ListsPage
