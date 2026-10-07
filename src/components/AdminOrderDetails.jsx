import React, { useState } from 'react'
import { apiRequest } from '../api'
import { WebsitePreview } from '../data/websitePreviews'

function formatDate(value, lang) {
  return new Intl.DateTimeFormat(lang, { dateStyle: 'full', timeStyle: 'short' }).format(new Date(value))
}

export default function AdminOrderDetails({ order, token, t, lang, onBack }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [isAsking, setIsAsking] = useState(false)

  const askAboutOrder = async (event) => {
    event.preventDefault()
    if (!question.trim() || isAsking) return

    setError('')
    setAnswer('')
    setIsAsking(true)
    try {
      const result = await apiRequest(`/admin/orders/${encodeURIComponent(order._id)}/explain`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ question: question.trim() }),
      })
      setAnswer(result.reply)
    } catch (requestError) {
      setError(requestError.message || t.orderAiError)
    } finally {
      setIsAsking(false)
    }
  }

  return (
    <section className="page-section admin-order-page">
      <div className="container">
        <button className="admin-back-button" type="button" onClick={onBack}>
          ← {t.orderBackToOrders}
        </button>
        <div className="page-header">
          <h2>{t.orderDetailsTitle}</h2>
          <p>{t.adminOrderNumber}: {order._id}</p>
        </div>

        <section className="admin-panel order-summary-panel">
          <h3>{t.orderSummary}</h3>
          <div className="order-summary-grid">
            <div><span>{t.orderCustomer}</span><strong>{order.customerName}</strong></div>
            <div><span>{t.email}</span><strong>{order.customerEmail}</strong></div>
            <div><span>{t.adminStatus}</span><strong>{t[`orderStatus_${order.status}`] || order.status}</strong></div>
            <div><span>{t.orderPlacedAt}</span><strong>{formatDate(order.createdAt, lang)}</strong></div>
            <div><span>{t.paymentMethod}</span><strong>{t[order.paymentMethod] || order.paymentMethod}</strong></div>
            <div><span>{t.totalAmount}</span><strong>$ {order.totalAmount}</strong></div>
          </div>
        </section>

        {order.items.map((item, index) => {
          const template = item.selectedTemplate || {}
          const colors = Array.isArray(template.colors) ? template.colors : []

          return (
            <section className="admin-panel order-detail-site" key={`${item.productId}-${index}`}>
              <h3>{t.orderSiteDetails} {order.items.length > 1 ? `(${index + 1})` : ''}</h3>
              <div className="order-site-heading">
                <span className="order-site-icon">{item.image || '🌐'}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{t.adminProductCategory}: {item.category || t.orderDetailUnavailable}</p>
                </div>
                <strong>$ {item.price}</strong>
              </div>
              <div className="order-site-description">
                <h4>{t.orderSiteDescription}</h4>
                <p>{item.description || t.orderDetailUnavailable}</p>
              </div>

              <div className="order-site-features">
                <h4>{t.orderSiteFeatures}</h4>
                {item.features?.length ? (
                  <ul>{item.features.map((feature, featureIndex) => <li key={`${feature}-${featureIndex}`}>{feature}</li>)}</ul>
                ) : <p>{t.orderDetailUnavailable}</p>}
              </div>

              <div className="order-design-details">
                <h4>{t.orderDesignDetails}</h4>
                <p>{t.orderSelectedDesign}: {template.name || item.templateName || t.orderDefaultDesign}</p>
                <p>{t.orderLayout}: {template.layout || t.orderDetailUnavailable}</p>
                {colors.length ? (
                  <>
                    <div className="admin-order-preview">
                      <WebsitePreview style={template.previewStyle || 'ecommerce-classic'} colors={colors} />
                    </div>
                    <div className="admin-order-colors">
                      <strong>{t.orderColors}:</strong>
                      {colors.map((color, colorIndex) => (
                        <span key={`${color}-${colorIndex}`} title={color} style={{ backgroundColor: color }} />
                      ))}
                      <small>{colors.join(' · ')}</small>
                    </div>
                  </>
                ) : <p>{t.orderColorsUnavailable}</p>}
              </div>
            </section>
          )
        })}

        <section className="admin-panel order-ai-panel">
          <h3>{t.orderAiTitle}</h3>
          <p>{t.orderAiDescription}</p>
          <form className="order-ai-form" onSubmit={askAboutOrder}>
            <label htmlFor={`order-ai-${order._id}`}>{t.orderAiQuestionLabel}</label>
            <div className="order-ai-input-row">
              <input
                id={`order-ai-${order._id}`}
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder={t.orderAiPlaceholder}
                maxLength="1000"
                required
              />
              <button className="btn-primary" type="submit" disabled={isAsking || !question.trim()}>
                {isAsking ? t.orderAiThinking : t.orderAiAsk}
              </button>
            </div>
            {error && <p className="auth-error" role="alert">{error}</p>}
            {answer && <p className="order-ai-answer" aria-live="polite">{answer}</p>}
          </form>
        </section>
      </div>
    </section>
  )
}
