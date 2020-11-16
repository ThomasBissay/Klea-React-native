import { DrawerActions } from '@react-navigation/native';
import { Text, View, StyleSheet } from 'react-native';
import * as React from 'react';
import { connect } from 'react-redux';
import HeaderKlea from '../component/HeaderKlea';
import { decrementCount, incrementCount } from '../redux/actions/incrementer';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
});

function BudgetScreen(props: any) {
  return (
    <View style={styles.mainContainer}>
      <HeaderKlea
        title="Mon Budget"
        handleMenu={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
        leftIconName="menu"
        rightIconName="none"
        handleRightClick={() => ''}
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Budget Screen</Text>
      </View>
    </View>
  );
}

const mapStateProps = (state: any) => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch: any) => ({
  increment: (counter: number) => {
    dispatch(incrementCount(counter));
  },

  decrement: (counter: number) => {
    dispatch(decrementCount(counter));
  },
});

export default connect(
  mapStateProps,
  mapDispatchToProps,
)(BudgetScreen);
