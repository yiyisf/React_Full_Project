import React, { Component } from 'react';
import fb from '../../../comm/config';
import {withRouter} from "react-router-dom";

class Register extends Component {

    submitRegister = () =>  {

      let email = document.getElementById('email').value;
      let password = document.getElementById('password').value;
      let confirmPassword = document.getElementById('confirmPassword').value;

      if (!email || !password ||!confirmPassword || (password!= confirmPassword)) {
        alert("请检查输入...");
        return;
      }

      fb.auth().createUserWithEmailAndPassword(email, password).then(() =>{
        alert("注册成功！");
        this.props.history.push('/login');
      },
          (e) =>{
        console.log(e);
        alert("注册失败:" + e.message);
      });

    };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mx-4">
                <div className="card-block p-4">
                  <h1>注册账户</h1>
                  <p className="text-muted">创建你的账户</p>

                  <div className="input-group mb-3">
                    <span className="input-group-addon">@</span>
                    <input type="text" className="form-control" placeholder="Email" id="email"/>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input type="password" className="form-control" placeholder="Password" id="password"/>
                  </div>
                  <div className="input-group mb-4">
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input type="password" className="form-control" placeholder="Repeat password" id="confirmPassword"/>
                  </div>
                  <button type="button" className="btn btn-block btn-success" onClick={this.submitRegister}>提交</button>
                </div>
                <div className="card-footer p-4">
                  <div className="row">
                    <div className="col-6">
                      <button className="btn btn-block btn-facebook" type="button"><span>facebook</span></button>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-block btn-twitter" type="button"><span>twitter</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
