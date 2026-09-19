import React, { useState } from 'react'
import { apiRequest } from '../api'

function ProfileAvatar({ user, large = false }) {
  return user.avatarUrl
    ? <img className={large ? 'profile-avatar profile-avatar-large' : 'profile-avatar'} src={user.avatarUrl} alt="" />
    : <span className={large ? 'profile-avatar profile-avatar-large profile-avatar-placeholder' : 'profile-avatar profile-avatar-placeholder'}>👤</span>
}

export default function ProfilePage({ user, token, t, onUserUpdate, onAvatarChange }) {
  const [view, setView] = useState('overview')
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const resetFeedback = () => {
    setMessage('')
    setError('')
  }

  const openView = (nextView) => {
    resetFeedback()
    setView(nextView)
  }

  const goBack = () => {
    resetFeedback()
    setView('overview')
  }

  const saveProfile = async (event) => {
    event.preventDefault()
    resetFeedback()
    setSaving(true)

    try {
      const data = await apiRequest('/auth/profile', {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, email }),
      })
      onUserUpdate(data.user)
      setMessage(t.profileUpdated)
    } catch (requestError) {
      setError(requestError.status === 409 ? t.alreadyRegistered : requestError.message)
    } finally {
      setSaving(false)
    }
  }

  const savePassword = async (event) => {
    event.preventDefault()
    resetFeedback()

    if (newPassword !== confirmPassword) {
      setError(t.passwordMismatch)
      return
    }

    if (newPassword.length < 12) {
      setError(t.passwordTooShort)
      return
    }

    setSaving(true)
    try {
      await apiRequest('/auth/password', {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setMessage(t.passwordUpdated)
    } catch (requestError) {
      setError(requestError.status === 401 ? t.currentPasswordIncorrect : requestError.message)
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file) await onAvatarChange(file)
  }

  if (view === 'avatar') {
    return (
      <ProfileEditor title={t.changeAvatar} description={t.avatarPageDesc} onBack={goBack} t={t}>
        <div className="profile-editor-center">
          <ProfileAvatar user={user} large />
          <label className="profile-upload-zone">
            <span className="profile-upload-icon">↑</span>
            <strong>{user.avatarUrl ? t.changeAvatar : t.uploadAvatar}</strong>
            <small>{t.avatarFormats}</small>
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleAvatarChange} />
          </label>
        </div>
      </ProfileEditor>
    )
  }

  if (view === 'info') {
    return (
      <ProfileEditor title={t.personalInfo} description={t.profileInfoDesc} onBack={goBack} t={t}>
        <form className="profile-form profile-editor-form" onSubmit={saveProfile}>
          <label>{t.fullName}<input value={name} onChange={(event) => setName(event.target.value)} required /></label>
          <label>{t.email}<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <button className="btn-primary" type="submit" disabled={saving}>{t.saveChanges}</button>
          {message && <div className="profile-message">{message}</div>}
          {error && <div className="auth-error">{error}</div>}
        </form>
      </ProfileEditor>
    )
  }

  if (view === 'password') {
    return (
      <ProfileEditor title={t.changePassword} description={t.passwordPageDesc} onBack={goBack} t={t}>
        <form className="profile-form profile-editor-form" onSubmit={savePassword}>
          <label>{t.currentPassword}<input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required /></label>
          <label>{t.newPassword}<input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} minLength={12} required /></label>
          <label>{t.confirmPassword}<input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} minLength={12} required /></label>
          <small className="profile-form-hint">{t.passwordTooShort}</small>
          <button className="btn-primary" type="submit" disabled={saving}>{t.updatePassword}</button>
          {message && <div className="profile-message">{message}</div>}
          {error && <div className="auth-error">{error}</div>}
        </form>
      </ProfileEditor>
    )
  }

  return (
    <section className="page-section profile-page">
      <div className="container profile-container">
        <div className="profile-hero">
          <div className="profile-hero-identity">
            <ProfileAvatar user={user} large />
            <div>
              <span className="profile-eyebrow">{t.profile}</span>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </div>
          <span className="profile-status">● {t.accountActive}</span>
        </div>

        <div className="profile-heading">
          <div>
            <h3>{t.profileSettings}</h3>
            <p>{t.profileDesc}</p>
          </div>
        </div>

        <div className="profile-actions-grid">
          <ProfileAction icon="◎" title={t.changeAvatar} description={user.avatarUrl ? t.avatarReady : t.uploadAvatar} onClick={() => openView('avatar')} />
          <ProfileAction icon="✦" title={t.personalInfo} description={`${user.name} · ${user.email}`} onClick={() => openView('info')} />
          <ProfileAction icon="⌁" title={t.changePassword} description={t.passwordSecure} onClick={() => openView('password')} />
        </div>
      </div>
    </section>
  )
}

function ProfileAction({ icon, title, description, onClick }) {
  return (
    <button className="profile-action-card" onClick={onClick}>
      <span className="profile-action-icon">{icon}</span>
      <span className="profile-action-copy"><strong>{title}</strong><small>{description}</small></span>
      <span className="profile-action-arrow">→</span>
    </button>
  )
}

function ProfileEditor({ title, description, onBack, children, t }) {
  return (
    <section className="page-section profile-page">
      <div className="container profile-container">
        <button className="profile-back" onClick={onBack}>← <span>{t.backToProfile}</span></button>
        <div className="profile-editor-card">
          <div className="profile-editor-heading">
            <span className="profile-eyebrow">{t.accountSettings}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}
