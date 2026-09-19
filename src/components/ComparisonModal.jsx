import React, { useState } from 'react'
import { apiRequest } from '../api'
import { WebsitePreview } from '../data/websitePreviews'

export default function ComparisonModal({ websites, onClose, onRemove, t, token }) {
  const [need, setNeed] = useState('')
  const [advice, setAdvice] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const askAi = async (event) => {
    event.preventDefault()
    if (!need.trim() || isLoading) return
    setIsLoading(true)
    const context = websites.map(site => `${site.title}: ${site.price}, ${site.category}, ${site.features.join(', ')}`).join(' | ')
    try {
      const data = await apiRequest('/ai/chat', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          message: `${t.compareAiPrompt}\nاحتياجي: ${need}\nالمواقع: ${context}`,
          history: [],
        }),
      })
      setAdvice(data.reply)
    } catch {
      setAdvice(t.compareAiFallback)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="template-overlay" onClick={onClose}>
      <div className="comparison-panel" onClick={(event) => event.stopPropagation()}>
        <div className="comparison-heading">
          <div>
            <span className="profile-eyebrow">{t.compareEyebrow}</span>
            <h2>{t.compareTitle}</h2>
            <p>{t.compareDesc}</p>
          </div>
          <button className="template-close" onClick={onClose} aria-label={t.cancel}>✕</button>
        </div>
        <div className="comparison-table-wrap">
          <div className="comparison-table" style={{ '--compare-columns': websites.length }}>
            <div className="comparison-labels">
              <strong>{t.compareWebsite}</strong>
              <span>{t.price}</span>
              <span>{t.compareType}</span>
              <span>{t.compareStyle}</span>
              <span>{t.compareColors}</span>
              <span>{t.features}</span>
            </div>
            {websites.map(website => (
              <div className="comparison-column" key={website.id}>
                <button
                  className="comparison-remove"
                  onClick={() => onRemove(website.id)}
                  title={t.removeFromCompare}
                  aria-label={`${t.removeFromCompare}: ${website.title}`}
                >
                  × <span>{t.removeFromCompare}</span>
                </button>
                <div className="comparison-site-title"><span>{website.image}</span><strong>{website.title}</strong></div>
                <strong className="comparison-price">${website.price}</strong>
                <span>{website.category}</span>
                <span>{website.templates[0].layout}</span>
                <div className="comparison-swatches">{website.templates[0].colors.map(color => <i key={color} style={{ backgroundColor: color }} title={color} />)}</div>
                <div className="comparison-features">{website.features.map(feature => <span key={feature}>✓ {feature}</span>)}</div>
                <div className="comparison-thumb"><WebsitePreview style={website.templates[0].previewStyle} colors={website.templates[0].colors} /></div>
              </div>
            ))}
          </div>
        </div>
        <form className="compare-ai-box" onSubmit={askAi}>
          <div><span className="ai-message-mark">✦</span><strong>{t.compareAiTitle}</strong><p>{t.compareAiDesc}</p></div>
          <div className="compare-ai-form"><input value={need} onChange={(event) => setNeed(event.target.value)} placeholder={t.compareAiPlaceholder} /><button disabled={!need.trim() || isLoading}>{isLoading ? '...' : t.compareAiButton}</button></div>
          {advice && <div className="compare-ai-answer">{advice}</div>}
        </form>
      </div>
    </div>
  )
}
