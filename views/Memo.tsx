import { DrawerActions } from '@react-navigation/native';
import {Text, View, StyleSheet, Button} from "react-native";
import HeaderKlea from "../component/HeaderKlea";
import * as React from "react";
import {decrementCount, incrementCount} from "../redux/actions/incrementer";
import {connect} from "react-redux";

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

function MemoScreen(props: any) {
        return (
            <View style={styles.mainContainer}>
                <HeaderKlea title={"Mémo"} handleMenu={() => props.navigation.dispatch(DrawerActions.toggleDrawer())} rightIconName={"more-vert"} handleRightClick={() => console.log("test")}/>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>{props.counter.counter}</Text>
            <Button
                title="Increment"
                onPress={() => props.increment(props.counter.counter)}
            />
        </View>
            </View>
        );
}

const mapStateProps = (state: any) => {
    return {
        counter: state.counter,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        increment: (counter: number) => {
            dispatch(incrementCount(counter));
        },

        decrement: (counter: number) => {
            dispatch(decrementCount(counter));
        },
    };
};

export default connect(
    mapStateProps,
    mapDispatchToProps,
)(MemoScreen);