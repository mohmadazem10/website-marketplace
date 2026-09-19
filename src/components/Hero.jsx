import React from 'react'

export default function Hero({ t }) {
  return (
    <section className="hero" id="home">
      <div className="container hero-content">
        <div className="hero-text">
          <h2>{t.heroTitle}</h2>
          <p>{t.heroDesc}</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">8</span>
              <span className="stat-label">{t.heroStat1}</span>
            </div>
            <div className="stat">
              <span className="stat-number">32</span>
              <span className="stat-label">{t.heroStat2}</span>
            </div>
            <div className="stat">
              <span className="stat-number">4.6</span>
              <span className="stat-label">{t.heroStat3}</span>
            </div>
          </div>
          <button className="btn-primary" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
            {t.heroCta}
          </button>
        </div>
        <div className="hero-image">
          <div className="floating-icons">
            <span>🛒</span><span>📚</span><span>🏠</span><span>📊</span>
          </div>
        </div>
      </div>
    </section>
  )
}