import PageNotFound from "./pages/pageNotFound/PageNotFound"
import HomePage from "./pages/home/HomePage"
import AuthPage from "./pages/authPage/AuthPage"
import CreateListPage from "./pages/createListPage/CreateListPage"
import { ROUTE_PAGE_NOT_FOUND, 
	ROUTE_MAIN, 
	ROUTE_LOGIN, 
	ROUTE_CREATE_LIST,
	ROUTE_REGISTRATION,
	ROUTE_FAVORITES 
} from "./constants"

const routes = [
	{
		exact: true,
		path: ROUTE_PAGE_NOT_FOUND,
		component: PageNotFound
	},
    {
		exact: true,
		path: ROUTE_MAIN,
		component: HomePage
	},
    {
        exact: true,
		path: ROUTE_LOGIN,
		component: AuthPage
    },
	{
        exact: true,
		path: ROUTE_REGISTRATION,
		component: AuthPage
    },
	{
        exact: true,
		path: ROUTE_CREATE_LIST,
		component: CreateListPage
    },
	{
        exact: true,
		path: ROUTE_FAVORITES,
		component: HomePage
    }
]

export default routes