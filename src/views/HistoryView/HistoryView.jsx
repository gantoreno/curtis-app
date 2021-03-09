import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { Text, Button, withStyles } from '@ui-kitten/components';
import { View, ScrollView, SafeAreaView } from 'react-native';

import { Tag, Wrapper } from '../../shared';

const HistoryCard = ({
  color,
  borderColor,
  result,
  onPress,
  isSuccess,
  ...rest
}) => {
  const historyCardStyle = {
    padding: 20,
    borderWidth: 1,
    borderColor,
    borderRadius: 5,
    marginBottom: 20,
  };
  const historyCardTitleStyle = {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  };
  const historyCardTagContainerStyle = {
    flexDirection: 'row',
  };
  const historyCardTagStyle = {
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  };
  const historyCardNameStyle = {
    fontWeight: 'bold',
  };
  const historyCardDiagnosisStyle = {
    color,
    fontWeight: 'bold',
  };
  const historyCardButtonStyle = {
    marginTop: 10,
  };

  return (
    <View style={historyCardStyle} {...rest}>
      <Text style={historyCardTitleStyle}>{result.date}</Text>
      <View style={historyCardTagContainerStyle}>
        <Text style={historyCardTagStyle} appearance="hint">
          Type:{' '}
        </Text>
        <Tag isExternal={result.isExternal} />
      </View>
      {result.name && result.isExternal && (
        <Text style={historyCardTagStyle} appearance="hint">
          Name: <Text style={historyCardNameStyle}>{result.name}</Text>
        </Text>
      )}
      <Text style={historyCardTagStyle} appearance="hint">
        Diagnosis:{' '}
        <Text style={historyCardDiagnosisStyle}>{result.diagnosis}</Text>
      </Text>
      <Button
        style={historyCardButtonStyle}
        testID="HistoryView.HistoryCard.ViewButton"
        status={isSuccess ? 'info' : 'primary'}
        onPress={onPress}
      >
        View
      </Button>
    </View>
  );
};

HistoryCard.propTypes = {
  color: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  result: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  isSuccess: PropTypes.bool.isRequired,
};

const HistoryView = ({ eva, navigation }) => {
  const { user } = useSelector((state) => state.session);

  return (
    <SafeAreaView testID="HistoryView">
      <StatusBar
        translucent={false}
        backgroundColor={eva.theme['color-basic-100']}
      />
      <ScrollView style={eva.style.scrollView}>
        <Wrapper>
          <Text style={eva.style.title} category="h1">
            Previous{'\n'}
            <Text status="primary" category="h1">
              analysis
            </Text>
          </Text>
          {user.history.length < 1 ? (
            <View style={eva.style.centeredHistory}>
              <Text style={eva.style.centeredHistoryText}>
                No diagnosis have been made yet!
              </Text>
            </View>
          ) : (
            user.history.reverse().map((result, i) => {
              const isSuccess = result.diagnosis === 'No signs of abnormality';
              const color = isSuccess
                ? eva.theme['color-info-500']
                : eva.theme['color-danger-500'];
              const borderColor = eva.theme['color-basic-600'];

              return (
                <HistoryCard
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  color={color}
                  result={result}
                  testID="HistoryView.HistoryCard"
                  onPress={() => navigation.navigate('Details', { result })}
                  isSuccess={isSuccess}
                  borderColor={borderColor}
                />
              );
            })
          )}
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

HistoryView.propTypes = {
  eva: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(HistoryView, (theme) => ({
  scrollView: {
    height: '100%',
  },
  title: {
    marginTop: 40,
    marginBottom: 40,
  },
  centeredHistory: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centeredHistoryText: {
    color: theme['color-basic-600'],
    fontSize: 14,
  },
}));
