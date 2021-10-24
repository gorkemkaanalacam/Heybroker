import { Button, TextInput, Text } from 'react-native-rapi-ui';
import React, { useContext } from 'react';
import { Alert, View, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../context/ContextProvider';
import { Ionicons } from '@expo/vector-icons';

export default SmsValidationScreen = ({ navigation }) => {
  const { authContext } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    authContext.signIn(data);
  };

  return (
    <View style={{ padding: 20 }}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={42} color="gray" />
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
            placeholder="Code"
          />
        )}
        name="code"
        defaultValue=""
      />
      {errors.code && <Text>This is required.</Text>}

      <Button
        style={{ marginTop: 10 }}
        text="Giriş Yap"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
