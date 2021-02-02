import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { withStyles } from '@ui-kitten/components';

const Tag = ({ eva, isExternal }) => {
  const tagContainerStyle = {
    width: 60,
    height: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: isExternal
      ? eva.theme['color-warning-500']
      : eva.theme['color-info-500'],
    backgroundColor: isExternal
      ? `${eva.theme['color-warning-500']}17`
      : `${eva.theme['color-info-500']}17`,
    borderRadius: 3,
    justifyContent: 'center',
  };
  const tagTextStyle = {
    fontWeight: 'bold',
    fontSize: 9,
    color: isExternal
      ? eva.theme['color-warning-500']
      : eva.theme['color-info-500'],
  };

  return (
    <View style={tagContainerStyle}>
      <Text style={tagTextStyle}>{isExternal ? 'External' : 'Own'}</Text>
    </View>
  );
};

Tag.propTypes = {
  eva: PropTypes.object.isRequired,
  isExternal: PropTypes.bool,
};

Tag.defaultProps = {
  isExternal: false,
};

export default withStyles(Tag);
