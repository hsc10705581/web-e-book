import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

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
        let num = this.state.amount + 1;
        //this.setState({amount: num,});
        this.props.bookAddRemove(1, this.props.b_ID);
    };

    bookRemove = () => {
        let num = this.state.amount - 1;
        //this.setState({amount: num,});
        this.props.bookAddRemove(-1, this.props.b_ID);
    };

    render() {
        const { classes, theme } = this.props;

        return (
            <Card className={classes.card}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h7" variant="h7">
                            {this.props.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            价格: {this.props.price} * {this.state.amount}
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <IconButton aria-label="Remove" onClick={this.bookRemove}>
                            <Remove/>
                        </IconButton>
                        <IconButton aria-label="Add" onClick={this.bookAdd}>
                            <Add/>
                        </IconButton>
                    </div>
                </div>
                <CardMedia
                    className={classes.cover}
                    image="/static/images/cards/live-from-space.jpg"
                    title="Live from space album cover"
                />
            </Card>
        );
    }
}

Product.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Product);