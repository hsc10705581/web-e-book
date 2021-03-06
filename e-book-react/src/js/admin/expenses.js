import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import $ from "jquery";
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button";

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: '240px',
    },

    searchRoot: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '80%',
    },

    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },

    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },

    table: {
        minWidth: 700,
    },

    tablePaper: {
        margin: 30
    },
});

var hide = {
    display: "none",
};

var show = {
    display: "inline",
};

class UserDetail extends Component{

    render() {
        return (
            <TableRow>
                <TableCell>{this.props.username}</TableCell>
                <TableCell>{this.props.time}</TableCell>
                <TableCell>{this.props.pay}</TableCell>
            </TableRow>
        )
    }

}

class Expenses extends Component{

    infoStyle = true; //true for 全部条目 false for 汇总

    state = {
        expensesList: [],
        expensesListSave: [],
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.state.expensesList !== nextProps.expensesList) {
            this.setState({
                expensesList: nextProps.expensesList,
                expensesListSave: nextProps.expensesList,
            })
        }
    }

    handleChange = () => {
        let beginDate = document.getElementById('beginDate').value;
        let endDate = document.getElementById('endDate').value;
        let newList;
        if(beginDate === "" && endDate === ""){
            newList = this.state.expensesListSave.filter( (user) => {
                return true;
            });
        }
        else if(beginDate === "" && endDate !== ""){
            newList = this.state.expensesListSave.filter( (user) => {
                return new Date(endDate) > new Date(user["time"]);
            });
        }
        else if(beginDate !== "" && endDate === ""){
            newList = this.state.expensesListSave.filter( (user) => {
                return new Date(beginDate) < new Date(user["time"]);
            });
        }
        else{
            newList = this.state.expensesListSave.filter( (user) => {
                return new Date(endDate) > new Date(user["time"]) && new Date(beginDate) < new Date(user["time"]);
            });
        }
        this.setState({
            expensesList: newList,
        })
    };

    changeList = () => {
        if(this.infoStyle === true){
            let userSet = new Set();
            let total = new Array();
            for(let i = 0; i < this.state.expensesList.length; i++){
                if(!userSet.has(this.state.expensesList[i]["username"])){
                    userSet.add(this.state.expensesList[i]["username"]);
                    total[this.state.expensesList[i]["username"]] = this.state.expensesList[i]["pay"];
                }
                else
                    total[this.state.expensesList[i]["username"]] += this.state.expensesList[i]["pay"];
            }
            let newList = [];
            for(let name of userSet){
                let js = {
                    username: name,
                    pay: total[name]
                };
                newList.push(js);
            }
            this.setState({
                expensesList: newList,
            });
        }
        else{
            this.handleChange();
        }
        this.infoStyle = !this.infoStyle;
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.searchRoot} elevation={1}>
                    <InputBase className={classes.input} id={'beginDate'} placeholder={"输入起始日期(格式:YYYY-MM-DD"} onChange={this.handleChange.bind(this)}/>
                    <InputBase className={classes.input} id={'endDate'} placeholder={"输入结束日期(格式:YYYY-MM-DD"} onChange={this.handleChange.bind(this)}/>
                    <IconButton className={classes.iconButton} aria-label="Search" onClick={() => this.handleChange()}>
                        <SearchIcon />
                    </IconButton>
                    <Button onClick={this.changeList}>切换显示方式</Button>
                </Paper>
                <Paper className={classes.tablePaper}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            用户列表
                        </Typography>
                    </Toolbar>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>用户名</TableCell>
                                <TableCell>消费时间</TableCell>
                                <TableCell>用户消费金额</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.expensesList.map(user => (
                                <UserDetail
                                    key={user["time"]}
                                    time={user["time"]}
                                    username={user["username"]}
                                    pay={user["pay"]}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

Expenses.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Expenses);