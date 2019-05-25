import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 50,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
});

class Product extends React.Component{

    state = {
        amount: this.props.amount,
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.amount !== nextProps.amount)
        {
            this.setState({
                amount: nextProps.amount,
            })
        }
    }

    bookAdd = () => {
        //let num = this.state.amount + 1;
        //this.setState({amount: num,});
        this.props.bookAddRemove(1, this.props.b_ID, null);
    };

    bookRemove = () => {
        //let num = this.state.amount - 1;
        //this.setState({amount: num,});
        this.props.bookAddRemove(-1, this.props.b_ID, null);
    };

    render() {
        //const { classes, theme } = this.props;

        return (
            <TableRow>
                <TableCell component="th" scope="row">
                    {this.props.title}
                </TableCell>
                <TableCell align="right">{this.props.price}</TableCell>
                <TableCell align="right">{this.props.amount}</TableCell>
                <TableCell align="right">{this.props.b_ID}</TableCell>
                <TableCell>
                    <IconButton aria-label="Add" onClick={this.bookAdd}>
                        <Add/>
                    </IconButton>
                </TableCell>
                <TableCell>
                    <IconButton aria-label="Remove" onClick={this.bookRemove}>
                        <Remove/>
                    </IconButton>
                </TableCell>
                <TableCell/>
            </TableRow>
        );
    }
}

Product.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Product);