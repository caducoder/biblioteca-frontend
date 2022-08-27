import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enJson from './translations/en.json'
import ptJson from './translations/ptBR.json'

i18n.use(initReactI18next).init({
  fallbackLng: 'ptBR', // linguagem padrão
  interpolation: {
    escapeValue: false
  },
  resources: {
    ptBR: ptJson,
    en: enJson
  }
})

export default i18n