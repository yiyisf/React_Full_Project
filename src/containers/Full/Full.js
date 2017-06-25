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
import fb from '../../comm/config';

const messaging = fb.messaging();
// if (firebase.apps.length < 1) {
//     firebase.initializeApp(fb);
// }

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


class Full extends Component {
    componentDidMount() {
        console.log('主页面开始了...');
        this.initMessage();

    }

    initMessage() {
        this.reqPermission();
        messaging.onMessage(function (payload) {
            console.log(payload);
            // If we get a notification while focus on the app
            if (payload.notification) {
                let data = {
                    message: payload.notification.body
                };
                // this.snackbar.MaterialSnackbar.showSnackbar(data);
            }
        });
        messaging.setBackgroundMessageHandler(function(payload) {
            console.log('[firebase-messaging-sw.js] Received background message ', payload);
            // Customize notification here
            const notificationTitle = 'Background Message Title';
            const notificationOptions = {
                body: 'Background Message body.',
                icon: '/firebase-logo.png'
            };

            // return self.registration.showNotification(notificationTitle,
            //     notificationOptions);
        });
    }

    saveToken() {
        console.log('开始获取token');
        console.log(messaging.getToken());
        messaging.getToken().then(function (token) {
            console.log('message token:' + token);
            if (!token) {
                console.log('没有token');
                this.reqPermission();
            } else {
                fb.database().ref('admin/'+ token).set(true);
            }
        }).catch(function (e) {
            console.log(e);
        });
    }


    reqPermission() {
        console.log('......');
        fb.messaging().requestPermission().then(()=>{
            this.saveToken();
        }).catch(e=>{
            console.log(e)
        })
    }



    // requestPermission() {
    //     console.log('Requesting permission...');
    //     messaging.requestPermission().then(() => {
    //         console.log('Notification permission granted.');
    //         this.saveToken();
    //     }).catch((err) => {
    //         console.error('Unable to get permission to notify.', err);
    //     });
    // }

    componentWillUnmount() {
        // this.firebaseListener = undefined;
    }


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
                                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
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
