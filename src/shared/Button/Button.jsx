import React from 'react';
import PropTypes from 'prop-types';
import { Button as KittenButton, withStyles } from '@ui-kitten/components';

const Button = ({ children, ...rest }) => (
  <KittenButton size="large" {...rest}>
    {children}
  </KittenButton>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export default withStyles(Button);
