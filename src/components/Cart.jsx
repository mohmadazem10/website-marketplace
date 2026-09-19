import React, { useState } from 'react'
import { WebsitePreview } from '../data/websitePreviews'

export default function Cart({ cart, onRemoveFromCart, onClose, onCheckout, t }) {
  const [showPayment, setShowPayment] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [paymentDone, setPaymentDone] = useState(false)

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const paymentMethods = [
    { id: 'creditCard', name: t.creditCard, icon: '💳' },
    { id: 'paypal', name: t.paypal, icon: '🅿️' },
    { id: 'bankTransfer', name: t.bankTransfer, icon: '🏦' },
    { id: 'cashOnDelivery', name: t.cashOnDelivery, icon: '💵' }
  ]

  const handlePayment = () => {
    if (!selectedPayment) return
    setPaymentDone(true)
    setTimeout(() => {
      onCheckout()
      setShowPayment(false)
      setSelectedPayment(null)
      setPaymentDone(false)
    }, 2000)
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>{showPayment ? t.paymentMethods : t.cart}</h2>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        {!showPayment ? (
          <>
            {cart.length === 0 ? (
              <div className="cart-empty">
                <span className="cart-empty-icon">🛒</span>
                <p>{t.cartEmpty}</p>
                <p className="cart-empty-sub">{t.cartEmptySub}</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.id + (item.selectedTemplate?.id || '')} className="cart-item">
                      <span className="cart-item-emoji">{item.image}</span>
                      <div className="cart-item-info">
                        <h4>{item.title}</h4>
                        {item.selectedTemplate && (
                          <div className="cart-item-template">
                            <div className="cart-template-mini">
                              <WebsitePreview style={item.selectedTemplate.previewStyle} colors={item.selectedTemplate.colors} />
                            </div>
                            <span>{item.selectedTemplate.name}</span>
                          </div>
                        )}
                        <span className="cart-item-price">${item.price}</span>
                      </div>
                      <button className="cart-item-remove" onClick={() => onRemoveFromCart(item.id)}>✕</button>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>{t.total}</span>
                    <span className="cart-total-price">${total}</span>
                  </div>
                  <button className="btn-checkout" onClick={() => setShowPayment(true)}>{t.checkout}</button>
                </div>
              </>
            )}
          </>
        ) : paymentDone ? (
          <div className="cart-empty">
            <span className="cart-empty-icon" style={{ fontSize: '3rem' }}>✅</span>
            <p>{t.paymentSuccess}</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              <div className="payment-summary">
                <span className="payment-summary-label">{t.total}</span>
                <span className="payment-summary-price">${total}</span>
              </div>
              <p className="payment-select-title">{t.selectPayment}</p>
              <div className="payment-methods">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`payment-method-card ${selectedPayment === method.id ? 'selected' : ''}`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <span className="payment-method-icon">{method.icon}</span>
                    <span className="payment-method-name">{method.name}</span>
                    {selectedPayment === method.id && <span className="payment-check">✓</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="cart-footer">
              <button className="btn-cancel" onClick={() => setShowPayment(false)}>{t.cancel}</button>
              <button
                className={`btn-checkout ${!selectedPayment ? 'disabled' : ''}`}
                disabled={!selectedPayment}
                onClick={handlePayment}
              >
                {t.completePayment}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}