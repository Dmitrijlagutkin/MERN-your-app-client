import React, { useState } from "react"
import {useSelector} from 'react-redux'
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
    ROUTE_LOGIN 
} from "../constants"

const useStyles = makeStyles({
    list: {
        width: 250,
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
})

export default function SwipeableTemporaryDrawer() {
    const classes = useStyles()
    const {isAuth} = useSelector((state) => state?.isAuth)
    const [state, setState] = useState({
        left: false,
    })
    const [anchor, setAnchor] = useState("left")
    const [open, setOpen] = useState(false)

    const toggleDrawer = () => {
        setOpen(!open)
    }

    const list = (anchor) => (
        <div>
            <div className={classes.closeButton} onClick={toggleDrawer}>
                <CloseIcon color='primary' />
            </div>
            <List className={classes.list}>
                {isAuth ?
                    <>
                        <NavLink to={ROUTE_MAIN} button key={ROUTE_MAIN}>
                            <ListItemText primary="Home" onClick={toggleDrawer} />
                        </NavLink>
                        <NavLink to={ROUTE_CREATE_LIST} button key={ROUTE_CREATE_LIST}>
                            <ListItemText primary="Create list" onClick={toggleDrawer} />
                        </NavLink>
                    </>
                    : 
                    <NavLink to={ROUTE_LOGIN} button key={ROUTE_LOGIN}>
                        <ListItemText primary="Login" onClick={toggleDrawer} />
                    </NavLink>
                }
            </List>
            <Divider />
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
