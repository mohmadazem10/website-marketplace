import React, { useState } from 'react'
import { apiRequest } from '../api'

export default function AuthPage({ t, onLogin }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const switchMode = (m) => {
    setMode(m)
    setError('')
    setPassword('')
    setConfirm('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const missing = mode === 'register'
      ? !name.trim() || !email.trim() || !password.trim() || !confirm.trim()
      : !email.trim() || !password.trim()

    if (missing) {
      setError(t.fillAllFields)
      return
    }

    if (mode === 'register') {
      if (password !== confirm) {
        setError(t.passwordMismatch)
        return
      }

      if (password.length < 12) {
        setError(t.passwordTooShort)
        return
      }
    }

    setIsSubmitting(true)

    try {
      const path = mode === 'register' ? '/auth/register' : '/auth/login'
      const body = mode === 'register'
        ? { name: name.trim(), email: email.trim(), password }
        : { email: email.trim(), password }
      const data = await apiRequest(path, {
        method: 'POST',
        body: JSON.stringify(body),
      })

      onLogin(data.user, data.token)
    } catch (requestError) {
      if (requestError.status === 429) {
        setError(t.tooManyAttempts)
      } else if (requestError.status === 409) {
        setError(t.alreadyRegistered)
      } else if (requestError.status === 401) {
        setError(t.invalidCredentials)
      } else {
        setError(requestError.message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const pwdType = showPass ? 'text' : 'password'

  return (
    <section className="page-section auth-page">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">🚀</div>
            <h2>{mode === 'login' ? t.loginTitle : t.registerTitle}</h2>
            <p>{mode === 'login' ? t.loginDesc : t.registerDesc}</p>
          </div>

          <div className="auth-tabs">
            <button className={`auth-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => switchMode('login')}>{t.loginTab}</button>
            <button className={`auth-tab ${mode === 'register' ? 'active' : ''}`} onClick={() => switchMode('register')}>{t.registerTab}</button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="form-group">
                <label>{t.fullName}</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.fullName} required />
              </div>
            )}

            <div className="form-group">
              <label>{t.email}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.email} required />
            </div>

            <div className="form-group auth-password-group">
              <label>{t.password}</label>
              <div className="auth-password-wrap">
                <input type={pwdType} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t.password} minLength={12} required />
                <button type="button" className="auth-eye" onClick={() => setShowPass(!showPass)} title={t.showPassword}>{showPass ? '🙈' : '👁️'}</button>
              </div>
              {mode === 'register' && <small className="password-hint">{t.passwordTooShort}</small>}
            </div>

            {mode === 'register' && (
              <div className="form-group">
                <label>{t.confirmPassword}</label>
                <input type={pwdType} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder={t.confirmPassword} required />
              </div>
            )}

            {error && <div className="auth-error">⚠️ {error}</div>}

            <button type="submit" className="btn-primary btn-submit auth-submit" disabled={isSubmitting}>
              {mode === 'login' ? t.loginBtn : t.registerBtn}
            </button>
          </form>

          <div className="auth-switch">
            {mode === 'login'
              ? <p>{t.noAccount} <button onClick={() => switchMode('register')}>{t.registerHere}</button></p>
              : <p>{t.haveAccount} <button onClick={() => switchMode('login')}>{t.loginHere}</button></p>}
          </div>
        </div>
      </div>
    </section>
  )
}