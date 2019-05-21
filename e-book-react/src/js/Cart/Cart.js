import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Product from "./product";
import $ from "jquery";
import {Button} from "@material-ui/core";

const styles = theme => ({
    root: {
        width: '75%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        marginLeft: '240px',
    },
    table: {
        minWidth: 700,
    },
});

class Cart extends React.Component{

    state = {
        cartProducts: [],
        totalPrice: 0,
        username: null,
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.cartProducts !== nextProps.cartProducts)
        {
            let totalPrice = 0;
            nextProps.cartProducts.map((p) => {
                console.log(p);
                totalPrice += p["amount"] * p["price"];
            });
            this.setState({
                cartProducts: nextProps.cartProducts,
                totalPrice: totalPrice,
            })
        }
        if (this.state.username !== nextProps.username)
        {
            this.setState({
                username: nextProps.username,
            })
        }
    }

    bookAddRemove = (amount, bookID, stock) => {
        let saveDataAry = {
            username: this.state.username,
            b_ID: bookID,
            amount: amount
        };
        if(this.state.user === null)
            alert("要登录才能把书本加入购物车哦");
        else if(stock === 0)
            alert("这本书的库存为0哦");
        else{
            $.ajax({
                type: "POST",
                async: false,
                url: "/cart/add",
                data: JSON.stringify(saveDataAry),
                headers: {'Content-Type': 'application/json'},
                success: function (data){
                    if(data["success"] === false)
                        alert(data["alert"]);
                    else
                        this.props.getCartProduct();
                }.bind(this)
            });
        }
    };
    checkout = () => {
        this.props.checkout();
        this.props.getCartProduct();
    };

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>书名</TableCell>
                            <TableCell align="right">价格</TableCell>
                            <TableCell align="right">数量</TableCell>
                            <TableCell align="right">书名ID</TableCell>
                            <TableCell align="right">加</TableCell>
                            <TableCell align="right">减</TableCell>
                            <TableCell align="right">总价</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.cartProducts.map(product => (
                            <Product
                                key={product["b_ID"]}
                                title={product["title"]}
                                amount={product["amount"]}
                                price={product["price"]}
                                b_ID={product["b_ID"]}
                                bookAddRemove={(amount, bookID, stock) => this.bookAddRemove(amount, bookID, stock)}
                            />
                        ))}
                        <TableRow>
                            <TableCell/>
                            <TableCell/>
                            <TableCell/>
                            <TableCell/>
                            <TableCell/>
                            <TableCell/>
                            <TableCell align="right">{this.state.totalPrice}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Button onClick={this.checkout}>下单</Button>
            </Paper>
        );
    }
}

Cart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cart);