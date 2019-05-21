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

class UserDetail extends Component{

    updateBanned = () => {
        this.props.banUser(this.props.id);
    };

    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.username}</TableCell>
                <TableCell>{this.props.email}</TableCell>
                <TableCell>{this.props.role}</TableCell>
                <TableCell>{this.props.banned ? "是" : "否"}</TableCell>
                <TableCell>
                    <Button onClick={this.updateBanned}>{this.props.banned ? "解封" : "封禁"}</Button>
                </TableCell>
            </TableRow>
        )
    }

}

class User extends Component{

    state = {
        userList: [],
    };

    componentWillReceiveProps(nextProps){
        if(this.state.userList !== nextProps.userList)
        {
            this.setState({
                userList: nextProps.userList,
            })
        }
    }

    banUser = (u_ID) => {
        $.ajax({
            type: "POST",
            async: false,
            url: "/user/banned/" + u_ID,
            data: {},
            success: function (data) {

            }
        });
        this.props.refreshUsers();
    };

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
                                <TableCell>用户ID</TableCell>
                                <TableCell>用户名</TableCell>
                                <TableCell>用户email</TableCell>
                                <TableCell>用户权限</TableCell>
                                <TableCell>是否被ban</TableCell>
                                <TableCell>button</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.userList.map(user => (
                                <UserDetail
                                    key={user["u_ID"]}
                                    id={user["u_ID"]}
                                    username={user["username"]}
                                    role={user["role"]}
                                    email={user["email"]}
                                    banned={user["banned"]}
                                    banUser={(u_ID) => this.banUser(u_ID)}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

User.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);