import { Button, TextInput, Text, themeColor } from 'react-native-rapi-ui';
import React, { useContext, useEffect } from 'react';
import { Alert, View, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../context/ContextProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { Ionicons } from '@expo/vector-icons';
import * as yup from 'yup';

const schema = yup
  .object({
    name: yup.string().required(),
    surname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    phone: yup.string().required(),
  })
  .required();

export default SignUpScreen = ({ navigation }) => {
  const { authContext } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    authContext.signUp(data);
  };

  return (
    <View style={{ padding: 20 }}>
      <Image
        style={{ width: 150, height: 150, alignSelf: 'center' }}
        source={require('../../assets/icon.png')}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Name"
            leftContent={<Ionicons name="person" color="gray" size={24} />}
          />
        )}
        name="name"
        defaultValue=""
      />
      <Text>{errors.name?.message}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Surname"
            leftContent={
              <Ionicons name="person-circle" color="gray" size={24} />
            }
          />
        )}
        name="surname"
        defaultValue=""
      />
      <Text>{errors.surname?.message}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            placeholder="Email"
            leftContent={<Ionicons name="mail" color="gray" size={24} />}
          />
        )}
        name="email"
        defaultValue=""
      />
      <Text>{errors.email?.message}</Text>
      <Controller
        control={control}
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
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="number-pad"
            placeholder="Phone"
            leftContent={<Ionicons name="call" color="gray" size={24} />}
          />
        )}
        name="phone"
        defaultValue=""
      />
      <Text>{errors.phone?.message}</Text>
      <Button
        style={{ marginTop: 10 }}
        text="Kayıt Ol"
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
        <Text>Zaten hesabın varsa ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={{ color: themeColor.primary }}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
