import React from 'react'

export default function CategoriesPage({ onCategoryChange, t, lang }) {
  const categoryData = [
    { icon: '🛒', name: t.ecommerce, desc: lang === 'en' ? 'Complete e-commerce sites with payment systems and product management' : lang === 'he' ? 'אתרי מסחר אלקטרוני מלאים עם מערכות תשלום וניהול מוצרים' : 'مواقع متاجر إلكترونية متكاملة مع أنظمة دفع وإدارة منتجات', count: 1 },
    { icon: '📚', name: t.education, desc: lang === 'en' ? 'Educational platforms with video lessons, quizzes and certificates' : lang === 'he' ? 'פלטפורמות למידה עם שיעורי וידאו, מבחנים ותעודות' : 'منصات تعليمية مع دروس فيديو واختبارات وشهادات', count: 1 },
    { icon: '🏠', name: t.realestate, desc: lang === 'en' ? 'Real estate sites with advanced search and virtual tours' : lang === 'he' ? 'אתרי נדל"ן עם חיפוש מתקדם וסיורים וירטואליים' : 'مواقع عقارية مع بحث متقدم وجولات افتراضية', count: 1 },
    { icon: '✍️', name: t.blog, desc: lang === 'en' ? 'Personal and professional blogs with CMS' : lang === 'he' ? 'בלוגים אישיים ומקצועיים עם מערכת ניהול תוכן' : 'مدونات شخصية واحترافية مع نظام إدارة محتوى', count: 1 },
    { icon: '💼', name: t.services, desc: lang === 'en' ? 'Freelance service platforms with order system and reviews' : lang === 'he' ? 'פלטפורמות שירותים עצמאיים עם מערכת הזמנות וביקורות' : 'منصات خدمات مصغرة مع نظام طلبات ومراجعات', count: 1 },
    { icon: '🍽️', name: t.restaurant, desc: lang === 'en' ? 'Restaurant sites with online ordering and table booking' : lang === 'he' ? 'אתרי מסעדות עם הזמנה אונליין והזמנת שולחנות' : 'مواقع مطاعم مع طلب أونلاين وحجز طاولات', count: 1 },
    { icon: '🌐', name: t.social, desc: lang === 'en' ? 'Complete social media networks' : lang === 'he' ? 'רשתות חברתיות מלאות' : 'شبكات تواصل اجتماعي متكاملة', count: 1 },
    { icon: '📊', name: t.analytics, desc: lang === 'en' ? 'Advanced analytics dashboards' : lang === 'he' ? 'לוחות בקרה ואנליטיקה מתקדמים' : 'لوحات تحكم وتحليلات متقدمة', count: 1 }
  ]

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-header">
          <h2>{t.categoriesTitle}</h2>
          <p>{t.categoriesDesc}</p>
        </div>

        <div className="categories-showcase">
          {categoryData.map((cat) => (
            <div key={cat.name} className="category-showcase-card" onClick={() => onCategoryChange(cat.name)}>
              <div className="category-showcase-icon">{cat.icon}</div>
              <div className="category-showcase-info">
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
              </div>
              <div className="category-showcase-count">
                <span>{cat.count}</span>
                <span>{t.design}</span>
              </div>
              <span className="category-showcase-arrow">←</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}