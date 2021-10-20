import { useEffect} from "react"
import { BrowserRouter} from "react-router-dom"
import { useDispatch } from "react-redux"
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

    return (
        <>
            <BrowserRouter>
                <NavBar />
                <AppRouter/> 
            </BrowserRouter>  
        </>
    )
}

export default App
