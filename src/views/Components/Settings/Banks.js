/**
 * Created by zgx on 2017/6/23.
 */
import React, {Component} from 'react';
import * as firebase from 'firebase';
import fb from '../../../comm/config';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {Dialog, FlatButton, RaisedButton} from "material-ui";

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


console.log('' + firebase.apps);

const db = fb.database();
const dbRef = db.ref().child('comm/banks');

class Banks extends Component {

    state = {
        fixedHeader: true,
        fixedFooter: true,
        stripedRows: false,
        showRowHover: true,
        selectable: true,
        multiSelectable: false,
        enableSelectAll: true,
        deselectOnClickaway: true,
        showCheckboxes: true,
        height: '300px',
        banks: [],
        hasdata: false,
        open: false,
        alertOpen: false,
        alertMessage:'',
        title: '',
        selectBank: -1,
        editBankName: '',
        editBankStatus: "null",
        editBankLogo: '',
        delRec: false
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
            delRec: false
        });
    };

    handleAlertOpen = () =>{
      this.setState({alertMessage:'请选择一条记录!',alertOpen: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit = () => {
        console.log("delRec? " + this.state.delRec);
        console.log("bankStatus:" + this.state.editBankStatus);
        console.log("is true: " + (this.state.editBankStatus === 'true'));
        if(!this.state.delRec){
            let  status = (this.state.editBankStatus === 'true');
            // if(this.state.editBankStatus === 'true') {
            //     let status = true;
            // }
            dbRef.child(this.state.editBankName).set({
                "name": this.state.editBankName,
                "status": status
            }).then(()=>{this.setState({open: false});}).catch((e)=>{
                this.setState({alertMessage: e.message, alertOpen: true});
            })
        }else {
            this.setState({open: false});
        }
    };

    handleAlertClose = () => {

        this.setState({alertOpen: false, alertMessage:''});
    };

    componentDidMount() {
        this.setState({title: ''});
        dbRef.on('value', snapshot => {
            if (snapshot.numChildren() > 0) {
                let tempbanks = [];
                Object.entries(snapshot.val()).forEach((row) => {
                    // tempbanks.add(row[1]);
                    console.log(row[1]);
                    tempbanks.push(row[1]);
                });
                this.setState({
                    hasdata: true,
                    banks: tempbanks
                });
                //
                console.log(this.state.banks);
            }
        });
    }

    // render() {
    //     return (
    //         <div>
    //             <Table
    //                 // height={this.state.height}
    //                 fixedHeader={true}
    //                 fixedFooter={false}
    //                 selectable={this.state.selectable}
    //                 multiSelectable={this.state.multiSelectable}
    //             >
    //                 <TableHeader
    //                     displaySelectAll={this.state.showCheckboxes}
    //                     adjustForCheckbox={this.state.showCheckboxes}
    //                     enableSelectAll={this.state.enableSelectAll}
    //                 >
    //                     <TableRow>
    //                         <TableHeaderColumn colSpan="4" tooltip="支持银行列表" style={{textAlign: 'center'}}>
    //                             支持银行列表
    //                         </TableHeaderColumn>
    //
    //                     </TableRow>
    //                     <TableRow>
    //                         <TableHeaderColumn tooltip="序号">序号</TableHeaderColumn>
    //                         <TableHeaderColumn tooltip="银行名称">银行名称</TableHeaderColumn>
    //                         <TableHeaderColumn tooltip="logo地址">logo</TableHeaderColumn>
    //                         <TableHeaderColumn tooltip="记录操作">操作</TableHeaderColumn>
    //                     </TableRow>
    //                 </TableHeader>
    //                 <TableBody
    //                     displayRowCheckbox={this.state.showCheckboxes}
    //                     deselectOnClickaway={this.state.deselectOnClickaway}
    //                     showRowHover={this.state.showRowHover}
    //                     stripedRows={this.state.stripedRows}
    //                 >
    //                     {this.state.hasdata
    //                         ?
    //                         this.state.banks.map((row, index) => (
    //                             <TableRow key={index}>
    //                                 <TableRowColumn>{index + 1}</TableRowColumn>
    //                                 <TableRowColumn>{row.name}</TableRowColumn>
    //                                 <TableRowColumn>
    //                                     <img src={row.logo} width={50} height={50}/>
    //                                 </TableRowColumn>
    //                                 <TableRowColumn>
    //                                     <FlatButton label="查看"/>
    //
    //                                     <FlatButton label="修改" primary={true} onTouchTap={console.log('修改')}/>
    //
    //                                     <FlatButton label="删除" secondary={true} />
    //                                 </TableRowColumn>
    //                             </TableRow>
    //                         ))
    //                         :
    //                         <TableRow>
    //                             <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
    //                                 正在加载数据...
    //                             </TableRowColumn>
    //                         </TableRow>
    //                     }
    //                 </TableBody>
    //
    //             </Table>
    //
    //         </div>
    //     );
    // }

    render() {
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="提交"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSubmit}
            />,
        ];

        const alertActions = [
            <FlatButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleAlertClose}
            />,
        ];

        let selectIndex = -1;
        this.handleOpen1 = () => {
            if(selectIndex < 0){
                this.handleAlertOpen();
                return;
            }
            this.setState({
                editBankName: this.state.banks[selectIndex].name,
                editBankStatus: this.state.banks[selectIndex].status,
                editBankLogo: this.state.banks[selectIndex].logo,
                open: true,
                delRec: false
            });
        };


        return (

            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-align-justify"/> 银行列表
                                <div className="float-right">
                                    <RaisedButton label="新增" onTouchTap={this.handleOpen}/>
                                    <RaisedButton label="修改" primary={true} onTouchTap={this.handleOpen1}/>
                                    <RaisedButton label="删除" secondary={true}/>
                                </div>
                            </div>
                            <div className="card-block">
                                <Table
                                    id="table"
                                    // height={this.state.height}
                                    fixedHeader={true}
                                    fixedFooter={false}
                                    selectable={this.state.selectable}
                                    multiSelectable={this.state.multiSelectable}
                                    onRowSelection={(selectedRows) => {
                                        console.log(selectedRows);
                                        selectIndex = selectedRows[0];
                                        console.log(selectIndex);
                                    }}
                                >
                                    <TableHeader
                                        displaySelectAll={this.state.showCheckboxes}
                                        adjustForCheckbox={this.state.showCheckboxes}
                                        enableSelectAll={this.state.enableSelectAll}
                                    >
                                        <TableRow>
                                            <TableHeaderColumn colSpan="4" tooltip="支持银行列表"
                                                               style={{textAlign: 'center'}}>
                                                支持银行列表
                                            </TableHeaderColumn>

                                        </TableRow>
                                        <TableRow>
                                            <TableHeaderColumn tooltip="序号">序号</TableHeaderColumn>
                                            <TableHeaderColumn tooltip="银行名称">银行名称</TableHeaderColumn>
                                            <TableHeaderColumn tooltip="logo地址">logo</TableHeaderColumn>
                                            <TableHeaderColumn tooltip="">状态</TableHeaderColumn>
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
                                            this.state.banks.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableRowColumn>{index + 1}</TableRowColumn>
                                                    <TableRowColumn>{row.name}</TableRowColumn>
                                                    <TableRowColumn>
                                                        <img src={row.logo} width={50} height={50}/>
                                                    </TableRowColumn>
                                                    <TableRowColumn>
                                                        {row.status ? <span className="badge badge-success">Yes</span> :
                                                            <span className="badge badge-danger">No</span>}
                                                    </TableRowColumn>
                                                </TableRow>
                                            ))
                                            :
                                            <TableRow>
                                                <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                                                    正在加载数据...
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
                <div>
                    <Dialog
                        title=''
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                        autoScrollBodyContent={true}
                        onRequestClose={this.handleClose}
                    >
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <strong>银行信息</strong>
                                    </div>
                                    <div className="card-block">
                                        <form action="" method="post" encType="multipart/form-data"
                                              className="form-horizontal">
                                            <div className="form-group row">
                                                <label className="col-md-3 form-control-label"
                                                       htmlFor="text-input">银行名称</label>
                                                <div className="col-md-9">
                                                    <input type="text" id="text-input" name="text-input"
                                                           className="form-control" placeholder="Text"
                                                           value={this.state.editBankName} onChange={(v) => {
                                                        this.setState({editBankName: v.target.value});
                                                        console.log(v.target.value);
                                                    }}/>
                                                    <span className="help-block">输入支持银行的名称</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-md-3 form-control-label" htmlFor="file-input">银行logo文件</label>
                                                <div className="col-md-9">
                                                    <img src={this.state.editBankLogo} width={50} height={50}/>
                                                    <input type="file" id="file-input" name="file-input" onChange={(v)=>{console.log(v.target.value)}}/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-md-3 form-control-label"
                                                       htmlFor="select">是否可用</label>
                                                <div className="col-md-9">
                                                    <select id="select" name="select" className="form-control"
                                                            value={this.state.editBankStatus} onChange={(v) => {
                                                        this.setState({editBankStatus: v.target.value})
                                                    }}>
                                                        <option value="null">请选择</option>
                                                        <option value="true">可用</option>
                                                        <option value="false">不可用</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </div>
                <div>
                    <Dialog
                        actions={alertActions}
                        modal={false}
                        open={this.state.alertOpen}
                        onRequestClose={this.handleAlertClose}
                    >
                        {this.state.alertMessage}
                    </Dialog>
                </div>
            </div>
        )
    }
}

export default Banks;