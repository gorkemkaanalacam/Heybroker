
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import * as SecureStore from 'expo-secure-store';
import RNRestart from 'react-native-restart';

export const InitLocalization = async () => {
    // Set the key-value pairs for the different languages you want to support.
    i18n.translations = {
        en: { welcome: 'Hello', name: 'Charlie' },
        tr: { welcome: 'Merhaba', name: 'Çarli' },
        ja: { welcome: 'こんにちは' },
    };
    // Set the locale once at the beginning of your app.
    const locale = await SecureStore.getItemAsync("locale");

    if (locale) {
        i18n.locale = locale;
    }
    else {
        i18n.locale = Localization.locale;
    }
    // When a value is missing from a language it'll fallback to another language with the key present.
    i18n.fallbacks = true;
}

export const ChangeLocalizationLang = async (locale) => {
    await SecureStore.setItemAsync("locale", locale);

    RNRestart.Restart();
}