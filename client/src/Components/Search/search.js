import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 600,
  },
});


class FilledTextFields extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
            style={{height:'auto !important'}}   
            id="standard-search"
            label="Enter crytocurrency name"
            type="search"
            className={classes.textField}
            margin="normal"
            fullWidth={true}
            onChange={this.props.onChange}
            name={this.props.name}
            value={this.props.value}
            onSubmit={this.props.onClick}
        />
      </form>
    );
  }
}

FilledTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilledTextFields);