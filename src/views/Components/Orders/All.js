/**
 * Created by zgx on 2017/6/23.
 */
import React, {Component} from "react";
import * as firebase from "firebase";
import fb from "../../../comm/config";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
// import TextField from 'material-ui/TextField';
// import Toggle from 'material-ui/Toggle';
import {FlatButton} from "material-ui";
import {withRouter} from "react-router-dom";

const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};


// console.log('' + firebase.apps);

const db = fb.database();
const dbRef = db.ref().child('/orders');

class AllOrders extends Component {

    state = {
        fixedHeader: true,
        fixedFooter: true,
        stripedRows: false,
        showRowHover: true,
        selectable: false,
        multiSelectable: false,
        enableSelectAll: false,
        deselectOnClickaway: true,
        showCheckboxes: false,
        height: '300px',
        orders: null,
        hasdata: false,
        open: false,
        alertOpen: false,
        alertMessage: '',
        title: '',
        selectBank: -1,
        editBankName: '',
        editBankStatus: "null",
        editBankLogo: '',
    };

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleChange = (event) => {
        this.setState({height: event.target.value});
    };

    handleOpen = () => {
        this.setState({
            editBankName: '',
            editBankStatus: "null",
            open: true,
        });
    };

    handleAlertOpen = () => {
        this.setState({alertMessage: '请选择一条记录!', alertOpen: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit = () => {
        this.setState({open: false});
    };

    handleAlertClose = () => {
        this.setState({alertOpen: false, alertMessage: ''});
    };

    componentDidMount() {
        this.setState({title: ''});
        dbRef.on('value', snapshot => {
            if (snapshot.numChildren() > 0) {
                // let temporders = [];
                // Object.entries(snapshot.val()).forEach((row) => {
                //     temporders.push(row[1]);
                // });
                this.setState({
                    hasdata: true,
                    orders: snapshot.val()
                });
                //
                console.log(this.state.orders);
            }else {
                this.setState({
                    hasdata: false,
                });
            }
        });
    }

    render() {

        let selectIndex = -1;
        this.handleOpen1 = () => {
            if (selectIndex < 0) {
                this.handleAlertOpen();
                return;
            }
            this.setState({
                // editBankName: this.state.orders[selectIndex].name,
                // editBankStatus: this.state.orders[selectIndex].status,
                // editBankLogo: this.state.orders[selectIndex].logo,
                open: true,
            });
        };


        return (

            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-align-justify"/> 订单列表
                            </div>
                            <div className="card-block">
                                <Table
                                    id="table"
                                    // height={this.state.height}
                                    fixedHeader={true}
                                    fixedFooter={false}
                                    selectable={this.state.selectable}
                                    multiSelectable={this.state.multiSelectable}
                                    onCellClick={(rowNumber ,columnId ) => {
                                        if(columnId === 6){
                                            console.log(Object.values(this.state.orders)[rowNumber]);
                                        }
                                    }}
                                >
                                    <TableHeader
                                        displaySelectAll={this.state.showCheckboxes}
                                        adjustForCheckbox={this.state.showCheckboxes}
                                        enableSelectAll={this.state.enableSelectAll}
                                    >
                                        <TableRow>
                                            <TableHeaderColumn tooltip="序号">序号</TableHeaderColumn>
                                            <TableHeaderColumn tooltip="">订单号</TableHeaderColumn>
                                            <TableHeaderColumn tooltip="">贷款金额</TableHeaderColumn>
                                            <TableHeaderColumn tooltip="">贷款天数</TableHeaderColumn>
                                            <TableHeaderColumn tooltip="">申请日期</TableHeaderColumn>
                                            <TableHeaderColumn tooltip="">订单状态</TableHeaderColumn>
                                            <TableHeaderColumn tooltip="">操作</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody
                                        displayRowCheckbox={this.state.showCheckboxes}
                                        deselectOnClickaway={this.state.deselectOnClickaway}
                                        showRowHover={this.state.showRowHover}
                                        stripedRows={this.state.stripedRows}
                                    >
                                        {this.state.hasdata
                                            ?
                                            Object.keys(this.state.orders).map((key, index) => (
                                                <TableRow key={index}>
                                                    <TableRowColumn>{index + 1}</TableRowColumn>
                                                    <TableRowColumn>{key}</TableRowColumn>
                                                    <TableRowColumn>
                                                        {this.state.orders[key].blance}
                                                    </TableRowColumn>
                                                    <TableRowColumn>
                                                        {this.state.orders[key].term + this.state.orders[key].terUnit}
                                                    </TableRowColumn>
                                                    <TableRowColumn>
                                                        {new Date(this.state.orders[key].timestamp).toLocaleDateString()}
                                                    </TableRowColumn>
                                                    <TableRowColumn>
                                                        {this.state.orders[key].status === "00" ?
                                                            <span className="badge badge-info">待审核</span> :
                                                            this.state.orders[key].status === "01" ?
                                                                <span className="badge badge-success">已通过</span> :
                                                                this.state.orders[key].status === "02" ?
                                                                    <span className="badge badge-danger">已拒绝</span> :
                                                                    this.state.orders[key].status === "10" ?
                                                                        <span className="badge badge-info">待签约</span> :
                                                                        this.state.orders[key].status === "20" ?
                                                                            <span className="badge badge-info">待放款</span> :
                                                                            this.state.orders[key].status === "30" ?
                                                                                <span className="badge badge-success">已放款</span> :
                                                                                this.state.orders[key].status === "40" ?
                                                                                    <span className="badge badge-danger">已逾期</span> :
                                                                        <span className="badge badge-success">已还清</span>}
                                                    </TableRowColumn>
                                                    <TableRowColumn>
                                                        <button type="button" className="btn btn-link" >查看</button>
                                                    </TableRowColumn>
                                                </TableRow>
                                            ))
                                            :
                                            <TableRow>
                                                <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                                                    暂时无记录！
                                                </TableRowColumn>
                                            </TableRow>
                                        }
                                    </TableBody>

                                </Table>
                                <ul className="pagination">
                                    <li className="page-item"><a className="page-link" href="#">上一页</a></li>
                                    <li className="page-item active">
                                        <a className="page-link" href="#">1</a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">4</a></li>
                                    <li className="page-item"><a className="page-link" href="#">下一页</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AllOrders);