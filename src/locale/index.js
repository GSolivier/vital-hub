import { Platform, NativeModules } from 'react-native'
import { I18n } from 'i18n-js';
import en from './en-US';
import pt from './pt-BR';

const i18n = new I18n();

i18n.store(en);
i18n.store(pt);

const normalizeTranslate = {
  'en_US': 'en_US',
  'pt_BR': 'pt_BR',
  'en': 'en_US',
  'pt_US': 'pt_BR',
}

const getLanguageByDevice = () => {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier 
}

i18n.translations = {
  'en_US': en,
  'pt_BR': pt,
}


export const setLanguageToI18n = () => {
  const language = getLanguageByDevice()
  const translateNormalize = normalizeTranslate[language]
  const iHaveThisLanguage = i18n.translations.hasOwnProperty(translateNormalize)
  iHaveThisLanguage
    ? i18n.locale = translateNormalize
    : i18n.defaultLocale = 'en_US'
}

setLanguageToI18n()


export default function t(key) {
  return i18n.t(key)
}