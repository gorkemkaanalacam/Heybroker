import { Button, TextInput, Text, themeColor, CheckBox } from 'react-native-rapi-ui';
import React, { useContext } from 'react';
import { Alert, View, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../context/ContextProvider';
import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export default SignInScreen = ({ navigation }) => {
  const { authContext } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
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
        style={{ width: 100, height: 100, alignSelf: 'center', marginVertical: 30 }}
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
            placeholder="Username"
            leftContent={<Ionicons name="mail" color="gray" size={24} />}
          />
        )}
        name="email"
        defaultValue=""
      />
      <Text>{errors.email?.message}</Text>

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            placeholder="Password"
            leftContent={<Ionicons name="lock-closed" color="gray" size={24} />}
          />
        )}
        name="password"
        defaultValue=""
      />
      <Text>{errors.password?.message}</Text>
      <Button
        style={{ marginTop: 10 }}
        text="Giriş Yap"
        onPress={handleSubmit(onSubmit)}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{ color: themeColor.primary }}>Şifremi Unuttum</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
