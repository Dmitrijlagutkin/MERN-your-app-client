import React, {useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import {useHistory} from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Button from "./Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import {logoutApi} from "../store/isAuthSlice"
import {ROUTE_MAIN, ROUTE_LOGIN} from "../constants"
import Loader from "./Loader"
import Input from "./Input"

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
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

const ButtonAppBar = ({ onClickOpenMenu }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const { isAuth } = useSelector((state) => state.isAuth)
    const { isLoading } = useSelector((state) => state.isAuth)
    const [searchText, setSearchText] = useState('')

    const onClickLogout = () => {
        history.push(ROUTE_MAIN)
        dispatch(logoutApi())
    }
    const onClictToLoginPage = () => history.push(ROUTE_LOGIN)
    const onChangeSearchText = (e) => setSearchText(e.target.value)

    return (
        <>
            {isLoading ?
                <div><Loader isLoading={isLoading}/></div>
                :
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
                                <Input label="Search"
                                    onChangeInput = {(e) => onChangeSearchText(e)}
                                    className={classes.InputSearch}
                                    isLiteInput={true}
                                />
                                <Button className={classes.button} color='inherit' buttonText="Logout" onClickButton={onClickLogout}/>
                            </div>
                            :
                            <div className={classes.buttonWrapper}>
                                <Button className={classes.button} 
                                    color='inherit' 
                                    buttonText="Sign in"
                                    onClickButton={onClictToLoginPage}
                                    />
                                <Button color='inherit' buttonText="Registration"/>
                            </div>
                    }
                </div>
            }
        </>
    )
}

export default ButtonAppBar
