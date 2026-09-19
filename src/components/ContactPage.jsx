import React, { useState } from 'react'
import { apiRequest } from '../api'

export default function ContactPage({ t }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await apiRequest('/contact/messages', {
        method: 'POST',
        body: JSON.stringify(formData),
      })
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (requestError) {
      setError(requestError.status === 429 ? t.contactRateLimit : requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-header">
          <h2>{t.contactTitle}</h2>
          <p>{t.contactDesc}</p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-info-cards">
            <div className="contact-info-card">
              <div className="contact-info-icon">📧</div>
              <h4>{t.contactEmail}</h4>
              <p>info@soqalmuwaqea.com</p>
              <p>support@soqalmuwaqea.com</p>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">📱</div>
              <h4>{t.contactPhone}</h4>
              <p>+966 55 123 4567</p>
              <p>+966 55 987 6543</p>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">📍</div>
              <h4>{t.contactAddress}</h4>
              <p>{t.addressLine1}</p>
              <p>{t.addressLine2}</p>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">🕐</div>
              <h4>{t.contactHours}</h4>
              <p>{t.hoursWeek}</p>
              <p>{t.hoursWeekend}</p>
            </div>
          </div>

          <div className="contact-form-wrapper">
            {submitted ? (
              <div className="contact-success">
                <span className="success-icon">✅</span>
                <h3>{t.successTitle}</h3>
                <p>{t.successText}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t.fullName}</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t.fullName} required />
                  </div>
                  <div className="form-group">
                    <label>{t.email}</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t.email} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t.phone}</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t.phone} />
                  </div>
                  <div className="form-group">
                    <label>{t.subject}</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder={t.subject} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>{t.message}</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder={t.message} rows="5" required></textarea>
                </div>
                {error && <div className="auth-error">⚠️ {error}</div>}
                <button type="submit" className="btn-primary btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? t.sendingMessage : t.sendMessage}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}