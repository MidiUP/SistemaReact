import { Routes, Route } from 'react-router-dom'
import RouteFilter from './Route'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import Customers from '../pages/Customers'
import New from '../pages/New'

export default function MyRoutes () {
    return(
        <Routes>
            <Route exact path='/' element={ <RouteFilter component={SignIn}/> } />
            <Route exact path='/register' element={ <RouteFilter component={SignUp}/> } />
            <Route exact path='/dashboard' element={ <RouteFilter component={Dashboard} isPrivate/> } />
            <Route exact path='/profile' element={ <RouteFilter component={Profile} isPrivate/> } />
            <Route exact path='/customers' element={ <RouteFilter component={Customers} isPrivate/> } />
            <Route exact path='/new' element={ <RouteFilter component={New} isPrivate/> } />
        </Routes>
    )
}