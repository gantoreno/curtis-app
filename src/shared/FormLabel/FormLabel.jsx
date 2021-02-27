import React from 'react';
import PropTypes from 'prop-types';
import { Text, withStyles } from '@ui-kitten/components';

const FormLabel = ({ eva, unit, title, required }) => (
  <Text style={eva.style.label}>
    {title}{' '}
    {unit && (
      <Text style={eva.style.label}>
        (
        <Text style={eva.style.required} status="primary">
          {unit}
        </Text>
        )
      </Text>
    )}{' '}
    {required && (
      <Text style={eva.style.required} status="primary">
        *
      </Text>
    )}
  </Text>
);

FormLabel.propTypes = {
  eva: PropTypes.object.isRequired,
  unit: PropTypes.string,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

FormLabel.defaultProps = {
  unit: '',
  required: false,
};

export default withStyles(FormLabel, () => ({
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  required: {
    fontSize: 18,
    fontWeight: 'bold',
  },
}));
