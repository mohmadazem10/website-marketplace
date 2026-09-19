import React, { createContext, useContext, useState, useEffect } from 'react'
import translations from './translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('site-language')
    return saved || 'ar'
  })

  useEffect(() => {
    localStorage.setItem('site-language', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('data-lang', lang)
  }, [lang])

  const t = translations[lang] || translations.ar

  const changeLanguage = (newLang) => {
    setLang(newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}