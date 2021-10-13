import { useEffect } from "react"
import { BrowserRouter} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { checkAuth } from "./store/isAuthSlice"
import AppRouter from "./components/AppRouter"
import NavBar from "./components/Navbar"

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(checkAuth())
        }
    }, [])
    const { isAuth } = useSelector((state) => state.isAuth)
    const { isLoading } = useSelector((state) => state.isAuth)
    const { isActivated } = useSelector((state) => state.isEmailActivated)

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter/> 
        </BrowserRouter>
    )
}

export default App
