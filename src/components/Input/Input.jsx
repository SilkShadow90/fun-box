import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    display: 'flex',
    minHeight: '3rem',
  },
});

const Input = React.memo((props) => {
  const {
    classes,
    label,
    value,
    onChange,
    placeholder,
  } = props;

  return (
    <TextField
      label={label}
      value={value}
      margin="dense"
      inputProps={{
        ...props,
        onChange,
        placeholder,
      }}
      className={classNames(classes.textField)}
    />
  );
});

Input.propTypes = {
  classes: PropTypes.shape({
    textField: PropTypes.string.isRequired,
  }).isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

Input.defaultProps = {
  value: '',
  placeholder: '',
  onChange: undefined,
};

export default withStyles(styles)(Input);
