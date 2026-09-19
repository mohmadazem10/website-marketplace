import React, { useState } from 'react'

export default function Header({ cartCount, onCartClick, currentPage, onNavigate, t, lang, changeLanguage, user, onLogout }) {
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const languages = [
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'he', label: 'עברית', flag: '🇮🇱' }
  ]

  const currentLang = languages.find(l => l.code === lang) || languages[0]

  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo" onClick={() => { window.scrollTo(0, 0); onNavigate('home') }}>
          <span className="logo-icon">🚀</span>
          <h1>{t.siteName}</h1>
        </div>
        <nav className="nav">
          <button className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} onClick={() => onNavigate('home')}>{t.home}</button>
          <button className={`nav-link ${currentPage === 'categories' ? 'active' : ''}`} onClick={() => onNavigate('categories')}>{t.categories}</button>
          <button className={`nav-link ${currentPage === 'about' ? 'active' : ''}`} onClick={() => onNavigate('about')}>{t.about}</button>
          <button className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`} onClick={() => onNavigate('contact')}>{t.contact}</button>
          {user && <button className={`nav-link ai-nav-link ${currentPage === 'ai' ? 'active' : ''}`} onClick={() => onNavigate('ai')}>✦ {t.aiNav}</button>}
        </nav>
        <div className="header-actions">
          <div className="lang-switcher">
            <button className="lang-btn" onClick={() => setShowLangMenu(!showLangMenu)}>
              <span>{currentLang.flag}</span>
              <span className="lang-label">{currentLang.label}</span>
            </button>
            {showLangMenu && (
              <div className="lang-dropdown">
                {languages.map(l => (
                  <button
                    key={l.code}
                    className={`lang-option ${lang === l.code ? 'active' : ''}`}
                    onClick={() => { changeLanguage(l.code); setShowLangMenu(false) }}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {user ? (
            <div className="user-menu">
              <button className="user-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
                {user.avatarUrl ? <img className="user-avatar" src={user.avatarUrl} alt="" /> : <span className="user-avatar">👤</span>}
                <span className="user-name">{user.name}</span>
              </button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <button className="user-option" onClick={() => { setShowUserMenu(false); onNavigate('profile') }}>👤 {t.profile}</button>
                  <button className="user-option" onClick={() => { setShowUserMenu(false); onLogout() }}>🚪 {t.logout}</button>
                </div>
              )}
            </div>
          ) : (
            <button className="auth-btn" onClick={() => onNavigate('auth')}>👤 <span>{t.auth}</span></button>
          )}
          <button className="cart-btn" onClick={onCartClick}>
            🛒
            <span className="cart-badge">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  )
}