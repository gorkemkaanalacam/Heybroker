import { Button, TextInput, Text } from 'react-native-rapi-ui';
import React, { useContext } from 'react';
import { Alert, View, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../context/ContextProvider';
import { Ionicons } from '@expo/vector-icons';
import LoadingModal from '../components/LoadingModal';

export default ChangePasswordScreen = ({ navigation, route }) => {
  const { authContext } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const { code } = route.params;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setIsLoading(true);
    fetch(
      `https://api.heybrokers.com/Account/ChangeForgottenPassword?code=${code}&newPassword=${data.newPassword}`,
      {
        method: 'POST',
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
        if (result.statusCode == 200) {
          Alert.alert('', 'Şifre Başarılı Bir Şekilde Değiştirilmiştir', [
            { text: 'OK', onPress: () => navigation.pop(3) },
          ]);
        } else {
          Alert.alert('Hata CPS1');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        Alert.alert('Hata CPS2');
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <LoadingModal loading={isLoading} />
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
            placeholder="New Password"
          />
        )}
        name="newPassword"
        defaultValue=""
      />
      {errors.newPassword && <Text>This is required.</Text>}

      <Button
        style={{ marginTop: 10 }}
        text="Onayla"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
