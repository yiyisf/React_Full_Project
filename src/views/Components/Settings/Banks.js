/**
 * Created by zgx on 2017/6/23.
 */
import React, { Component } from 'react';
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
import {FlatButton} from "material-ui";

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

class Banks extends Component{

    state = {
        fixedHeader: true,
        fixedFooter: true,
        stripedRows: false,
        showRowHover: false,
        selectable: false,
        multiSelectable: false,
        enableSelectAll: false,
        deselectOnClickaway: true,
        showCheckboxes: false,
        height: '300px',
        banks: [],
        hasdata: false,
    };

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleChange = (event) => {
        this.setState({height: event.target.value});
    };

    componentDidMount() {
        dbRef.on('value', snapshot => {
            if (snapshot.numChildren() > 0) {
                let tempbanks= [];
                Object.entries(snapshot.val()).forEach((row)=>{
                    // tempbanks.add(row[1]);
                    console.log(row[1]);
                    tempbanks.push(row[1]);
                });
                this.setState({
                    hasdata:true,
                    banks: tempbanks
                });
                //
                console.log(this.state.banks);
            }
        });
    }

    render() {
        return (
            <div>
                <Table
                    // height={this.state.height}
                    fixedHeader={true}
                    fixedFooter={false}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn colSpan="4" tooltip="支持银行列表" style={{textAlign: 'center'}}>
                                支持银行列表
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip="序号">序号</TableHeaderColumn>
                            <TableHeaderColumn tooltip="银行名称">银行名称</TableHeaderColumn>
                            <TableHeaderColumn tooltip="logo地址">logo</TableHeaderColumn>
                            <TableHeaderColumn tooltip="记录操作">操作</TableHeaderColumn>
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
                                        <FlatButton label="查看"/>
                                        <br />
                                        <FlatButton label="修改" primary={true} />
                                        <br />
                                        <FlatButton label="删除" secondary={true} />
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

            </div>
        );
    }

    // render(){

        // return (
        //     <div className="animated fadeIn">
        //         <div className="row">
        //             <div className="col-lg-12">
        //                 <div className="card">
        //                     <div className="card-header">
        //                         <i className="fa fa-align-justify"></i> 银行列表
        //                     </div>
        //                     <div className="card-block">
        //                         <table className="table">
        //                             <thead>
        //                             <tr>
        //                                 <th>银行名</th>
        //                                 <th>logo</th>
        //                                 <th>logo url</th>
        //                                 <th>是否可用</th>
        //                             </tr>
        //                             </thead>
        //                             <tbody>
        //                             <tr>
        //                                 <td>Samppa Nori</td>
        //                                 <td>2012/01/01</td>
        //                                 <td>Member</td>
        //                                 <td>
        //                                     <span className="badge badge-success">Active</span>
        //                                 </td>
        //                             </tr>
        //                             <tr>
        //                                 <td>Estavan Lykos</td>
        //                                 <td>2012/02/01</td>
        //                                 <td>Staff</td>
        //                                 <td>
        //                                     <span className="badge badge-danger">Banned</span>
        //                                 </td>
        //                             </tr>
        //                             <tr>
        //                                 <td>Chetan Mohamed</td>
        //                                 <td>2012/02/01</td>
        //                                 <td>Admin</td>
        //                                 <td>
        //                                     <span className="badge badge-default">Inactive</span>
        //                                 </td>
        //                             </tr>
        //                             <tr>
        //                                 <td>Derick Maximinus</td>
        //                                 <td>2012/03/01</td>
        //                                 <td>Member</td>
        //                                 <td>
        //                                     <span className="badge badge-warning">Pending</span>
        //                                 </td>
        //                             </tr>
        //                             <tr>
        //                                 <td>Friderik Dávid</td>
        //                                 <td>2012/01/21</td>
        //                                 <td>Staff</td>
        //                                 <td>
        //                                     <span className="badge badge-success">Active</span>
        //                                 </td>
        //                             </tr>
        //                             </tbody>
        //                         </table>
        //                         <ul className="pagination">
        //                             <li className="page-item"><a className="page-link" href="#">Prev</a></li>
        //                             <li className="page-item active">
        //                                 <a className="page-link" href="#">1</a>
        //                             </li>
        //                             <li className="page-item"><a className="page-link" href="#">2</a></li>
        //                             <li className="page-item"><a className="page-link" href="#">3</a></li>
        //                             <li className="page-item"><a className="page-link" href="#">4</a></li>
        //                             <li className="page-item"><a className="page-link" href="#">Next</a></li>
        //                         </ul>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // )
    // }
}

export default Banks;