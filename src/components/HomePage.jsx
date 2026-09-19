import React from 'react'
import Hero from './Hero'
import Categories from './Categories'
import ProductCard from './ProductCard'
import ComparisonModal from './ComparisonModal'

export default function HomePage({ categories, activeCategory, onCategoryChange, filteredWebsites, onAddToCart, onChooseTemplate, onToggleCompare, onPreview, comparedWebsites, onRemoveCompare, showComparison, onCloseComparison, t, allKey, token }) {
  return (
    <>
      <Hero t={t} />
      <Categories categories={categories} activeCategory={activeCategory} onCategoryChange={onCategoryChange} t={t} allKey={allKey} />
      <section className="products" id="products">
        <div className="container">
          <h2 className="section-title">
            {activeCategory === allKey ? t.allSites : `${t.sites} ${activeCategory}`}
          </h2>
          <div className="products-grid">
            {filteredWebsites.map(website => (
              <ProductCard
                key={website.id}
                website={website}
                onAddToCart={(w) => onAddToCart(w)}
                onChooseTemplate={onChooseTemplate}
                onToggleCompare={onToggleCompare}
                onPreview={onPreview}
                isCompared={comparedWebsites.some(item => item.id === website.id)}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>
      {comparedWebsites.length > 0 && (
        <div className="compare-dock">
          <div><strong>{t.compare}</strong><span>{comparedWebsites.length}/3 {t.compareSelected}</span></div>
          <div className="compare-dock-sites">
            {comparedWebsites.map(site => (
              <span key={site.id}>
                {site.image} {site.title}
                <button onClick={() => onRemoveCompare(site.id)} aria-label={`${t.removeFromCompare}: ${site.title}`} title={t.removeFromCompare}>×</button>
              </span>
            ))}
          </div>
          <button onClick={onCloseComparison}>{t.compareNow}</button>
        </div>
      )}
      {showComparison && <ComparisonModal websites={comparedWebsites} onClose={onCloseComparison} onRemove={onRemoveCompare} t={t} token={token} />}
    </>
  )
}