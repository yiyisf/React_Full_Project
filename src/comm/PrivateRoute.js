/**
 * Created by liuzhe on 2017/6/24.
 */

import React, {Component} from 'react';
import {Redirect, Route} from "react-router-dom";
import fb from './config';

console.log(fb);
const fakeAuth = {
    isAuthenticated: !!(fb.auth().currentUser),
    // authenticate(cb) {
    //     this.isAuthenticated = true;
    //     // setTimeout(cb, 100) // fake async
    // },
    // signout(cb) {
    //     this.isAuthenticated = false;
    //     // setTimeout(cb, 100)
    // }
};


fb.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log('用户登录了..');
        fakeAuth.isAuthenticated = true;
    } else {
        console.log('用户退出了..');
        fakeAuth.isAuthenticated = false;
    }
});

console.log(fakeAuth.isAuthenticated);
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        fakeAuth.isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
        )
    )}/>
);



export default PrivateRoute;