import ListPage from "./ListsPage"
import { useLocation } from "react-router"
import { ROUTE_FAVORITES } from "../../constants"

const HomePage = () => {
    const location = useLocation()
    const currentRoute = location.pathname

    return (
        <ListPage isFavoritesPage={currentRoute === ROUTE_FAVORITES && true}/>
    )
}

export default HomePage