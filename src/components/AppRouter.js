import { Switch, Route, Redirect } from "react-router-dom"
import routes from "../routes"

const AppRouter = () => {

    return (
        <Switch>
            {routes.map((route) => 
                <Route key={route.path} path={route.path} component={route.component} exact={route.exact}/>
            )}
            <Redirect to='404'/>
        </Switch>
    )
}

export default AppRouter