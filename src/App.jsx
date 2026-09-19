import React, { useEffect, useState } from 'react'
import { useLanguage } from './i18n/LanguageContext'
import { apiRequest } from './api'
import Header from './components/Header'
import Cart from './components/Cart'
import TemplatePicker from './components/TemplatePicker'
import Toast from './components/Toast'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import CategoriesPage from './components/CategoriesPage'
import AboutPage from './components/AboutPage'
import ContactPage from './components/ContactPage'
import AuthPage from './components/AuthPage'
import ProfilePage from './components/ProfilePage'
import AIPage from './components/AIPage'
import InteractivePreview from './components/InteractivePreview'

const ALL_KEY = '__all__'

// Helper to get websites with translated content
function getWebsites(t, lang) {
  const isEn = lang === 'en'
  const isHe = lang === 'he'
  
  return [
    {
      id: 1,
      title: t.product1Title,
      description: t.product1Desc,
      price: 1499,
      category: t.ecommerce,
      image: '🛒',
      features: isEn ? ['Dashboard', 'Product Management', 'Shopping Cart', 'Payment Gateway'] : isHe ? ['לוח בקרה', 'ניהול מוצרים', 'סל קניות', 'שער תשלום'] : ['لوحة تحكم', 'إدارة منتجات', 'سلة مشتريات', 'بوابة دفع'],
      rating: 4.8,
      sales: 234,
      templates: [
        { id: 't1-1', name: isEn ? 'Classic Blue' : isHe ? 'כחול קלאסי' : 'كلاسيك أزرق', previewStyle: 'ecommerce-classic', colors: ['#2563eb', '#3b82f6', '#dbeafe'], layout: isEn ? 'Right Sidebar' : isHe ? 'סרגל צד ימני' : 'شريط جانبي أيمن' },
        { id: 't1-2', name: isEn ? 'Modern Dark' : isHe ? 'מודרני כהה' : 'مودرن داكن', previewStyle: 'ecommerce-modern', colors: ['#1e293b', '#334155', '#e2e8f0'], layout: isEn ? 'Large Header' : isHe ? 'כותרת עליונה גדולה' : 'رأس علوي كبير' },
        { id: 't1-3', name: isEn ? 'Luxury Gold' : isHe ? 'זהב יוקרתי' : 'ذهبي فاخر', previewStyle: 'ecommerce-gold', colors: ['#92400e', '#d97706', '#fef3c7'], layout: isEn ? 'Product Grid' : isHe ? 'רשת מוצרים' : 'شبكة منتجات' },
        { id: 't1-4', name: isEn ? 'Natural Green' : isHe ? 'ירוק טבעי' : 'أخضر طبيعي', previewStyle: 'ecommerce-nature', colors: ['#065f46', '#059669', '#d1fae5'], layout: isEn ? 'Single Page Store' : isHe ? 'חנות בעמוד אחד' : 'متجر صفحة واحدة' }
      ]
    },
    {
      id: 2,
      title: t.product2Title,
      description: t.product2Desc,
      price: 1999,
      category: t.education,
      image: '📚',
      features: isEn ? ['Video Lessons', 'Quizzes', 'Certificates', 'Discussion Forum'] : isHe ? ['שיעורי וידאו', 'מבחנים', 'תעודות', 'פורום דיונים'] : ['دروس فيديو', 'اختبارات', 'شهادات', 'منتدى نقاش'],
      rating: 4.6,
      sales: 189,
      templates: [
        { id: 't2-1', name: isEn ? 'Academic Classic' : isHe ? 'אקדמי קלאסי' : 'أكاديمي كلاسيك', previewStyle: 'education-classic', colors: ['#1d4ed8', '#3b82f6', '#dbeafe'], layout: isEn ? 'Side Lesson List' : isHe ? 'רשימת שיעורים צדדית' : 'قائمة دروس جانبية' },
        { id: 't2-2', name: isEn ? 'Modern Interactive' : isHe ? 'מודרני אינטראקטיבי' : 'حديث تفاعلي', previewStyle: 'education-interactive', colors: ['#6d28d9', '#8b5cf6', '#ede9fe'], layout: isEn ? 'Lesson Cards' : isHe ? 'כרטיסי שיעורים' : 'بطاقات دروس' },
        { id: 't2-3', name: isEn ? 'Simple Elegant' : isHe ? 'פשוט ואלגנטי' : 'بسيط أنيق', previewStyle: 'education-simple', colors: ['#0f766e', '#14b8a6', '#ccfbf1'], layout: isEn ? 'Playlist' : isHe ? 'רשימת השמעה' : 'قائمة تشغيل' },
        { id: 't2-4', name: isEn ? 'Bright Modern' : isHe ? 'מודרני בהיר' : 'عصري مشرق', previewStyle: 'education-modern', colors: ['#be123c', '#f43f5e', '#ffe4e6'], layout: isEn ? 'Video Grid' : isHe ? 'רשת סרטונים' : 'شبكة فيديوهات' }
      ]
    },
    {
      id: 3,
      title: t.product3Title,
      description: t.product3Desc,
      price: 1299,
      category: t.realestate,
      image: '🏠',
      features: isEn ? ['Advanced Search', 'Virtual Tours', 'Appointment Booking', 'Interactive Maps'] : isHe ? ['חיפוש מתקדם', 'סיורים וירטואליים', 'הזמנת פגישות', 'מפות אינטראקטיביות'] : ['بحث متقدم', 'جولات افتراضية', 'حجز مواعيد', 'خرائط تفاعلية'],
      rating: 4.7,
      sales: 156,
      templates: [
        { id: 't3-1', name: isEn ? 'Luxury Gold' : isHe ? 'זהב יוקרתי' : 'فاخر ذهبي', previewStyle: 'realestate-gold', colors: ['#78350f', '#d97706', '#fef3c7'], layout: isEn ? 'Grid View' : isHe ? 'תצוגת רשת' : 'عرض شبكي' },
        { id: 't3-2', name: isEn ? 'Modern Blue' : isHe ? 'כחול מודרני' : 'عصري أزرق', previewStyle: 'realestate-modern', colors: ['#1e3a5f', '#2563eb', '#bfdbfe'], layout: isEn ? 'Property List' : isHe ? 'רשימת נכסים' : 'قائمة عقارات' },
        { id: 't3-3', name: isEn ? 'Natural Green' : isHe ? 'ירוק טבעי' : 'طبيعي أخضر', previewStyle: 'realestate-nature', colors: ['#064e3b', '#059669', '#d1fae5'], layout: isEn ? 'Map + List' : isHe ? 'מפה + רשימה' : 'خريطة + قائمة' },
        { id: 't3-4', name: isEn ? 'Elegant Gray' : isHe ? 'אפור אלגנטי' : 'أنيق رمادي', previewStyle: 'realestate-gray', colors: ['#374151', '#6b7280', '#e5e7eb'], layout: isEn ? 'Property Cards' : isHe ? 'כרטיסי נכסים' : 'بطاقات عقارات' }
      ]
    },
    {
      id: 4,
      title: t.product4Title,
      description: t.product4Desc,
      price: 799,
      category: t.blog,
      image: '✍️',
      features: isEn ? ['CMS', 'Comments', 'Analytics', 'Advanced SEO'] : isHe ? ['מערכת ניהול תוכן', 'תגובות', 'סטטיסטיקות', 'SEO מתקדם'] : ['نظام إدارة محتوى', 'تعليقات', 'إحصائيات', 'SEO متقدم'],
      rating: 4.5,
      sales: 312,
      templates: [
        { id: 't4-1', name: isEn ? 'Classic White' : isHe ? 'לבן קלאסי' : 'كلاسيك أبيض', previewStyle: 'blog-classic', colors: ['#1f2937', '#f9fafb', '#e5e7eb'], layout: isEn ? 'Traditional Blog' : isHe ? 'בלוג מסורתי' : 'مدونة تقليدية' },
        { id: 't4-2', name: isEn ? 'Modern Dark' : isHe ? 'כהה מודרני' : 'مودرن داكن', previewStyle: 'blog-dark', colors: ['#0f172a', '#1e293b', '#38bdf8'], layout: isEn ? 'Article Cards' : isHe ? 'כרטיסי מאמרים' : 'بطاقات مقالات' },
        { id: 't4-3', name: isEn ? 'Minimal Simple' : isHe ? 'מינימלי פשוט' : 'بسيط مينيمال', previewStyle: 'blog-minimal', colors: ['#18181b', '#fafafa', '#d4d4d8'], layout: isEn ? 'Simple List' : isHe ? 'רשימה פשוטה' : 'قائمة بسيطة' },
        { id: 't4-4', name: isEn ? 'Modern Magazine' : isHe ? 'מגזין מודרני' : 'مجلة عصرية', previewStyle: 'blog-magazine', colors: ['#831843', '#db2777', '#fce7f3'], layout: isEn ? 'Magazine Grid' : isHe ? 'רשת מגזין' : 'شبكة مجلة' }
      ]
    },
    {
      id: 5,
      title: t.product5Title,
      description: t.product5Desc,
      price: 2499,
      category: t.services,
      image: '💼',
      features: isEn ? ['Order System', 'Reviews', 'Wallet', 'Live Chat'] : isHe ? ['מערכת הזמנות', 'ביקורות', 'ארנק', 'צ\'אט חי'] : ['نظام طلبات', 'مراجعات', 'محفظة مالية', 'دردشة فورية'],
      rating: 4.9,
      sales: 98,
      templates: [
        { id: 't5-1', name: isEn ? 'Professional Blue' : isHe ? 'כחול מקצועי' : 'احترافي أزرق', previewStyle: 'services-blue', colors: ['#1e40af', '#3b82f6', '#eff6ff'], layout: isEn ? 'Services Grid' : isHe ? 'רשת שירותים' : 'شبكة خدمات' },
        { id: 't5-2', name: isEn ? 'Modern Purple' : isHe ? 'סגול מודרני' : 'عصري بنفسجي', previewStyle: 'services-purple', colors: ['#5b21b6', '#8b5cf6', '#f5f3ff'], layout: isEn ? 'Services List' : isHe ? 'רשימת שירותים' : 'قائمة خدمات' },
        { id: 't5-3', name: isEn ? 'Warm Orange' : isHe ? 'כתום חם' : 'دافئ برتقالي', previewStyle: 'services-orange', colors: ['#9a3412', '#ea580c', '#fff7ed'], layout: isEn ? 'Offer Cards' : isHe ? 'כרטיסי הצעות' : 'بطاقات عروض' },
        { id: 't5-4', name: isEn ? 'Clean White' : isHe ? 'לבן נקי' : 'نظيف أبيض', previewStyle: 'services-white', colors: ['#111827', '#ffffff', '#e5e7eb'], layout: isEn ? 'Free Market' : isHe ? 'שוק חופשי' : 'سوق حر' }
      ]
    },
    {
      id: 6,
      title: t.product6Title,
      description: t.product6Desc,
      price: 999,
      category: t.restaurant,
      image: '🍽️',
      features: isEn ? ['Digital Menu', 'Online Ordering', 'Table Booking', 'Delivery'] : isHe ? ['תפריט דיגיטלי', 'הזמנה אונליין', 'הזמנת שולחנות', 'משלוחים'] : ['قائمة طعام', 'طلب أونلاين', 'حجز طاولات', 'توصيل'],
      rating: 4.4,
      sales: 267,
      templates: [
        { id: 't6-1', name: isEn ? 'Warm Wood' : isHe ? 'עץ חם' : 'دافئ خشبي', previewStyle: 'restaurant-wood', colors: ['#78350f', '#b45309', '#fef3c7'], layout: isEn ? 'Food Menu' : isHe ? 'תפריט אוכל' : 'قائمة طعام' },
        { id: 't6-2', name: isEn ? 'Modern Red' : isHe ? 'אדום מודרני' : 'عصري أحمر', previewStyle: 'restaurant-red', colors: ['#991b1b', '#ef4444', '#fef2f2'], layout: isEn ? 'Dish Cards' : isHe ? 'כרטיסי מנות' : 'بطاقات أطباق' },
        { id: 't6-3', name: isEn ? 'Elegant Black' : isHe ? 'שחור אלגנטי' : 'أنيق أسود', previewStyle: 'restaurant-black', colors: ['#000000', '#1f2937', '#f9fafb'], layout: isEn ? 'Digital Menu' : isHe ? 'תפריט דיגיטלי' : 'منيو رقمي' },
        { id: 't6-4', name: isEn ? 'Natural Green' : isHe ? 'ירוק טבעי' : 'طبيعي أخضر', previewStyle: 'restaurant-green', colors: ['#14532d', '#22c55e', '#f0fdf4'], layout: isEn ? 'Food Grid' : isHe ? 'רשת אוכל' : 'شبكة طعام' }
      ]
    },
    {
      id: 7,
      title: t.product7Title,
      description: t.product7Desc,
      price: 2999,
      category: t.social,
      image: '🌐',
      features: isEn ? ['Posts', 'Interactions', 'Groups', 'Private Messages'] : isHe ? ['פוסטים', 'אינטראקציות', 'קבוצות', 'הודעות פרטיות'] : ['منشورات', 'تفاعلات', 'مجموعات', 'رسائل خاصة'],
      rating: 4.3,
      sales: 67,
      templates: [
        { id: 't7-1', name: isEn ? 'Facebook Style' : isHe ? 'סגנון פייסבוק' : 'فيسبوك ستايل', previewStyle: 'social-facebook', colors: ['#1e3a8a', '#2563eb', '#dbeafe'], layout: isEn ? 'News Feed' : isHe ? 'פיד חדשות' : 'تغذية أخبار' },
        { id: 't7-2', name: isEn ? 'Twitter Style' : isHe ? 'סגנון טוויטר' : 'تويتر ستايل', previewStyle: 'social-twitter', colors: ['#0f172a', '#1d4ed8', '#f0f9ff'], layout: isEn ? 'Tweets' : isHe ? 'ציוצים' : 'تغريدات' },
        { id: 't7-3', name: isEn ? 'Instagram Style' : isHe ? 'סגנון אינסטגרם' : 'انستغرام ستايل', previewStyle: 'social-instagram', colors: ['#831843', '#db2777', '#fdf2f8'], layout: isEn ? 'Photo Grid' : isHe ? 'רשת תמונות' : 'شبكة صور' },
        { id: 't7-4', name: isEn ? 'LinkedIn Style' : isHe ? 'סגנון לינקדאין' : 'لينكد إن ستايل', previewStyle: 'social-linkedin', colors: ['#0a66c2', '#378fe9', '#e8f4fd'], layout: isEn ? 'Profiles' : isHe ? 'פרופילים' : 'ملفات شخصية' }
      ]
    },
    {
      id: 8,
      title: t.product8Title,
      description: t.product8Desc,
      price: 1599,
      category: t.analytics,
      image: '📊',
      features: isEn ? ['Charts', 'Reports', 'Alerts', 'Data Export'] : isHe ? ['גרפים', 'דוחות', 'התראות', 'ייצוא נתונים'] : ['رسوم بيانية', 'تقارير', 'تنبيهات', 'تصدير بيانات'],
      rating: 4.7,
      sales: 145,
      templates: [
        { id: 't8-1', name: isEn ? 'Professional Dark' : isHe ? 'כהה מקצועי' : 'داكن احترافي', previewStyle: 'analytics-dark', colors: ['#020617', '#1e293b', '#38bdf8'], layout: isEn ? 'Master Dashboard' : isHe ? 'לוח מחוונים ראשי' : 'لوحة متقنة' },
        { id: 't8-2', name: isEn ? 'Bright Blue' : isHe ? 'כחול בהיר' : 'مشرق أزرق', previewStyle: 'analytics-bright', colors: ['#1e3a8a', '#3b82f6', '#eff6ff'], layout: isEn ? 'Stats Cards' : isHe ? 'כרטיסי סטטיסטיקות' : 'بطاقات إحصائيات' },
        { id: 't8-3', name: isEn ? 'Tech Purple' : isHe ? 'סגול טכנולוגי' : 'بنفسجي تقني', previewStyle: 'analytics-purple', colors: ['#2e1065', '#7c3aed', '#ede9fe'], layout: isEn ? 'Interactive Charts' : isHe ? 'גרפים אינטראקטיביים' : 'رسوم تفاعلية' },
        { id: 't8-4', name: isEn ? 'Financial Green' : isHe ? 'ירוק פיננסי' : 'أخضر مالي', previewStyle: 'analytics-green', colors: ['#022c22', '#059669', '#d1fae5'], layout: isEn ? 'Financial Reports' : isHe ? 'דוחות פיננסיים' : 'تقارير مالية' }
      ]
    }
  ]
}

