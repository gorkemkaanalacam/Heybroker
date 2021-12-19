import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { colors } from '../constants';

const NavigationHeader = (props) => {
    const { title } = props;

    return (
        <View style={{
            alignItems: 'center',
            padding: 15,
            backgroundColor: '#121212'
        }}>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: colors.neonblue
                }}
            >
                {title}
            </Text>
        </View>
    );
};

export default NavigationHeader;
