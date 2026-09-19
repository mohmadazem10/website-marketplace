import React from 'react'

export default function AboutPage({ t }) {
  return (
    <section className="page-section">
      <div className="container">
        <div className="page-header">
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutDesc}</p>
        </div>

        <div className="about-content">
          <div className="about-card main-about">
            <div className="about-icon">🚀</div>
            <h3>{t.aboutWhoTitle}</h3>
            <p>{t.aboutWhoText}</p>
          </div>

          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">⚡</div>
              <h3>{t.aboutFeature1Title}</h3>
              <p>{t.aboutFeature1Text}</p>
            </div>
            <div className="about-card">
              <div className="about-icon">🎨</div>
              <h3>{t.aboutFeature2Title}</h3>
              <p>{t.aboutFeature2Text}</p>
            </div>
            <div className="about-card">
              <div className="about-icon">🔧</div>
              <h3>{t.aboutFeature3Title}</h3>
              <p>{t.aboutFeature3Text}</p>
            </div>
            <div className="about-card">
              <div className="about-icon">🛡️</div>
              <h3>{t.aboutFeature4Title}</h3>
              <p>{t.aboutFeature4Text}</p>
            </div>
            <div className="about-card">
              <div className="about-icon">📱</div>
              <h3>{t.aboutFeature5Title}</h3>
              <p>{t.aboutFeature5Text}</p>
            </div>
            <div className="about-card">
              <div className="about-icon">🔒</div>
              <h3>{t.aboutFeature6Title}</h3>
              <p>{t.aboutFeature6Text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}