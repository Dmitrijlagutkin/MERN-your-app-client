import PageNotFound from "./pages/pageNotFound/PageNotFound"
import ListsPage from "./pages/listPage/ListsPage"
import LoginPage from "./pages/authPage/LoginPage"
import CreateListPage from "./pages/createListPage/CreateListPage"
import { ROUTE_PAGE_NOT_FOUND, 
	ROUTE_MAIN, 
	ROUTE_LOGIN, 
	ROUTE_CREATE_LIST 
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
		component: ListsPage
	},
    {
        exact: true,
		path: ROUTE_LOGIN,
		component: LoginPage
    },
	{
        exact: true,
		path: ROUTE_CREATE_LIST,
		component: CreateListPage
    }
]

export default routes