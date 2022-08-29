import { useTranslation } from 'react-i18next'
import br from '../../assets/br.svg'
import us from '../../assets/us.svg'

const languageOptions = [
  {
    name: 'Português',
    value: 'ptBR',
    flag: br
  },
  {
    name: 'English',
    value: 'en',
    flag: us
  }
]

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  return (
    <div>
      <select className='languageToggle'>
        {languageOptions.map(lng => (
          <option key={lng.value} style={{ fontWeight: i18n.resolvedLanguage === lng.value ? 'bold' : 'normal' }} onClick={() => i18n.changeLanguage(lng.value)}>
            {lng.name}
          </option>
        ))}
      </select>
    </div>
  )
}