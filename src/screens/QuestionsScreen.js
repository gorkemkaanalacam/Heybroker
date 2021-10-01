import { Button, TextInput, Text } from 'react-native-rapi-ui';
import React, { useContext, useState } from 'react';
import { Alert, View, Image, TouchableOpacity, Keyboard } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../context/ContextProvider';
import LoadingModal from '../components/LoadingModal';
import { Ionicons } from '@expo/vector-icons';

export default QuestionsScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setIsLoading(true);
    fetch(`https://api.heybrokers.com/Question/Send`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: 'Bearer ' + state.userToken,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
        if (result.statusCode == 200) {
          Alert.alert(
            'Gönderildi.',
            'Sorunuz başarılı bir şekilde gönderilmiştir. En kısa sürede cevaplanıp bildirim kutunuza düşecektir.'
          );
        } else {
          Alert.alert('Hata QS1');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert('Hata QS2');
      });
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <LoadingModal loading={isLoading} />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            blurOnSubmit
            textAlignVertical="top"
            multiline
            numberOfLines={8}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Ne sormak istersin ?"
          />
        )}
        name="questionText"
        defaultValue=""
      />
      {errors.questionText && <Text>This is required.</Text>}

      <Button
        style={{ marginTop: 'auto' }}
        text="Sor"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
