/**
 * Created by zgx on 2017/6/28.
 */
import React, {Component} from "react";
import * as firebase from "firebase";
import fb from "../../../comm/config";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
// import TextField from 'material-ui/TextField';
// import Toggle from 'material-ui/Toggle';
import {FlatButton} from "material-ui";
import {withRouter} from "react-router-dom";

const db = fb.database();
const dbRef = db.ref().child('/orders');

class OrderDetail extends Component {
    state = {
      readyData: false,
        haveData: true,
        order: null
    };



    constructor(props){
        super(props);

    }

    componentDidMount() {
        const { match } = this.props;
        const id = match.params.id;
        dbRef.child(id).on('value', snapshot => {
            console.log(snapshot);
            if (snapshot.hasChild) {
                this.setState({
                    hasdata: true,
                    order: snapshot.val()
                });
                //
                console.log(this.state.order);
            }else {
                this.setState({
                    hasdata: false,
                });
            }
        });
    }

    render(){
        const { match, location, history } = this.props;

        console.log(match.params.id);
        return (
            <div>
                <div className="col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-header">
                            身份信息
                        </div>
                        <div className="card-block">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-header">
                            职业信息
                        </div>
                        <div className="card-block">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-header">
                            联系人信息
                        </div>
                        <div className="card-block">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-header">
                            银行卡信息
                        </div>
                        <div className="card-block">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-header">
                            贷款信息
                        </div>
                        <div className="card-block">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-header">
                            芝麻信用
                        </div>
                        <div className="card-block">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-header">
                            证照信息
                        </div>
                        <div className="card-block">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                </div>

                <div className="float-right">
                    <button type="button" className="btn btn-outline-primary btn-sm">关闭</button>
                </div>

            </div>
        );
    }

}

export default withRouter(OrderDetail);