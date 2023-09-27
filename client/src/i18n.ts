import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-http-backend';

const options = {
  order: ['querystring', 'navigator'],
  lookupQuerystring: 'lng',
};

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    detection: options,
    supportedLngs: ['en', 'ru'],
  });
