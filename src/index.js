import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom'
import history from './comm/history';
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {lightBaseTheme} from "material-ui/styles/index";
import injectTapEventPlugin from 'react-tap-event-plugin';

// Containers
import Full from './containers/Full/'

// Views
import Login from './views/Pages/Login/'
import Register from './views/Pages/Register/'
import Page404 from './views/Pages/Page404/'
import Page500 from './views/Pages/Page500/'
import PrivateRoute from "./comm/PrivateRoute";

const muiTheme = getMuiTheme(lightBaseTheme);
injectTapEventPlugin();


// const fakeAuth = {
//     isAuthenticated: !!(fb.auth().currentUser),
//     // authenticate(cb) {
//     //     this.isAuthenticated = true;
//     //     // setTimeout(cb, 100) // fake async
//     // },
//     // signout(cb) {
//     //     this.isAuthenticated = false;
//     //     // setTimeout(cb, 100)
//     // }
// };
//
//
// fb.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         console.log('用户登录了..');
//         fakeAuth.isAuthenticated = true;
//     } else {
//         console.log('用户退出了..');
//         fakeAuth.isAuthenticated = false;
//     }
// });
//
// console.log(fakeAuth.isAuthenticated);
// const PrivateRoute = ({component: Component, ...rest}) => (
//     <Route {...rest} render={props => (
//         fakeAuth.isAuthenticated ? (
//             <Component {...props}/>
//         ) : (
//             <Redirect to={{
//                 pathname: '/login',
//                 state: {from: props.location}
//             }}/>
//         )
//     )}/>
// );

ReactDOM.render((
    <MuiThemeProvider muiTheme={muiTheme}>
        <HashRouter history={history}>
            <Switch>
                <Route exact path="/login" name="Login Page" component={Login}/>
                <PrivateRoute exact path="/register" name="Register Page" component={Register}/>
                <Route exact path="/404" name="Page 404" component={Page404}/>
                <Route exact path="/500" name="Page 500" component={Page500}/>
                <PrivateRoute path="/" name="Home" component={Full}/>
            </Switch>
        </HashRouter>
    </MuiThemeProvider>
), document.getElementById('root'));
