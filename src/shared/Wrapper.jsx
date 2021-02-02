import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Layout, withStyles } from '@ui-kitten/components';

const Wrapper = ({ eva, style, children, ...rest }) => (
  <KeyboardAwareScrollView contentContainerStyle={eva.style.scrollView}>
    <Layout style={{ ...eva.style.wrapper, ...style }} {...rest}>
      {children}
    </Layout>
  </KeyboardAwareScrollView>
);

Wrapper.propTypes = {
  eva: PropTypes.object.isRequired,
  style: PropTypes.object,
  children: PropTypes.array.isRequired,
};

Wrapper.defaultProps = {
  style: {},
};

export default withStyles(Wrapper, () => ({
  scrollView: {
    height: '100%',
  },
  centeredScrollView: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
  },
}));
