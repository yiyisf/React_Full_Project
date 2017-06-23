import React, { Component } from 'react';

class Page404 extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">404</h1>
                <h4 className="pt-3">欧! 页面找不到.</h4>
                <p className="text-muted">您要查找的页面找不到.</p>
              </div>
              <div className="input-prepend input-group">
                <span className="input-group-addon"><i className="fa fa-search"></i></span>
                <input className="form-control" size="16" type="text" placeholder="您要查找点什么?" />
                <span className="input-group-btn">
                  <button className="btn btn-info" type="button">搜索</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Page404;
