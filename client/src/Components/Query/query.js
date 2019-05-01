import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '../Button/button';
import './query.css'

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
    width: 200,
  },
  input1: {
      height: 40,
      width: 60,
  }
});


class OutlinedTextFields extends React.Component {

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    if (this.props.canClear === true ) {
        return (
            <div className='query-module'>
                <Button label="View Graph of Quotes" onClick={this.props.onClick}/>
                <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-name"
                  label="Min USD"
                  className={classes.textField}
                  value={this.props.lowerBound}
                  onChange={this.props.onChange}
                  margin="normal"
                  variant="outlined"
                  name='lowerBound'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    classes: { input: classes.input1}
                  }}        />
        
                <TextField
                  id="outlined-name"
                  label="Max USD"
                  className={classes.textField}
                  value={this.props.upperBound}
                  onChange={this.props.onChange}
                  margin="normal"
                  variant="outlined"
                  name='upperBound'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    classes: { input: classes.input1}
                  }}        /> 
                <div className='query-button'>
                    <Button label='filter by quote price' onClick={this.props.onQuery}/>
                    <Button label="clear" onClick={this.props.onClear}/>
                </div>
              </form>
            </div> 
            );

    }
    else {
        return (
            <div className='query-module'>
                <Button label="View Graph of Quotes" onClick={this.props.onClick}/>
                <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-name"
                  label="Min USD"
                  className={classes.textField}
                  value={this.props.lowerBound}
                  onChange={this.props.onChange}
                  margin="normal"
                  variant="outlined"
                  name='lowerBound'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    classes: { input: classes.input1}
                  }}        />
        
                <TextField
                  id="outlined-name"
                  label="Max USD"
                  className={classes.textField}
                  value={this.props.upperBound}
                  onChange={this.props.onChange}
                  margin="normal"
                  variant="outlined"
                  name='upperBound'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    classes: { input: classes.input1}
                  }}        /> 
                <div className='query-button'>
                    <Button label='filter by quote price' onClick={this.props.onQuery}/>
                </div>
              </form>
            </div> 
            );
    }

  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);