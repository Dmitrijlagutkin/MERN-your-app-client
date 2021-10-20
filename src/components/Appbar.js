import { useDispatch, useSelector } from "react-redux"
import {useHistory} from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Button from "./Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import {logoutApi} from "../store/isAuthSlice"
import {ROUTE_LOGIN, ROUTE_REGISTRATION} from "../constants"
import Loader from "./Loader"

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100vw",
        backgroundColor: "#3f51b5",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    appBar: {
        alignItems: "center",
        width: "100vw",
    },
    menuButton: {
        marginLeft: "5px",
        display: "flex",
        justifyContent: "space-between",
    },
    title: {
        flexGrow: 1,
    },
    button: {
        margin: "0 0"
    },
    buttonWrapper: {
        marginRight: "5px",
        textAlign: "end",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    InputSearch: {
        color: "#fff"
    }
}))

const ButtonAppBar = ({ onClickOpenMenu}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const { isAuth } = useSelector((state) => state.isAuth)
    const { isLoading } = useSelector((state) => state.isAuth)


    const onClickLogout = () => {
        history.push(ROUTE_LOGIN)
        dispatch(logoutApi())
    }
    const onClictToLoginPage = () => history.push(ROUTE_LOGIN)
    const onClickToRegistrationPage = () => history.push(ROUTE_REGISTRATION)

    return (
        <>
            {isLoading && <div><Loader isLoading={isLoading}/></div>}
            <div className={classes.root}>
                <IconButton
                    edge='start'
                    className={classes.menuButton}
                    color='inherit'
                    aria-label='menu'>
                    <MenuIcon onClick={onClickOpenMenu} />
                </IconButton>
                {isAuth ? 
                    <div className={classes.buttonWrapper}>
                        <Button className={classes.button} color='inherit' buttonText="Logout" onClickButton={onClickLogout}/>
                    </div>
                    :
                    <div className={classes.buttonWrapper}>
                        <Button className={classes.button} 
                            color='inherit' 
                            buttonText="Login"
                            onClickButton={onClictToLoginPage}
                            />
                        <Button className={classes.button} 
                            color='inherit' 
                            buttonText="Registration"
                            onClickButton={onClickToRegistrationPage}
                            />
                    </div>
                }
            </div>
        </>
    )
}

export default ButtonAppBar
