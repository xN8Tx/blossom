import enLocale from '../../../public/locales/en/translation.json';
import ruLocale from '../../../public/locales/ru/translation.json';

const MockT = (key: string, lng: 'en' | 'ru') => {
  type UpperObjectKey = keyof typeof locale;
  type LastObjectKey = keyof (typeof locale)[UpperObjectKey];

  const locale = lng === 'en' ? enLocale : ruLocale;

  const upperObjectKey: UpperObjectKey = key
    .split('.')
    .shift()! as UpperObjectKey;

  const lastObjectKey: LastObjectKey = key.split('.').pop() as LastObjectKey;

  return locale[upperObjectKey][lastObjectKey];
};

const enMockT = (key: string) => MockT(key, 'en');
const ruMockT = (key: string) => MockT(key, 'ru');

export { enMockT, ruMockT };
