import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom'
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/'
import Charts from '../../views/Charts/'
import Widgets from '../../views/Widgets/'
import Buttons from '../../views/Components/Buttons/'
import Cards from '../../views/Components/Cards/'
import Forms from '../../views/Components/Forms/'
import Modals from '../../views/Components/Modals/'
import SocialButtons from '../../views/Components/SocialButtons/'
import Switches from '../../views/Components/Switches/'
import Tables from '../../views/Components/Tables/'
import Tabs from '../../views/Components/Tabs/'
import FontAwesome from '../../views/Icons/FontAwesome/'
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/'
import Banks from '../../views/Components/Settings/Banks';
import * as firebase from 'firebase';
import config from '../../comm/config';


if (firebase.apps.length < 1) {
    firebase.initializeApp(config);
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log('用户登录了..');
        fakeAuth.isAuthenticated = true;
    } else {
        console.log('用户退出了..');
        fakeAuth.isAuthenticated = false;
    }
});

const fakeAuth = {
    isAuthenticated: !!(firebase.auth().currentUser),
    // authenticate(cb) {
    //     this.isAuthenticated = true;
    //     // setTimeout(cb, 100) // fake async
    // },
    // signout(cb) {
    //     this.isAuthenticated = false;
    //     // setTimeout(cb, 100)
    // }
};

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


class Full extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        <Breadcrumb />
                        <div className="container-fluid">
                            <Switch>
                                <PrivateRoute path="/dashboard" name="Dashboard" component={Dashboard}/>
                                <Route path="/components/buttons" name="Buttons" component={Buttons}/>
                                <Route path="/components/cards" name="Cards" component={Cards}/>
                                <Route path="/components/forms" name="Forms" component={Forms}/>
                                <Route path="/components/modals" name="Modals" component={Modals}/>
                                <Route path="/components/social-buttons" name="Social Buttons"
                                       component={SocialButtons}/>
                                <Route path="/components/switches" name="Swithces" component={Switches}/>
                                <Route path="/components/tables" name="Tables" component={Tables}/>
                                <Route path="/components/tabs" name="Tabs" component={Tabs}/>
                                <Route path="/icons/font-awesome" name="Font Awesome" component={FontAwesome}/>
                                <Route path="/icons/simple-line-icons" name="Simple Line Icons"
                                       component={SimpleLineIcons}/>
                                <Route path="/widgets" name="Widgets" component={Widgets}/>
                                <Route path="/charts" name="Charts" component={Charts}/>
                                <Route path="/settngs/banks" name="Banks" component={Banks}/>
                                <Redirect from="/" to="/dashboard"/>
                            </Switch>
                        </div>
                    </main>
                    <Aside />
                </div>
                <Footer />
            </div>
        );
    }
}

export default Full;
