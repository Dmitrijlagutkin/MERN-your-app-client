import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { loginApi, registrationApi, logoutApi } from "../../store/isAuthSlice"
import { getUserData } from "../../store/dataSlice"
import Input from "../../components/Input"
import Button from "../../components/Button"
import { validateEmail } from "../../halpers/validation"
import { makeStyles } from '@material-ui/core/styles';
import {ROUTE_MAIN} from "../../constants"
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from "../../components/Tooltip"
import Alert from "../../components/Alert"

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
    },
    text: {
        color: "#3f51b5",
        fontSize: "12px",
        paddingBottom: "25px",
    },
    errorText: {
        color: "#f44336",
        fontSize: "12px",
        marginBottom: "25px",
    },
    itemWrapper: {
        paddingBottom: "25px"
    },
    inputWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "25px",
    },
    visibilityIcon: {
        cursor: "pointer",
    },
    buttonWrapper: {
        marginTop: "15px"
    }
}));

const LoginPage = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const { isAuth, errorMessage } = useSelector((state) => state.isAuth)
    const { user } = useSelector((state) => state.user)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isVisiblePassword, setIsVisiblePassword] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)

    useEffect(() => {
        setOpenAlert(!!errorMessage)
    }, [errorMessage])

    const onCloseHandler = () => setOpenAlert(false)

    const onChangeEmailHandler = (e) => setEmail(e.target.value)
    const onChangePasswordHandler = (e) => setPassword(e.target.value)

    const onBlurInput = () => setError(validateEmail(email))
    const onFocusInput = () => {
        setError('')
    }

    const onClickToggleVisibilityPass = () => setIsVisiblePassword(!isVisiblePassword)
    
    const onClickLogin = () => {
        dispatch(loginApi({ email, password }))
        if (!user && !!errorMessage) setOpenAlert(true)
    }
    // const onClickRegistration = () => {
    //     dispatch(registrationApi({ email, password }))
    // }

    useEffect(() => {
        if (user) {
            dispatch(getUserData(user.user.id))
            history.push(ROUTE_MAIN)
        }
    }, [user])

    return (
        <div className={classes.root}>
            <Alert openAlert={openAlert}
                severity="error"
                alertText={errorMessage}
                onCloseHandler={onCloseHandler}/>
            <h2>Login</h2>
            {/* {!!errorMessage && <span className={classes.errorText}>{errorMessage}</span>} */}
            <div className={classes.itemWrapper}>
                <Input label="email"
                    required={true}
                    onBlurInput={onBlurInput}
                    onChangeInput={(e) => onChangeEmailHandler(e)}
                    errorInput={!!error && true}
                    onFocusInput={onFocusInput}
                />
            <span className={!!error ? classes.errorText : classes.text}>{!!error ? error : "Please enter your email"}</span>
            </div>
            <div className={classes.itemWrapper}>
                
                <div className={classes.inputWrapper}>
                    <Input label="password"
                        required={true}
                        type={isVisiblePassword ? false : "password"}
                        onChangeInput={(e) => onChangePasswordHandler(e)}
                    />
                    <div onClick={onClickToggleVisibilityPass} className={classes.visibilityIcon}>
                        <Tooltip title={isVisiblePassword ? "Hide password" : "Show password"} 
                            placement="top"
                            arrow={true}>
                            {isVisiblePassword ? <VisibilityIcon color="primary" /> 
                            : 
                            <VisibilityOffIcon color="primary" />}
                        </Tooltip>
                    </div>
                </div>
                <span className={classes.text}>Please enter your password</span>
            </div>
            
            <div className={classes.buttonWrapper}> 
                <Button 
                    color="primary"
                    variant="contained"
                    buttonText="login"
                    onClickButton={onClickLogin}
                />
            </div>
        </div>
    )
}

export default LoginPage
