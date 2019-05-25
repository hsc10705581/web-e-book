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

class UserDetail extends Component{

    render() {
        return (
            <TableRow>
                <TableCell>{this.props.username}</TableCell>
                <TableCell>{this.props.expense}</TableCell>
            </TableRow>
        )
    }

}

class Expenses extends Component{

    state = {
        expensesMap: {},
        expensesList: [],
    };

    componentWillReceiveProps(nextProps){
        if(this.state.expensesMap !== nextProps.expensesMap)
        {
            let newExpensesList = new Array();
            let index = 0;
            for(let key in nextProps.expensesMap){
                let info = {
                    "username": key,
                    "expense": nextProps.expensesMap[key],
                };
                newExpensesList[index] = info;
                index++;
            }
            this.setState({
                expensesMap: nextProps.expensesMap,
                expensesList: newExpensesList,
            });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
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
                                <TableCell>用户累计消费</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.expensesList.map(user => (
                                <UserDetail
                                    key={user["username"]}
                                    expense={user["expense"]}
                                    username={user["username"]}
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