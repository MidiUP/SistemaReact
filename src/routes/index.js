import { Routes, Route } from 'react-router-dom'
import RouteFilter from './Route'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'

export default function MyRoutes () {
    return(
        <Routes>
            <Route exact path='/' element={ <RouteFilter component={SignIn}/> } />
            <Route exact path='/register' element={ <RouteFilter component={SignUp}/> } />
            <Route exact path='/dashboard' element={ <RouteFilter component={Dashboard} isPrivate/> } />
            <Route exact path='/profile' element={ <RouteFilter component={Profile} isPrivate/> } />
        </Routes>
    )
}