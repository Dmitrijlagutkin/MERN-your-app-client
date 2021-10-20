import React, { useState } from "react"
import {useSelector, useDispatch} from 'react-redux'
import { useLocation, useHistory } from "react-router"
import { makeStyles } from "@material-ui/core/styles"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItemText from "@material-ui/core/ListItemText"
import { NavLink } from "react-router-dom"
import CloseIcon from "@material-ui/icons/Close"
import AppBar from "./Appbar"
import { ROUTE_MAIN, 
    ROUTE_CREATE_LIST, 
    ROUTE_LOGIN,
    ROUTE_FAVORITES 
} from "../constants"
import {logoutApi} from "../store/isAuthSlice"

const useStyles = makeStyles({
    list: {
        width: "250px",
        padding: "0 15px ",
    },
    menuIcon: {
        padding: "15px",
    },
    closeButton: {
        textAlign: "end",
        padding: "15px 15px 15px 0",
        cursor: "pointer",
    },
    navItems: {
        cursor: "pointer",
        textDecoration: "none",
        color: "#000",
        "&:hover": {
            color: "#3f51b599"
        },  
    },
    navItemsActive: {
        cursor: "pointer",
        textDecoration: "none",
        color: "#3f51b5"
    } ,
    divider: {
        width: "250px",
        margin: "15px auto",
    }
})

export default function SwipeableTemporaryDrawer() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation();
    const history = useHistory()
    const {isAuth} = useSelector((state) => state?.isAuth)
    const anchor = "left"
    const currentRoute = location.pathname
    const auth = localStorage.getItem("auth")
    
    const [open, setOpen] = useState(false)

    const toggleDrawer = () => {
        setOpen(!open)
    }

    const onClickLogout = () => {
        setOpen(!open)
        dispatch(logoutApi())
        history.push(ROUTE_LOGIN)
    }

    const list = (anchor) => (
        <div>
            <div className={classes.closeButton} onClick={toggleDrawer}>
                <CloseIcon color='primary' />
            </div>
            <List className={classes.list}>
                {isAuth ?
                    <>
                        <NavLink to={ROUTE_MAIN} button key={ROUTE_MAIN} className={currentRoute === ROUTE_MAIN ? classes.navItemsActive : classes.navItems}>
                            <ListItemText primary="Home" onClick={toggleDrawer} />
                        </NavLink>
                        <NavLink to={ROUTE_CREATE_LIST} button key={ROUTE_CREATE_LIST} className={currentRoute === ROUTE_CREATE_LIST ? classes.navItemsActive : classes.navItems}>
                            <ListItemText primary="Create list" onClick={toggleDrawer} />
                        </NavLink>
                        <NavLink to={ROUTE_FAVORITES} button key={ROUTE_FAVORITES} className={currentRoute === ROUTE_FAVORITES ? classes.navItemsActive : classes.navItems}>
                            <ListItemText primary="Favorites lists" onClick={toggleDrawer} />
                        </NavLink>
                    </>
                    : 
                    <NavLink to={ROUTE_LOGIN} button key={ROUTE_LOGIN} className={classes.navItems}>
                        <ListItemText primary="Login" onClick={toggleDrawer} />
                    </NavLink>
                }
            </List>
            {auth && 
                <>
                    <Divider className={classes.divider}/>
                    <span className={classes.list} onClick={onClickLogout} >
                        <span className={classes.navItems}>Logout</span>
                    </span>
                </>
            }
        </div>
    )

    return (
        <div>
            <React.Fragment>
                <AppBar onClickOpenMenu={toggleDrawer} />
                <SwipeableDrawer
                    anchor={anchor}
                    open={open}
                    onClose={toggleDrawer}
                    onOpen={toggleDrawer}>
                    {list(anchor)}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    )
}
