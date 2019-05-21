import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

export default class Register extends React.Component {

    state = {
        pwdError: null,
        pwdErrorHelper: "",
    };

    handleRegister = () => {
        this.props.onClose();
        if(this.state.pwdError === null)
            this.props.register();
        else
            alert("请输入一致的密码");
    };

    judgePassword = () => {
        var pwd1 = document.getElementById("registerPassword1").value;
        var pwd2 = document.getElementById("registerPassword2").value;
        if(pwd1 === pwd2){
            this.setState({
                pwdError: null,
                pwdErrorHelper: "",
            })
        }
        else{
            this.setState({
                pwdError: true,
                pwdErrorHelper: "请输入一致的密码",
            })
        }
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">注册</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            请输入用户名，邮箱，密码来注册账户。
                        </DialogContentText>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="registerName"
                            label="用户名"
                            type="username"
                            helperText=""
                            fullWidth
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="registerEmail"
                            label="邮箱"
                            type="username"
                            helperText=""
                            fullWidth
                        />
                        <FormControl required fullWidth id="pwd1" error={this.state.pwdError}>
                            <InputLabel htmlFor="component-error">密码</InputLabel>
                            <Input
                                id="registerPassword1"
                                onChange={this.judgePassword}
                                type="password"
                            />
                            <FormHelperText id="password-error-text1">{this.state.pwdErrorHelper}</FormHelperText>
                        </FormControl>
                        <FormControl required fullWidth id="pwd2" error={this.state.pwdError}>
                            <InputLabel htmlFor="component-error">请再次输入密码</InputLabel>
                            <Input
                                id="registerPassword2"
                                onChange={this.judgePassword}
                                type="password"
                            />
                            <FormHelperText id="password-error-text2">{this.state.pwdErrorHelper}</FormHelperText>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRegister} color="primary">
                            注册
                        </Button>
                        <Button onClick={this.props.onClose} color="secondary">
                            取消
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}