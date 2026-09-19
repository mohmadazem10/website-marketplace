import React, { useState } from 'react'
import { apiRequest } from '../api'

export default function AIPage({ t, token }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')

  const suggestions = [t.aiSuggestion1, t.aiSuggestion2, t.aiSuggestion3]

  const sendMessage = async (event, suggestedMessage = '') => {
    event?.preventDefault()
    const text = (suggestedMessage || input).trim()
    if (!text || isSending) return

    const nextMessages = [...messages, { role: 'user', text }]
    setMessages(nextMessages)
    setInput('')
    setError('')
    setIsSending(true)

    try {
      const data = await apiRequest('/ai/chat', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ message: text, history: messages.slice(-10) }),
      })
      setError('')
      setMessages([...nextMessages, { role: 'model', text: data.reply }])
    } catch (requestError) {
      setError(requestError.message || t.aiUnavailable)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className="page-section ai-page">
      <div className="container ai-container">
        <div className="ai-hero">
          <div className="ai-orb"><span>✦</span></div>
          <div>
            <span className="profile-eyebrow">{t.aiEyebrow}</span>
            <h2>{t.aiTitle}</h2>
            <p>{t.aiDesc}</p>
          </div>
          <span className="ai-live"><i /> {t.aiOnline}</span>
        </div>

        <div className="ai-workspace">
          <aside className="ai-sidebar">
            <div className="ai-sidebar-heading">
              <span>{t.aiQuickStart}</span>
              <small>{t.aiQuickStartDesc}</small>
            </div>
            <div className="ai-suggestions">
              {suggestions.map((suggestion) => (
                <button key={suggestion} onClick={() => sendMessage(null, suggestion)} disabled={isSending}>
                  <span>✦</span>{suggestion}
                </button>
              ))}
            </div>
            <div className="ai-note">
              <span>⌘</span>
              <p>{t.aiNote}</p>
            </div>
          </aside>

          <div className="ai-chat-card">
            <div className="ai-chat-header">
              <div className="ai-chat-agent"><span>✦</span><div><strong>{t.aiAssistantName}</strong><small>{t.aiAssistantStatus}</small></div></div>
              <button className="ai-clear" onClick={() => setMessages([])} disabled={!messages.length}>{t.aiClear}</button>
            </div>

            <div className="ai-messages" aria-live="polite">
              {!messages.length && (
                <div className="ai-empty-state">
                  <div className="ai-empty-icon">✦</div>
                  <h3>{t.aiWelcome}</h3>
                  <p>{t.aiWelcomeDesc}</p>
                </div>
              )}
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`ai-message ${message.role}`}>
                  {message.role === 'model' && <span className="ai-message-mark">✦</span>}
                  <div>{message.text}</div>
                </div>
              ))}
              {isSending && <div className="ai-message model"><span className="ai-message-mark">✦</span><div className="ai-thinking"><i /><i /><i /></div></div>}
            </div>

            <form className="ai-composer" onSubmit={sendMessage}>
              <input value={input} onChange={(event) => setInput(event.target.value)} placeholder={t.aiPlaceholder} maxLength={4000} disabled={isSending} />
              <button type="submit" disabled={!input.trim() || isSending} aria-label={t.aiSend}>↑</button>
            </form>
            {error && <div className="ai-error">⚠️ {error}</div>}
            <small className="ai-disclaimer">{t.aiDisclaimer}</small>
          </div>
        </div>
      </div>
    </section>
  )
}
