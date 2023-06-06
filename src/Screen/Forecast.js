import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Forecast() {

    const CALCULATING_STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 45 : StatusBar.currentHeight;

    return (
        <View style={[style.contentWrapper, {paddingTop: CALCULATING_STATUSBAR_HEIGHT}]}>
            <View style={style.wrapper}>
                <View style={style.mainBlockContainer}>
                    <Text style={style.mainTitle}>10 Days Forecast</Text>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    // Main content containers
    contentWrapper: {
        flex: 1,
        backgroundColor: '#191D1E',
        alignItems: 'center'
    }, 
    wrapper: {
        width: '100%',
        height: '91.015625%',
        paddingHorizontal: '3.73%',
        paddingVertical: 12,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

    }, 

    mainBlockContainer: {
        width: '100%',
        height: '100%',
        paddingHorizontal: '6.8965%',
        paddingVertical: 20,
        backgroundColor: '#212325',
        borderRadius: 40,
    },
    mainTitle: {
        fontFamily: 'pop-sem',
        fontSize: 18,
        color: '#FFFFFF',
        letterSpacing: 0.5
    }
})