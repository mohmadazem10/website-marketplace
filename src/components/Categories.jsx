import React from 'react'

function getCategoryIcon(category, t) {
  const icons = {}
  icons[t.ecommerce] = '🛒'
  icons[t.education] = '📚'
  icons[t.realestate] = '🏠'
  icons[t.blog] = '✍️'
  icons[t.services] = '💼'
  icons[t.restaurant] = '🍽️'
  icons[t.social] = '🌐'
  icons[t.analytics] = '📊'
  return icons[category] || '🌟'
}

export default function Categories({ categories, activeCategory, onCategoryChange, t, allKey }) {
  return (
    <section className="categories" id="categories">
      <div className="container">
        <h2 className="section-title">{t.browseCategories}</h2>
        <div className="categories-grid">
          <button className={`category-btn ${activeCategory === allKey ? 'active' : ''}`} onClick={() => onCategoryChange(allKey)}>
            <span className="category-icon">🌟</span><span>{t.all}</span>
          </button>
          {categories.map((cat) => (
            <button key={cat} className={`category-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => onCategoryChange(cat)}>
              <span className="category-icon">{getCategoryIcon(cat, t)}</span><span>{cat}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}