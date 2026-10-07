import React, { useEffect, useState } from 'react'
import { apiRequest } from '../api'

function formatDate(value, lang) {
  return new Intl.DateTimeFormat(lang, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

export default function AdminPage({ token, t, lang, defaultProducts, onProductCreated, onProductDeleted }) {
  const [orders, setOrders] = useState([])
  const [messages, setMessages] = useState([])
  const [products, setProducts] = useState([])
  const [deletedProductIds, setDeletedProductIds] = useState([])
  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '🌐',
    features: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSavingProduct, setIsSavingProduct] = useState(false)
  const [refreshCount, setRefreshCount] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => setRefreshCount((count) => count + 1), 10000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    let isActive = true

    Promise.all([
      apiRequest('/admin/orders', { headers: { Authorization: `Bearer ${token}` } }),
      apiRequest('/admin/messages', { headers: { Authorization: `Bearer ${token}` } }),
      apiRequest('/admin/products', { headers: { Authorization: `Bearer ${token}` } }),
    ])
      .then(([ordersResult, messagesResult, productsResult]) => {
        if (!isActive) return
        setOrders(ordersResult.orders)
        setMessages(messagesResult.messages)
        setProducts(productsResult.products)
        setDeletedProductIds(productsResult.deletedProductIds)
      })
      .catch((requestError) => {
        if (isActive) setError(requestError.message)
      })
      .finally(() => {
        if (isActive) setIsLoading(false)
      })

    return () => { isActive = false }
  }, [token, refreshCount])

  const handleProductChange = (event) => {
    const { name, value } = event.target
    setProductForm((current) => ({ ...current, [name]: value }))
  }

  const handleProductSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSavingProduct(true)
    try {
      const { product } = await apiRequest('/admin/products', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...productForm,
          price: Number(productForm.price),
          features: productForm.features.split(',').map((feature) => feature.trim()).filter(Boolean),
        }),
      })
      setProducts((current) => [product, ...current])
      onProductCreated(product)
      setProductForm({ title: '', description: '', price: '', category: '', image: '🌐', features: '' })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSavingProduct(false)
    }
  }

  const handleProductDelete = async (productId) => {
    if (!window.confirm(t.adminDeleteConfirm)) return
    setError('')
    try {
      await apiRequest(`/admin/products/${encodeURIComponent(productId)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      setProducts((current) => current.filter((product) => String(product.id) !== String(productId)))
      setDeletedProductIds((current) => [...new Set([...current, String(productId)])])
      onProductDeleted(String(productId))
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const listedProducts = [
    ...defaultProducts.filter((product) => !deletedProductIds.includes(String(product.id))),
    ...products,
  ]

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
              <h3>{t.adminProductManagement}</h3>
              <form className="admin-product-form" onSubmit={handleProductSubmit}>
                <label>{t.adminProductTitle}
                  <input name="title" value={productForm.title} onChange={handleProductChange} maxLength="160" required />
                </label>
                <label>{t.adminProductDescription}
                  <textarea name="description" value={productForm.description} onChange={handleProductChange} maxLength="2000" rows="3" required />
                </label>
                <div className="admin-product-form-row">
                  <label>{t.adminProductPrice}
                    <input name="price" type="number" min="0" step="0.01" value={productForm.price} onChange={handleProductChange} required />
                  </label>
                  <label>{t.adminProductCategory}
                    <input name="category" value={productForm.category} onChange={handleProductChange} maxLength="80" required />
                  </label>
                  <label>{t.adminProductIcon}
                    <input name="image" value={productForm.image} onChange={handleProductChange} maxLength="16" />
                  </label>
                </div>
                <label>{t.adminProductFeatures}
                  <input name="features" value={productForm.features} onChange={handleProductChange} placeholder={t.adminProductFeaturesHint} />
                </label>
                <button className="btn-primary" type="submit" disabled={isSavingProduct}>
                  {isSavingProduct ? t.adminProductSaving : t.adminProductAdd}
                </button>
              </form>
              <div className="admin-product-list">
                <h4>{t.adminProductList}</h4>
                {listedProducts.map((product) => (
                  <article className="admin-product-row" key={product.id}>
                    <div>
                      <strong>{product.image} {product.title}</strong>
                      <span>{product.category} · $ {product.price}</span>
                    </div>
                    <button className="admin-delete-button" type="button" onClick={() => handleProductDelete(String(product.id))}>
                      {t.adminProductDelete}
                    </button>
                  </article>
                ))}
              </div>
            </section>

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
                      {order.paymentMethod && <p>{t.paymentMethod}: {t[order.paymentMethod] || order.paymentMethod}</p>}
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
