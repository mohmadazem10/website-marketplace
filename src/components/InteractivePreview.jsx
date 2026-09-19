import React, { useState } from 'react'
import { WebsitePreview } from '../data/websitePreviews'

const fontOptions = [
  { value: 'Georgia, serif', label: 'Classic' },
  { value: 'Trebuchet MS, sans-serif', label: 'Friendly' },
  { value: 'Arial, sans-serif', label: 'Clean' },
]

const imageOptions = [
  { value: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80', label: 'Store' },
  { value: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80', label: 'Learning' },
  { value: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80', label: 'Space' },
]

export default function InteractivePreview({ website, onClose, t }) {
  const template = website.templates[0]
  const [colors, setColors] = useState(template.colors)
  const [font, setFont] = useState(fontOptions[0].value)
  const [image, setImage] = useState(imageOptions[0].value)

  const updateColor = (index, value) => {
    setColors(current => current.map((color, colorIndex) => colorIndex === index ? value : color))
  }

  return (
    <div className="template-overlay" onClick={onClose}>
      <div className="interactive-panel" onClick={(event) => event.stopPropagation()}>
        <div className="template-header">
          <div className="template-header-info">
            <span className="template-header-emoji">{website.image}</span>
            <div>
              <h2>{t.livePreview}: {website.title}</h2>
              <p className="template-subtitle">{t.livePreviewDesc}</p>
            </div>
          </div>
          <button className="template-close" onClick={onClose} aria-label={t.cancel}>✕</button>
        </div>

        <div className="interactive-workspace">
          <div className="interactive-stage" style={{ fontFamily: font }}>
            <div className="interactive-hero-image" style={{ backgroundImage: `url(${image})` }}>
              <span>{website.title}</span>
            </div>
            <div className="interactive-svg-preview">
              <WebsitePreview style={template.previewStyle} colors={colors} />
            </div>
          </div>

          <aside className="preview-controls">
            <div className="preview-control-group">
              <strong>{t.previewColors}</strong>
              <div className="color-controls">
                {colors.map((color, index) => (
                  <label key={index} className="color-control">
                    <input type="color" value={color} onChange={(event) => updateColor(index, event.target.value)} />
                    <span>{color}</span>
                  </label>
                ))}
              </div>
            </div>
            <label className="preview-control-group">
              <strong>{t.previewFont}</strong>
              <select value={font} onChange={(event) => setFont(event.target.value)}>
                {fontOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>
            <div className="preview-control-group">
              <strong>{t.previewImage}</strong>
              <div className="image-options">
                {imageOptions.map(option => (
                  <button key={option.value} className={image === option.value ? 'selected' : ''} onClick={() => setImage(option.value)}>{option.label}</button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
