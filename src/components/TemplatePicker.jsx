import React, { useState } from 'react'
import { WebsitePreview } from '../data/websitePreviews'

export default function TemplatePicker({ website, onSelect, onClose, t }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  return (
    <div className="template-overlay" onClick={onClose}>
      <div className="template-panel" onClick={(e) => e.stopPropagation()}>
        <div className="template-header">
          <div className="template-header-info">
            <span className="template-header-emoji">{website.image}</span>
            <div>
              <h2>{t.chooseDesign} {website.title}</h2>
              <p className="template-subtitle">{t.chooseDesignSub}</p>
            </div>
          </div>
          <button className="template-close" onClick={onClose}>✕</button>
        </div>
        <div className="template-grid">
          {website.templates.map((template) => (
            <div key={template.id} className={`template-card ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
              onClick={() => setSelectedTemplate(template)}>
              <div className="template-preview">
                <WebsitePreview style={template.previewStyle} colors={template.colors} />
              </div>
              <div className="template-details">
                <h4>{template.name}</h4>
                <span className="template-layout">{template.layout}</span>
              </div>
              {selectedTemplate?.id === template.id && <div className="template-check">✓</div>}
            </div>
          ))}
        </div>
        <div className="template-footer">
          <button className="btn-cancel" onClick={onClose}>{t.cancel}</button>
          <button className={`btn-confirm ${!selectedTemplate ? 'disabled' : ''}`}
            disabled={!selectedTemplate}
            onClick={() => selectedTemplate && onSelect(selectedTemplate)}>
            {selectedTemplate ? `${t.confirm} ${selectedTemplate.name}` : t.selectDesign}
          </button>
        </div>
      </div>
    </div>
  )
}