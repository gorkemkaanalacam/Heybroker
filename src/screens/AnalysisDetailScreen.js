import { Text } from 'react-native-rapi-ui';
import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList, Image, ScrollView } from 'react-native';
import { AuthContext } from '../context/ContextProvider';

export default AnalysisDetailScreen = ({ route }) => {
  const item = route.params.analysis;
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <Text
        size="xl"
        style={{
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        {item.title}
      </Text>
      {item.imageUrl && (
        <Image
          style={{ width: '100%', height: 150, marginTop: 20 }}
          source={{
            uri: item.imageUrl,
          }}
        />
      )}
      <ScrollView style={{ marginTop: 20 }}>
        <Text size="md">{item.description}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 'auto',
          }}
        >
          <Text size="sm" style={{ marginTop: 20 }}>
            {item.createdDate}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
