import { Button, TextInput, Text } from 'react-native-rapi-ui';
import React, { useContext, useState, useEffect } from 'react';
import { Alert, View, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../context/ContextProvider';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-rapi-ui';
import LoadingModal from '../components/LoadingModal';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const resolver = yupResolver(
  yup
    .object({
      name: yup.string().required(),
      surname: yup.string().required(),
      email: yup.string().email().required(),
      phone: yup.string().required(),
    })
    .required()
);

export default ProfileScreen = ({ navigation }) => {
  const { state, authContext } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver,
  });
  const onSubmit = (data) => {
    setIsLoading(true);
    fetch(`https://api.heybrokers.com/Account/Profile`, {
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
            'Başarılı',
            'Kullanıcı bilgilerin başarı ile değiştirildi',
            [{ onPress: () => navigation.goBack() }]
          );
        } else {
          Alert.alert('Hata PS1');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert('Hata PS2');
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.heybrokers.com/Account/Profile`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + state.userToken,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
        if (result.statusCode == 200) {
          setValue('name', result.data.name);
          setValue('surname', result.data.surname);
          setValue('email', result.data.email);
          setValue('phone', result.data.phone);
        } else {
          Alert.alert('Hata PS3');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        Alert.alert('Hata PS4');
      });
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <LoadingModal loading={isLoading} />
      {/* <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={42} color="black" />
        </TouchableOpacity>
      </View> */}
      <View style={{ alignItems: 'center', marginVertical: 30 }}>
        <Avatar
          source={{
            uri: 'https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg',
          }}
          size="xl"
          shape="round"
        />
      </View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Name"
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
            placeholder="Email"
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
            placeholder="Phone"
          />
        )}
        name="phone"
        defaultValue=""
      />
      <Text>{errors.phone?.message}</Text>

      <Button
        style={{ marginTop: 10 }}
        text="Düzenle"
        onPress={handleSubmit(onSubmit)}
      />
      <Button
        status="danger"
        style={{ marginTop: 10 }}
        text="Çıkış Yap"
        onPress={() => authContext.signOut()}
      />
    </View>
  );
};
