import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Login extends React.Component {

    handleClose = () => {
        this.props.onClose();
        this.props.login();
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">登录</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            请输入用户名和密码来登录这个网站。
                        </DialogContentText>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="用户名"
                            type="username"
                            helperText=""
                            fullWidth
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="password"
                            label="密码"
                            type="password"
                            autoComplete="current-password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            登录
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