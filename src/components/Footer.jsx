import React from 'react'

export default function Footer({ t }) {
  return (
    <footer className="footer" id="contact">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>🚀 {t.siteName}</h3>
          <p>{t.footerDesc}</p>
        </div>
        <div className="footer-section">
          <h3>{t.quickLinks}</h3>
          <ul>
            <li><a href="#home">{t.homeLink}</a></li>
            <li><a href="#categories">{t.categoriesLink}</a></li>
            <li><a href="#products">{t.sitesLink}</a></li>
            <li><a href="#contact">{t.contactLink}</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>{t.connect}</h3>
          <div className="social-links">
            <a href="#" className="social-link">📧</a>
            <a href="#" className="social-link">💬</a>
            <a href="#" className="social-link">🐦</a>
            <a href="#" className="social-link">📱</a>
          </div>
          <p className="contact-info">info@soqalmuwaqea.com</p>
          <p className="contact-info">+966 55 123 4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 {t.siteName}. {t.copyright}</p>
        </div>
      </div>
    </footer>
  )
}