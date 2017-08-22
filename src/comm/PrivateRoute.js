/**
 * Created by liuzhe on 2017/6/24.
 */

import React, {Component} from 'react';
import {Redirect, Route} from "react-router-dom";
// import FakeAuth from './FakeAuth';
import fb from './config';

const FakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        // setTimeout(cb, 100) ;// fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        // setTimeout(cb, 100)
    }
};

// console.log("fakeauth:" + FakeAuth.isAuthenticated);

fb.auth().onAuthStateChanged(function (user) {
    if (user) {
        // console.log('用户登录了..');
        FakeAuth.authenticate();
    } else {
        // console.log('用户退出了..');
        FakeAuth.signout();
    }
});


console.log(!!(fb.auth().currentUser));
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        FakeAuth.isAuthenticated ? (
                props.location.pathname === '/register' ? (
                        <Redirect to={{
                            pathname: '/',
                            state: {from: props.location}
                        }}/>
                    ) : (<Component {...props}/>)
            ) : (
                props.location.pathname === '/register' ? (<Component {...props}/>) :
                    (
                        <Redirect to={{
                            pathname: '/login',
                            state: {from: props.location}
                        }}/>
                    )
            )
    )}/>
);


export default PrivateRoute;
