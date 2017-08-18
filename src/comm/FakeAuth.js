/**
 * Created by zgx on 2017/8/18.
 */
import fb from './config';
import * as firebase from 'firebase';

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

console.log("fakeauth:" + FakeAuth.isAuthenticated);

fb.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log('用户登录了..');
        FakeAuth.authenticate();
    } else {
        console.log('用户退出了..');
        FakeAuth.signout();
    }
});



export default FakeAuth;