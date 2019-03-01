import React from 'react';
import Icon from '@material-ui/core/Icon/Icon';
import Button from '@material-ui/core/Button/Button';
import PropTypes from 'prop-types';

const IconButton = React.memo((props) => {
  const {
    className,
    color,
    icon,
    size,
    onClick,
  } = props;

  return (
    <Button
      variant="contained"
      color={color}
      className={className}
      onClick={onClick}
    >
      <Icon fontSize={size}>{icon}</Icon>
    </Button>
  );
});

IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
  size: PropTypes.string,
};

IconButton.defaultProps = {
  className: undefined,
  icon: 'error',
  onClick: undefined,
  size: 'default',
  color: 'primary',
};

export default IconButton;
