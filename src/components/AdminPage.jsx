import React, { useEffect, useState } from 'react'
import { apiRequest } from '../api'

function formatDate(value, lang) {
  return new Intl.DateTimeFormat(lang, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

export default function AdminPage({ token, t, lang }) {
  const [orders, setOrders] = useState([])
  const [messages, setMessages] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    Promise.all([
      apiRequest('/admin/orders', { headers: { Authorization: `Bearer ${token}` } }),
      apiRequest('/admin/messages', { headers: { Authorization: `Bearer ${token}` } }),
    ])
      .then(([ordersResult, messagesResult]) => {
        if (!isActive) return
        setOrders(ordersResult.orders)
        setMessages(messagesResult.messages)
      })
      .catch((requestError) => {
        if (isActive) setError(requestError.message)
      })
      .finally(() => {
        if (isActive) setIsLoading(false)
      })

    return () => { isActive = false }
  }, [token])

  return (
    <section className="page-section admin-page">
      <div className="container">
        <div className="page-header">
          <h2>{t.adminDashboard}</h2>
          <p>{t.adminDashboardDesc}</p>
        </div>

        {error && <div className="auth-error" role="alert">{error}</div>}
        {isLoading ? (
          <p className="admin-state">{t.adminLoading}</p>
        ) : (
          <>
            <div className="admin-summary">
              <div className="admin-summary-card">
                <span>📦</span>
                <strong>{orders.length}</strong>
                <p>{t.adminOrders}</p>
              </div>
              <div className="admin-summary-card">
                <span>✉️</span>
                <strong>{messages.length}</strong>
                <p>{t.adminMessages}</p>
              </div>
            </div>

            <section className="admin-panel">
              <h3>{t.adminOrders}</h3>
              {orders.length === 0 ? <p className="admin-state">{t.adminNoOrders}</p> : (
                <div className="admin-record-list">
                  {orders.map((order) => (
                    <article className="admin-record" key={order._id}>
                      <div className="admin-record-heading">
                        <strong>{order.customerName}</strong>
                        <span>{formatDate(order.createdAt, lang)}</span>
                      </div>
                      <p>{order.customerEmail} · {t.adminOrderNumber}: {order._id}</p>
                      <ul>
                        {order.items.map((item, index) => (
                          <li key={`${item.productId}-${index}`}>
                            {item.title}{item.templateName ? ` — ${item.templateName}` : ''} · $ {item.price}
                          </li>
                        ))}
                      </ul>
                      <div className="admin-record-footer">
                        <span>{t.adminStatus}: {t[`orderStatus_${order.status}`] || order.status}</span>
                        <strong>{t.totalAmount}: $ {order.totalAmount}</strong>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="admin-panel">
              <h3>{t.adminMessages}</h3>
              {messages.length === 0 ? <p className="admin-state">{t.adminNoMessages}</p> : (
                <div className="admin-record-list">
                  {messages.map((message) => (
                    <article className="admin-record" key={message._id}>
                      <div className="admin-record-heading">
                        <strong>{message.subject}</strong>
                        <span>{formatDate(message.createdAt, lang)}</span>
                      </div>
                      <p>{message.name} · <a href={`mailto:${encodeURIComponent(message.email)}`}>{message.email}</a>{message.phone ? ` · ${message.phone}` : ''}</p>
                      <p className="admin-message-body">{message.message}</p>
                      <span>{t.adminStatus}: {t[`messageStatus_${message.status}`] || message.status}</span>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </section>
  )
}
