import React, {Component} from "react";
import {Redirect, withRouter} from "react-router-dom";
import fb from "../../../comm/config";
import {Dialog, Snackbar} from "material-ui";


// console.log('login:' + fb.auth().currentUser);
// firebase.apps.forEach(function (app) {
//     console.log(app.name);
// });

// if(firebase.apps.length < 1){
//     firebase.initializeApp(fb);
//     console.log('login user' + firebase.auth().currentUser);
// }


class Login extends Component {

    state = {
        redirectToReferrer: false,
        already: false,
        alertMessage: "",
        alertOpen: false,
        open: false,
        errorMessage: "",
        isRegister : false
    };

    componentDidMount() {
        // console.log("登陆页面开始了...");
        this.firebaseListener = this.firebaseListener.bind(this);
        if (this.props.location.pathname === '/register') {
            this.setState({
                isRegister: true
            });
        }
        // fb.auth().onAuthStateChanged((user) => {
        //     console.log('componentDidMount 2....');
        //     if (user) {
        //         console.log('用户登录了。。。');
        //         if (!this.state.redirectToReferrer) {
        //             this.setState({redirectToReferrer: true});
        //         }
        //     } else {
        //         console.log('用户退出了。。。');
        //         if (this.state.redirectToReferrer) {
        //             this.setState({redirectToReferrer: false});
        //         }
        //         console.log('继续...');
        //     }
        //     console.log("redirect ?" + this.state.redirectToReferrer);
        //     if(!this.state.redirectToReferrer){
        //         this.setState({already: true});
        //     }
        // });
        // console.log('componentDidMount');
        // // if (fb.auth().currentUser) {
        // //     this.setState({redirectToReferrer: true});
        // // }
        // console.log('componentDidMount 1....');

    }

    componentWillUnmount() {
        // this.firebaseListener = undefined;
        // console.log("login will unmount");
        // this.firebaseListener.remove();
        // fb.auth().removeListener();
    }

    firebaseListener = fb.auth().onAuthStateChanged((user) => {
        console.log('componentDidMount 2....');
        if (user) {
            this.setState({already: true});
            // console.log('用户登录了。。。');
            if (!this.state.redirectToReferrer) {
                this.setState({redirectToReferrer: true});
            }
        } else {
            this.setState({already: false});
            // console.log('用户退出了。。。');
            if (this.state.redirectToReferrer) {
                this.setState({redirectToReferrer: false});
            }
        }
        if (!this.state.redirectToReferrer) {
            this.setState({already: true});
        }
    });


    handleLogin = () => {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        if(!email || !password){
            this.setState({
                alertOpen: true,
                alertMessage: "請輸入用戶名和密碼！"
            });
            return;
        }

        // console.log('开始登录' + email);
        // firebase.auth().signInAnonymously().catch(function (error) {
        //     console.log(error.code);
        //     console.log(error.message);
        // });
        this.setState({
            alertOpen: true,
            alertMessage: "正在登陆..."
        });
        fb.auth().signInWithEmailAndPassword(email, password).catch((e) => {
            // console.error(e.message);
            this.setState({
                alertOpen:false,
                open:true,
                errorMessage: e.message
            });
        });
        // this.setState({redirectToReferrer: true});
    };

    handleAlertClose = () => {
        this.setState({alertOpen: false, alertMessage:''});
    };

    handleErrorClose = () => {
        this.setState({open: false, errorMessage:''});
    };

    handleRegister = () => {
        this.props.history.push('/register');
    };

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}};
        const {redirectToReferrer, already} = this.state;
        if (this.state.redirectToReferrer) {
            return (
                <Redirect to={from}/>
            )
        } else if (!already) {
            return (
                <div className="loading-bar .bar">

                </div>
            );
        } else{
            return (
                <div className="app flex-row align-items-center">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="card-group mb-0">
                                    <div className="card p-4">
                                        <div className="card-block">
                                            <h1>登录</h1>
                                            <p className="text-muted">登录您的账户</p>
                                            <div className="input-group mb-3">
                                                <span className="input-group-addon"><i className="icon-user"></i></span>
                                                <input id="email" type="text" className="form-control"
                                                       placeholder="邮箱地址"/>
                                            </div>
                                            <div className="input-group mb-4" id="passDiv">
                                                <span className="input-group-addon"><i className="icon-lock"></i></span>
                                                <input id="password" type="password" className="form-control"
                                                       placeholder="密码"/>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <button type="button" className="btn btn-primary px-4"
                                                            onClick={this.handleLogin}>登录
                                                    </button>
                                                </div>
                                                <div className="col-6 text-right">
                                                    <button type="button" className="btn btn-link px-0">忘记密码?</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card card-inverse card-primary py-5 d-md-down-none"
                                         style={{width: 44 + '%'}}>
                                        <div className="card-block text-center">
                                            <div>
                                                <h2>注册</h2>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                    eiusmod
                                                    tempor incididunt ut labore et dolore magna aliqua.</p>
                                                <button type="button" className="btn btn-primary active mt-3" onClick={this.handleRegister}>马上注册!
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Dialog
                            actions={[]}
                            modal={true}
                            open={this.state.alertOpen}
                            onRequestClose={this.handleAlertClose}
                        >
                            {this.state.alertMessage}
                        </Dialog>
                    </div>
                    <Snackbar
                        open={this.state.open}
                        message={this.state.errorMessage}
                        action="OK"
                        autoHideDuration="5000"
                        onActionTouchTap={this.handleErrorClose}
                        onRequestClose={this.handleErrorClose}
                    />
                </div>
            );
        }
    }
}

export default withRouter(Login);
