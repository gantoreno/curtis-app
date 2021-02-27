import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, withStyles } from '@ui-kitten/components';

const DataEntry = ({ eva, label, value, unit, halfWidth, ...rest }) => (
  <View style={halfWidth ? eva.style.entryHalf : eva.style.entry} {...rest}>
    <Text appearance="hint" style={eva.style.label}>
      {label}
    </Text>
    {typeof value === 'function' && React.isValidElement(value()) ? (
      value()
    ) : (
      <Text style={eva.style.value}>
        {value} {unit && <Text style={eva.style.unit}>{unit}</Text>}
      </Text>
    )}
  </View>
);

DataEntry.propTypes = {
  eva: PropTypes.object.isRequired,
  unit: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  halfWidth: PropTypes.bool,
};

DataEntry.defaultProps = {
  unit: '',
  value: '',
  halfWidth: false,
};

export default withStyles(DataEntry, (theme) => ({
  entry: {
    width: '100%',
  },
  entryHalf: {
    width: '50%',
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  unit: {
    color: theme['color-primary-500'],
    fontSize: 18,
    fontWeight: 'bold',
  },
}));
