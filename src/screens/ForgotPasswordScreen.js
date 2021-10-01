import { Button, TextInput, Text } from 'react-native-rapi-ui';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, View, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../context/ContextProvider';
import LoadingModal from '../components/LoadingModal';
import { Ionicons } from '@expo/vector-icons';

export default ForgotPasswordScreen = ({ navigation }) => {
  const { authContext } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setIsLoading(true);
    fetch(
      `https://api.heybrokers.com/Account/SendActivationCode?email=${data.email}`,
      { method: 'POST' }
    )
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
        if (result.statusCode == 200) {
          navigation.navigate('EmailValidation');
        } else {
          Alert.alert('Hata FPS1');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert('Hata FPS2');
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <LoadingModal loading={isLoading} />
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={42} color="black" />
        </TouchableOpacity>
      </View>
      <Image
        style={{ width: 200, height: 200, alignSelf: 'center' }}
        source={require('../../assets/icon.png')}
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
          />
        )}
        name="email"
        defaultValue=""
      />
      {errors.email && <Text>This is required.</Text>}

      <View style={{ marginVertical: 5 }}></View>

      <Button
        style={{ marginTop: 10 }}
        text="Kod Gönder"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