// ==================== MAIN APP ====================
function App() {
  const { t, lang, changeLanguage } = useLanguage()
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [activeCategory, setActiveCategory] = useState(ALL_KEY)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [templatePicker, setTemplatePicker] = useState(null)
  const [comparedWebsites, setComparedWebsites] = useState([])
  const [showComparison, setShowComparison] = useState(false)
  const [previewWebsite, setPreviewWebsite] = useState(null)
  const [currentPage, setCurrentPage] = useState('auth')
  const [currentUser, setCurrentUser] = useState(() => {
    if (!localStorage.getItem('site-token')) return null
    try { return JSON.parse(localStorage.getItem('site-session') || 'null') } catch { return null }
  })

  useEffect(() => {
    const token = localStorage.getItem('site-token')
    if (!token) return

    apiRequest('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ user }) => {
        setCurrentUser(user)
        setCart(Array.isArray(user.cart) ? user.cart : [])
        setCurrentPage('home')
      })
      .catch(() => {
        localStorage.removeItem('site-token')
        localStorage.removeItem('site-session')
        setCurrentUser(null)
        setCurrentPage('auth')
      })
  }, [])

  const websites = getWebsites(t, lang)
  const allCategories = [...new Set(websites.map(w => w.category))]

  const filteredWebsites = activeCategory === ALL_KEY
    ? websites
    : websites.filter(w => w.category === activeCategory)

  const addToCart = (website, template = null) => {
    const cartItem = { ...website, selectedTemplate: template }
    if (cart.find(item => item.id === website.id)) {
      showToast(t.alreadyInCart)
      return
    }
    const nextCart = [...cart, cartItem]
    setCart(nextCart)
    saveCart(nextCart)
    const templateMsg = template ? ` ${t.withDesign} "${template.name}"` : ''
    showToast(`${t.addedToCart} "${website.title}"${templateMsg} ${t.toCart}`)
  }

  const removeFromCart = (id) => {
    const nextCart = cart.filter(item => item.id !== id)
    setCart(nextCart)
    saveCart(nextCart)
  }

  const saveCart = async (nextCart) => {
    const token = localStorage.getItem('site-token')
    if (!token) return

    try {
      await apiRequest('/auth/cart', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ cart: nextCart }),
      })
    } catch (error) {
      showToast(error.message)
    }
  }

  const showToast = (message) => {
    setToastMessage(message)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  const handleChooseTemplate = (website) => {
    setTemplatePicker(website)
  }

  const toggleCompare = (website) => {
    setComparedWebsites(current => {
      if (current.some(item => item.id === website.id)) return current.filter(item => item.id !== website.id)
      if (current.length >= 3) {
        showToast(t.compareLimit)
        return current
      }
      return [...current, website]
    })
  }

  const handleTemplateSelect = (template) => {
    const website = templatePicker
    addToCart(website, template)
    setTemplatePicker(null)
  }

  const handleCheckout = () => {
    if (cart.length === 0) return
    const total = cart.reduce((sum, item) => sum + item.price, 0)
    showToast(`✅ ${t.orderSuccess}\n${t.totalAmount}: $${total}`)
    setCart([])
    saveCart([])
    setShowCart(false)
  }

  const handleNavigate = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const handleLogin = (user, token) => {
    localStorage.setItem('site-token', token)
    localStorage.setItem('site-session', JSON.stringify(user))
    setCart(Array.isArray(user.cart) ? user.cart : [])
    setCurrentUser(user)
    setCurrentPage('home')
    showToast(`👤 ${t.loggedInAs} ${user.name}`)
  }

  const handleAvatarChange = async (file) => {
    const formData = new FormData()
    formData.append('avatar', file)

    try {
      const token = localStorage.getItem('site-token')
      const { user } = await apiRequest('/auth/avatar', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      setCurrentUser(user)
      localStorage.setItem('site-session', JSON.stringify(user))
      showToast(t.avatarUpdated)
    } catch (error) {
      showToast(error.message)
    }
  }

  const handleUserUpdate = (user) => {
    setCurrentUser(user)
    localStorage.setItem('site-session', JSON.stringify(user))
  }

  const handleLogout = () => {
    localStorage.removeItem('site-token')
    localStorage.removeItem('site-session')
    setCart([])
    setCurrentUser(null)
    setCurrentPage('home')
    showToast(t.logoutSuccess)
  }

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setCurrentPage('home')
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="app">
      <Header
        cartCount={cart.length}
        onCartClick={() => setShowCart(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        t={t}
        lang={lang}
        changeLanguage={changeLanguage}
        user={currentUser}
        onLogout={handleLogout}
      />

      {currentPage === 'home' && (
        <HomePage
          categories={allCategories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          filteredWebsites={filteredWebsites}
          onAddToCart={addToCart}
          onChooseTemplate={handleChooseTemplate}
          onToggleCompare={toggleCompare}
          onPreview={setPreviewWebsite}
          comparedWebsites={comparedWebsites}
          onRemoveCompare={(id) => setComparedWebsites(current => current.filter(item => item.id !== id))}
          showComparison={showComparison}
          onCloseComparison={() => setShowComparison(current => !current)}
          token={localStorage.getItem('site-token')}
          t={t}
          allKey={ALL_KEY}
        />
      )}

      {currentPage === 'categories' && (
        <CategoriesPage
          onCategoryChange={handleCategoryChange}
          t={t}
          lang={lang}
        />
      )}

      {currentPage === 'about' && <AboutPage t={t} />}
      {currentPage === 'contact' && <ContactPage t={t} />}
      {currentPage === 'auth' && <AuthPage t={t} onLogin={handleLogin} />}
      {currentPage === 'profile' && currentUser && (
        <ProfilePage
          user={currentUser}
          token={localStorage.getItem('site-token')}
          t={t}
          onUserUpdate={handleUserUpdate}
          onAvatarChange={handleAvatarChange}
        />
      )}
      {currentPage === 'ai' && currentUser && <AIPage t={t} token={localStorage.getItem('site-token')} />}

      {showCart && (
        <Cart cart={cart} onRemoveFromCart={removeFromCart} onClose={() => setShowCart(false)} onCheckout={handleCheckout} t={t} />
      )}
      {templatePicker && (
        <TemplatePicker website={templatePicker} onSelect={handleTemplateSelect} onClose={() => setTemplatePicker(null)} t={t} />
      )}
      {previewWebsite && <InteractivePreview website={previewWebsite} onClose={() => setPreviewWebsite(null)} t={t} />}
      <Toast message={toastMessage} visible={toastVisible} />
      <Footer t={t} />
    </div>
  )
}

export default App