import { Button, TextInput, Text } from 'react-native-rapi-ui';
import React, { useContext } from 'react';
import { Alert, View, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../context/ContextProvider';
import { Ionicons } from '@expo/vector-icons';
import LoadingModal from '../components/LoadingModal';

export default EmailValidationScreen = ({ navigation }) => {
  const { authContext } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setIsLoading(true);
    fetch(`https://api.heybrokers.com/Account/Activate?code=${data.code}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
        if (result.statusCode == 200) {
          navigation.navigate('ChangePassword', { code: result.data });
        } else {
          Alert.alert('Hata EVS1');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert('Hata EVS2');
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
            placeholder="Code"
          />
        )}
        name="code"
        defaultValue=""
      />
      {errors.code && <Text>This is required.</Text>}

      <Button
        style={{ marginTop: 10 }}
        text="Doğrula"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
