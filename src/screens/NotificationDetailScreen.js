import { Text } from 'react-native-rapi-ui';
import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList, Image, ScrollView, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../context/ContextProvider';

export default NotificationDetailScreen = ({ route }) => {
  const item = route.params.notification;
  const { state, authContext } = useContext(AuthContext);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        let readAnswers = [];
        const readAnswersString = await SecureStore.getItemAsync('ReadAnswers');
        if (readAnswersString) {
          readAnswers = await JSON.parse(readAnswersString);
        }
        if (!readAnswers.includes(item.answer.id)) {
          console.log(readAnswersString);
          authContext.updateNotificationCount();
          readAnswers.push(item.answer.id);
          await SecureStore.setItemAsync(
            'ReadAnswers',
            JSON.stringify(readAnswers)
          );
        }
      } catch (e) {
        console.log(e);
        Alert.alert('Error NDS1');
      }
    };

    if (item) bootstrapAsync();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <Text
        size="h3"
        style={{
          fontWeight: '700',
        }}
      >
        Soru:
      </Text>

      <Text
        size="xl"
        style={{
          textAlign: 'center',
        }}
      >
        {item.question.questionText}
      </Text>
      <Text
        size="h3"
        style={{
          fontWeight: '700',
          marginTop: 40,
        }}
      >
        Cevap:
      </Text>
      <Text
        size="xl"
        style={{
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        {item.answer.title}
      </Text>
      {item.answer.imageUrl && (
        <Image
          style={{ width: '100%', height: 150, marginTop: 20 }}
          source={{
            uri: item.answer.imageUrl,
          }}
        />
      )}
      <ScrollView style={{ marginTop: 20 }}>
        <Text size="md">{item.answer.answerText}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 'auto',
          }}
        >
          <Text size="sm" style={{ marginTop: 20 }}>
            {item.answer.createdDate}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
