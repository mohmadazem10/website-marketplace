import React from 'react'
import { WebsitePreview } from '../data/websitePreviews'

export default function ProductCard({ website, onAddToCart, onChooseTemplate, onToggleCompare, onPreview, isCompared, t }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <span className="product-emoji">{website.image}</span>
        <span className="product-category">{website.category}</span>
      </div>
      <div className="product-info">
        <h3 className="product-title">{website.title}</h3>
        <p className="product-description">{website.description}</p>
        <div className="product-features">
          {website.features.map((feature, index) => (
            <span key={index} className="feature-tag">✓ {feature}</span>
          ))}
        </div>
        <div className="product-meta">
          <div className="product-rating"><span>⭐</span><span>{website.rating}</span></div>
          <div className="product-sales"><span>📦</span><span>{website.sales} {t.sales}</span></div>
        </div>
        <div className="product-templates-preview">
          <span className="templates-label">{t.templates}:</span>
          <div className="template-mini-dots">
            {website.templates.map((tpl) => (
              <div key={tpl.id} className="mini-preview" title={tpl.name}>
                <WebsitePreview style={tpl.previewStyle} colors={tpl.colors} />
              </div>
            ))}
          </div>
        </div>
        <div className="product-footer">
          <span className="product-price">${website.price}</span>
          <div className="product-actions">
            <button className={`compare-toggle ${isCompared ? 'selected' : ''}`} onClick={() => onToggleCompare(website)} aria-pressed={isCompared}>
              {isCompared ? '✓' : '+'} {t.compare}
            </button>
            <button className="preview-button" onClick={() => onPreview(website)}>{t.livePreview}</button>
            <button className="btn-template" onClick={() => onChooseTemplate(website)}>{t.chooseTemplate}</button>
            <button className="btn-add" onClick={() => onAddToCart(website)}>🛒</button>
          </div>
        </div>
      </div>
    </div>
  )
}