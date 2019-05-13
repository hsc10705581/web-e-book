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
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import VoiceIcon from '@material-ui/icons/KeyboardVoice';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';

import $ from 'jquery';

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
        marginTop: '50px',
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

let hide = {
    display: "none",
};

let show = {
    display: "flex",
    alignItems: "center",
};

const choices = ['未完成的订单', '已完成的订单', '全部订单'];

class OrderDetail extends Component{

    payout = () => {
        this.props.payout(this.props.order[0]["id"])
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        {this.props.order[0]["finished"] ? "已完成的" : "未完成的"}订单号:{this.props.order[0]["id"]}
                    </Typography>
                </Toolbar>
                <Table className={classes.table}>
                    <TableHead>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="left">书名</TableCell>
                            <TableCell align="left">单价</TableCell>
                            <TableCell align="left">数量</TableCell>
                            <TableCell align="left">总价</TableCell>
                        </TableRow>
                        {this.props.order.slice(1).map((orderItem, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{orderItem["title"]}</TableCell>
                                <TableCell align="left">{orderItem["price"]}</TableCell>
                                <TableCell align="left">{orderItem["amount"]}</TableCell>
                                <TableCell align="left">{orderItem["totalPrice"]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Divider />
                <Button style={this.props.order[0]["finished"] ? hide : show} onClick={this.payout}>确认支付</Button>
                <Divider />
            </div>
        )
    }
}

OrderDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

class Order extends Component{

    state = {
        orderList: [],
        chosenOrderList: [],
        choice: "全部订单",
        listOpen: false,
    };

    componentWillReceiveProps(nextProps){
        if(this.state.orderList !== nextProps.orderList)
        {
            this.setState({
                orderList: nextProps.orderList,
                chosenOrderList: nextProps.orderList,
            })
        }
    }

    handleChange(){
        let beginDate = document.getElementById('beginDate').value;
        let endDate = document.getElementById('endDate').value;
        let newList;
        if(beginDate === "" && endDate === ""){
            newList = this.state.orderList.filter( (order) => {
                if(this.state.choice === '未完成的订单')
                    return !order[0]["finished"];
                else if(this.state.choice === '已完成的订单')
                    return order[0]["finished"];
                else if(this.state.choice === '全部订单')
                    return true;
                else
                    return false;
            });
        }
        else if(beginDate === "" && endDate !== ""){
            newList = this.state.orderList.filter( (order) => {
                if(this.state.choice === '未完成的订单')
                    return !order[0]["finished"] && new Date(endDate) > new Date(order[0]["date"]);
                else if(this.state.choice === '已完成的订单')
                    return order[0]["finished"] && new Date(endDate) > new Date(order[0]["date"]);
                else if(this.state.choice === '全部订单')
                    return new Date(endDate) > new Date(order[0]["date"]);
                else
                    return false;
            });
        }
        else if(beginDate !== "" && endDate === ""){
            newList = this.state.orderList.filter( (order) => {
                if(this.state.choice === '未完成的订单')
                    return !order[0]["finished"] && new Date(beginDate) < new Date(order[0]["date"]);
                else if(this.state.choice === '已完成的订单')
                    return order[0]["finished"] && new Date(beginDate) < new Date(order[0]["date"]);
                else if(this.state.choice === '全部订单')
                    return new Date(beginDate) < new Date(order[0]["date"]);
                else
                    return false;
            });
        }
        else{
            newList = this.state.orderList.filter( (order) => {
                if(this.state.choice === '未完成的订单')
                    return !order[0]["finished"] && new Date(endDate) > new Date(order[0]["date"]) && new Date(beginDate) < new Date(order[0]["date"]);
                else if(this.state.choice === '已完成的订单')
                    return order[0]["finished"] && new Date(endDate) > new Date(order[0]["date"]) && new Date(beginDate) < new Date(order[0]["date"]);
                else if(this.state.choice === '全部订单')
                    return new Date(endDate) > new Date(order[0]["date"]) && new Date(beginDate) < new Date(order[0]["date"]);
                else
                    return false;
            });
        }
        this.setState({
            chosenOrderList: newList,
        })
    }

    handleListChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.handleChange();
    };

    handleListOpen = () => {
        this.setState({ listOpen: true });
    };

    handleListClose = () =>{
        this.setState({ listOpen: false});
    };

    payout = (o_ID) => {
        $.ajax({
            type: "POST",
            async: false,
            url: "http://localhost:8080/finished/" + o_ID,
            data: {},
            success: function (data) {

            }
        });
        this.props.refreshOrders();
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.searchRoot} elevation={1}>
                    <form autoComplete="off">
                        <FormControl className={classes.formControl}>
                            <Select
                                open={this.state.listOpen}
                                onClose={this.handleListClose}
                                onOpen={this.handleListOpen}
                                value={this.state.choice}
                                onChange={this.handleListChange}
                                inputProps={{
                                    name: 'choice',
                                    id: 'orders-select',
                                }}
                            >
                                {choices.map(choice => (
                                    <MenuItem key={choice} value={choice}>
                                        {choice}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </form>
                    <InputBase className={classes.input} id={'beginDate'} placeholder={"输入起始日期(格式:YYYY-MM-DD"} onChange={this.handleChange.bind(this)}/>
                    <InputBase className={classes.input} id={'endDate'} placeholder={"输入结束日期(格式:YYYY-MM-DD"} onChange={this.handleChange.bind(this)}/>
                    <IconButton className={classes.iconButton} aria-label="Search" onClick={() => this.handleChange()}>
                        <SearchIcon />
                    </IconButton>
                    <Divider className={classes.divider} />
                    <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
                        <VoiceIcon />
                    </IconButton>
                </Paper>
                <Paper className={classes.tablePaper}>
                    {this.state.chosenOrderList.map(order => (
                        <OrderDetail
                            key={order[0]["id"]}
                            order={order}
                            payout={(o_ID) => this.payout(o_ID)}
                            classes={this.props.classes}
                        />
                    ))}
                </Paper>
            </div>
        )
    }
}

Order.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Order);