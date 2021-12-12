import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'react-native-rapi-ui';
import React from 'react';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { updateNotificationState } from '../api';

const AuthContext = React.createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'AUTH_LOADING':
          return {
            ...prevState,
            isLoading: true,
          };
        case 'AUTH_LOAD':
          return {
            ...prevState,
            isLoading: false,
          };
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'SET_NOTIFICATION_COUNT':
          return {
            ...prevState,
            notificationCount: action.count || null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      notificationCount: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        console.log(e);
        Alert.alert('Error CP1');
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userToken = await SecureStore.getItemAsync('userToken');
        const readAnswersString = await SecureStore.getItemAsync('ReadAnswers');
        if (!readAnswersString || !userToken) {
          return;
        }
        const readAnswersLength = await JSON.parse(readAnswersString).length;

        const response = await fetch(
          'https://api.heybrokers.com/Question/List',
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + userToken,
            },
          }
        );
        const result = await response.json();
        const questionAnswersLength = await result.data.filter(
          (x) => x.answer != null
        ).length;

        const notificationLength = questionAnswersLength - readAnswersLength;

        if (notificationLength)
          dispatch({
            type: 'SET_NOTIFICATION_COUNT',
            count: notificationLength,
          });
      } catch (e) {
        console.log(e);
        Alert.alert('Error CP2');
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: 'AUTH_LOADING' });
        const response = await fetch(
          `https://api.heybrokers.com/Account/Login?email=${data.email}&password=${data.password}`,
          {
            method: 'POST',
          }
        );
        const result = await response.json();
        const userToken = result.data;
        dispatch({ type: 'AUTH_LOAD' });
        if (userToken) {
          updateNotificationState(userToken);
          await SecureStore.setItemAsync('userToken', userToken);
          dispatch({ type: 'SIGN_IN', token: userToken });
        } else if (result.statusCode === 108) {
          Alert.alert(
            'Hata',
            'Lütfen kullanıcı adı ve şifrenizi doğrulunuğundan emin olunuz.'
          );
        } else {
          Alert.alert(
            'Hata',
            'Beklenmeyen bir hata oluştu lütfen daha sonra tekrar deneyiniz.'
          );
        }
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('userToken');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        dispatch({ type: 'AUTH_LOADING' });
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        };
        const response = await fetch(
          'https://api.heybrokers.com/Account/Register',
          requestOptions
        );
        const result = await response.json();

        const userToken = result.data;
        dispatch({ type: 'AUTH_LOAD' });
        if (userToken) {
          updateNotificationState(userToken);
          await SecureStore.setItemAsync('userToken', userToken);
          dispatch({ type: 'SIGN_IN', token: userToken });
        } else if (result.statusCode === 101) {
          Alert.alert(
            'Hata',
            'Bu mail adresi veya telefon bilgisine sahip bir kullanıcı var.'
          );
        } else {
          Alert.alert(
            'Hata',
            'Beklenmeyen bir hata oluştu lütfen daha sonra tekrar deneyiniz.'
          );
        }
      },
      setNotificationCount: async (count) => {
        dispatch({
          type: 'SET_NOTIFICATION_COUNT',
          count: count,
        });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ authContext, state }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;

export { AuthContext };
