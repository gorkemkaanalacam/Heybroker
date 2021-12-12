import OneSignal from 'react-native-onesignal';

export const updateNotificationState = async (userToken) => {
    const notificationState = await OneSignal.getDeviceState();
    fetch('https://api.heybrokers.com/Account/NotificationState?notificationState=' + JSON.stringify(notificationState), {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + userToken,
        },
    });
}