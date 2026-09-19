import React from 'react'

const previews = {
  'ecommerce-classic': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="35" fill={colors[0]} rx="8" />
      <rect x="15" y="10" width="60" height="15" fill={colors[1]} rx="4" opacity="0.6" />
      <rect x="200" y="10" width="30" height="15" fill={colors[1]} rx="4" opacity="0.6" />
      <rect x="240" y="10" width="30" height="15" fill={colors[1]} rx="4" opacity="0.6" />
      <rect x="15" y="50" width="250" height="50" fill={colors[1]} rx="6" opacity="0.3" />
      <rect x="40" y="60" width="100" height="8" fill={colors[0]} rx="4" opacity="0.5" />
      <rect x="40" y="75" width="80" height="6" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="15" y="115" width="55" height="70" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="82" y="115" width="55" height="70" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="149" y="115" width="55" height="70" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="216" y="115" width="50" height="70" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="22" y="125" width="40" height="30" fill={colors[0]} rx="4" opacity="0.3" />
      <rect x="89" y="125" width="40" height="30" fill={colors[0]} rx="4" opacity="0.3" />
      <rect x="156" y="125" width="40" height="30" fill={colors[0]} rx="4" opacity="0.3" />
      <rect x="223" y="125" width="35" height="30" fill={colors[0]} rx="4" opacity="0.3" />
    </svg>
  ),
  'ecommerce-modern': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="50" fill={colors[0]} rx="8" />
      <rect x="15" y="12" width="50" height="12" fill={colors[1]} rx="6" opacity="0.5" />
      <circle cx="250" cy="25" r="12" fill={colors[1]} opacity="0.4" />
      <rect x="15" y="65" width="250" height="60" fill={colors[1]} rx="8" opacity="0.25" />
      <rect x="40" y="75" width="120" height="10" fill={colors[0]} rx="5" opacity="0.5" />
      <rect x="40" y="92" width="90" height="8" fill={colors[0]} rx="4" opacity="0.3" />
      <rect x="100" y="108" width="80" height="8" fill={colors[0]} rx="4" opacity="0.2" />
      <rect x="15" y="140" width="75" height="45" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="102" y="140" width="75" height="45" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="189" y="140" width="75" height="45" fill={colors[1]} rx="6" opacity="0.2" />
    </svg>
  ),
  'ecommerce-gold': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="40" fill={colors[0]} rx="8" />
      <rect x="15" y="12" width="70" height="16" fill={colors[1]} rx="8" opacity="0.5" />
      <rect x="200" y="12" width="60" height="16" fill={colors[1]} rx="8" opacity="0.3" />
      <rect x="15" y="55" width="115" height="60" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="150" y="55" width="115" height="60" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="15" y="130" width="115" height="55" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="150" y="130" width="115" height="55" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="30" y="70" width="30" height="30" fill={colors[0]} rx="4" opacity="0.4" />
      <rect x="165" y="70" width="30" height="30" fill={colors[0]} rx="4" opacity="0.4" />
    </svg>
  ),
  'ecommerce-nature': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="30" fill={colors[0]} rx="8" />
      <rect x="15" y="8" width="40" height="14" fill={colors[1]} rx="7" opacity="0.5" />
      <circle cx="255" cy="15" r="8" fill={colors[1]} opacity="0.4" />
      <rect x="15" y="45" width="250" height="55" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="30" y="55" width="100" height="8" fill={colors[0]} rx="4" opacity="0.4" />
      <rect x="30" y="70" width="80" height="6" fill={colors[0]} rx="3" opacity="0.25" />
      <rect x="15" y="115" width="250" height="30" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="15" y="155" width="250" height="30" fill={colors[1]} rx="6" opacity="0.15" />
    </svg>
  ),
  'education-classic': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="35" fill={colors[0]} rx="8" />
      <rect x="15" y="10" width="50" height="15" fill={colors[1]} rx="4" opacity="0.5" />
      <rect x="0" y="35" width="70" height="165" fill={colors[0]} opacity="0.8" />
      <rect x="10" y="50" width="50" height="8" fill={colors[1]} rx="4" opacity="0.4" />
      <rect x="10" y="68" width="50" height="8" fill={colors[1]} rx="4" opacity="0.3" />
      <rect x="10" y="86" width="50" height="8" fill={colors[1]} rx="4" opacity="0.3" />
      <rect x="10" y="104" width="50" height="8" fill={colors[1]} rx="4" opacity="0.3" />
      <rect x="85" y="50" width="180" height="40" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="85" y="100" width="180" height="85" fill={colors[1]} rx="6" opacity="0.15" />
    </svg>
  ),
  'education-interactive': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="40" fill={colors[0]} rx="8" />
      <rect x="15" y="12" width="60" height="16" fill={colors[1]} rx="8" opacity="0.5" />
      <rect x="15" y="55" width="75" height="60" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="102" y="55" width="75" height="60" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="189" y="55" width="75" height="60" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="15" y="128" width="75" height="60" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="102" y="128" width="75" height="60" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="189" y="128" width="75" height="60" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="25" y="65" width="55" height="20" fill={colors[0]} rx="4" opacity="0.3" />
      <rect x="112" y="65" width="55" height="20" fill={colors[0]} rx="4" opacity="0.3" />
    </svg>
  ),
  'education-simple': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="30" fill={colors[0]} rx="8" />
      <rect x="15" y="8" width="40" height="14" fill={colors[1]} rx="7" opacity="0.5" />
      <rect x="15" y="45" width="250" height="30" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="25" y="52" width="16" height="16" fill={colors[0]} rx="4" opacity="0.4" />
      <rect x="50" y="55" width="100" height="8" fill={colors[0]} rx="4" opacity="0.3" />
      <rect x="15" y="85" width="250" height="30" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="25" y="92" width="16" height="16" fill={colors[0]} rx="4" opacity="0.4" />
      <rect x="50" y="95" width="80" height="8" fill={colors[0]} rx="4" opacity="0.3" />
      <rect x="15" y="125" width="250" height="30" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="25" y="132" width="16" height="16" fill={colors[0]} rx="4" opacity="0.4" />
      <rect x="50" y="135" width="120" height="8" fill={colors[0]} rx="4" opacity="0.3" />
      <rect x="15" y="165" width="250" height="25" fill={colors[1]} rx="6" opacity="0.1" />
    </svg>
  ),
  'education-modern': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="45" fill={colors[0]} rx="8" />
      <rect x="15" y="14" width="80" height="17" fill={colors[1]} rx="8" opacity="0.5" />
      <circle cx="250" cy="22" r="10" fill={colors[1]} opacity="0.4" />
      <rect x="15" y="60" width="120" height="85" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="145" y="60" width="120" height="85" fill={colors[1]} rx="8" opacity="0.2" />
      <circle cx="75" cy="102" r="15" fill={colors[0]} opacity="0.4" />
      <circle cx="205" cy="102" r="15" fill={colors[0]} opacity="0.4" />
      <rect x="15" y="158" width="250" height="30" fill={colors[1]} rx="6" opacity="0.12" />
    </svg>
  ),
  'realestate-gold': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="40" fill={colors[0]} rx="8" />
      <rect x="15" y="12" width="55" height="16" fill={colors[1]} rx="8" opacity="0.5" />
      <rect x="15" y="55" width="115" height="65" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="150" y="55" width="115" height="65" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="15" y="130" width="115" height="55" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="150" y="130" width="115" height="55" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="30" y="70" width="85" height="8" fill={colors[0]} rx="4" opacity="0.4" />
      <rect x="30" y="85" width="60" height="6" fill={colors[0]} rx="3" opacity="0.25" />
    </svg>
  ),
  'realestate-modern': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="35" fill={colors[0]} rx="8" />
      <rect x="15" y="10" width="50" height="15" fill={colors[1]} rx="4" opacity="0.5" />
      <rect x="15" y="50" width="250" height="40" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="25" y="58" width="30" height="24" fill={colors[0]} rx="4" opacity="0.3" />
      <rect x="65" y="60" width="80" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="65" y="72" width="50" height="5" fill={colors[0]} rx="3" opacity="0.2" />
      <rect x="15" y="100" width="250" height="40" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="25" y="108" width="30" height="24" fill={colors[0]} rx="4" opacity="0.3" />
      <rect x="65" y="110" width="100" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="65" y="122" width="60" height="5" fill={colors[0]} rx="3" opacity="0.2" />
      <rect x="15" y="150" width="250" height="40" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="25" y="158" width="30" height="24" fill={colors[0]} rx="4" opacity="0.3" />
    </svg>
  ),
  'realestate-nature': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="40" fill={colors[0]} rx="8" />
      <rect x="15" y="12" width="60" height="16" fill={colors[1]} rx="8" opacity="0.5" />
      <rect x="15" y="55" width="130" height="130" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="20" y="60" width="120" height="120" fill={colors[0]} rx="4" opacity="0.1" />
      <rect x="40" y="100" width="80" height="40" fill={colors[1]} rx="4" opacity="0.2" />
      <rect x="160" y="55" width="105" height="35" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="160" y="100" width="105" height="35" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="160" y="145" width="105" height="35" fill={colors[1]} rx="6" opacity="0.15" />
    </svg>
  ),
  'realestate-gray': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="30" fill={colors[0]} rx="8" />
      <rect x="15" y="8" width="40" height="14" fill={colors[1]} rx="7" opacity="0.5" />
      <rect x="15" y="45" width="115" height="70" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="150" y="45" width="115" height="70" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="15" y="128" width="115" height="60" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="150" y="128" width="115" height="60" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="30" y="60" width="85" height="8" fill={colors[0]} rx="4" opacity="0.3" />
      <rect x="165" y="60" width="85" height="8" fill={colors[0]} rx="4" opacity="0.3" />
    </svg>
  ),
  'blog-classic': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="35" fill={colors[0]} rx="8" />
      <rect x="15" y="10" width="50" height="15" fill={colors[1]} rx="4" opacity="0.5" />
      <rect x="15" y="50" width="250" height="35" fill={colors[1]} rx="6" opacity="0.12" />
      <rect x="25" y="58" width="120" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="25" y="70" width="90" height="5" fill={colors[0]} rx="3" opacity="0.2" />
      <rect x="15" y="95" width="250" height="35" fill={colors[1]} rx="6" opacity="0.12" />
      <rect x="25" y="103" width="140" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="25" y="115" width="100" height="5" fill={colors[0]} rx="3" opacity="0.2" />
      <rect x="15" y="140" width="250" height="35" fill={colors[1]} rx="6" opacity="0.12" />
      <rect x="25" y="148" width="100" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="25" y="160" width="80" height="5" fill={colors[0]} rx="3" opacity="0.2" />
    </svg>
  ),
  'blog-dark': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="40" fill={colors[0]} rx="8" />
      <rect x="15" y="12" width="60" height="16" fill={colors[1]} rx="8" opacity="0.5" />
      <rect x="15" y="55" width="75" height="55" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="102" y="55" width="75" height="55" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="189" y="55" width="75" height="55" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="15" y="122" width="75" height="55" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="102" y="122" width="75" height="55" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="189" y="122" width="75" height="55" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="25" y="65" width="55" height="20" fill={colors[0]} rx="4" opacity="0.3" />
    </svg>
  ),
  'blog-minimal': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="25" fill={colors[0]} rx="8" />
      <rect x="15" y="6" width="30" height="13" fill={colors[1]} rx="6" opacity="0.5" />
      <rect x="15" y="40" width="250" height="25" fill={colors[1]} rx="4" opacity="0.1" />
      <rect x="25" y="46" width="100" height="6" fill={colors[0]} rx="3" opacity="0.25" />
      <rect x="15" y="72" width="250" height="25" fill={colors[1]} rx="4" opacity="0.1" />
      <rect x="25" y="78" width="130" height="6" fill={colors[0]} rx="3" opacity="0.25" />
      <rect x="15" y="104" width="250" height="25" fill={colors[1]} rx="4" opacity="0.1" />
      <rect x="25" y="110" width="80" height="6" fill={colors[0]} rx="3" opacity="0.25" />
      <rect x="15" y="136" width="250" height="25" fill={colors[1]} rx="4" opacity="0.1" />
      <rect x="25" y="142" width="150" height="6" fill={colors[0]} rx="3" opacity="0.25" />
      <rect x="15" y="168" width="250" height="20" fill={colors[1]} rx="4" opacity="0.08" />
    </svg>
  ),
  'blog-magazine': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="35" fill={colors[0]} rx="8" />
      <rect x="15" y="10" width="50" height="15" fill={colors[1]} rx="4" opacity="0.5" />
      <rect x="15" y="50" width="160" height="70" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="190" y="50" width="75" height="30" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="190" y="90" width="75" height="30" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="15" y="135" width="75" height="50" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="100" y="135" width="75" height="50" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="190" y="135" width="75" height="50" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="30" y="65" width="60" height="8" fill={colors[0]} rx="4" opacity="0.3" />
    </svg>
  ),
  'services-blue': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="40" fill={colors[0]} rx="8" />
      <rect x="15" y="12" width="60" height="16" fill={colors[1]} rx="8" opacity="0.5" />
      <rect x="15" y="55" width="75" height="60" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="102" y="55" width="75" height="60" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="189" y="55" width="75" height="60" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="15" y="128" width="75" height="60" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="102" y="128" width="75" height="60" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="189" y="128" width="75" height="60" fill={colors[1]} rx="8" opacity="0.2" />
      <circle cx="52" cy="80" r="12" fill={colors[0]} opacity="0.4" />
      <circle cx="140" cy="80" r="12" fill={colors[0]} opacity="0.4" />
    </svg>
  ),
  'services-purple': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="35" fill={colors[0]} rx="8" />
      <rect x="15" y="10" width="50" height="15" fill={colors[1]} rx="4" opacity="0.5" />
      <rect x="15" y="50" width="250" height="40" fill={colors[1]} rx="6" opacity="0.15" />
      <circle cx="35" cy="70" r="10" fill={colors[0]} opacity="0.4" />
      <rect x="55" y="65" width="100" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="15" y="100" width="250" height="40" fill={colors[1]} rx="6" opacity="0.15" />
      <circle cx="35" cy="120" r="10" fill={colors[0]} opacity="0.4" />
      <rect x="55" y="115" width="80" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="15" y="150" width="250" height="40" fill={colors[1]} rx="6" opacity="0.15" />
      <circle cx="35" cy="170" r="10" fill={colors[0]} opacity="0.4" />
    </svg>
  ),
  'services-orange': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="45" fill={colors[0]} rx="8" />
      <rect x="15" y="14" width="70" height="17" fill={colors[1]} rx="8" opacity="0.5" />
      <rect x="15" y="60" width="115" height="55" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="150" y="60" width="115" height="55" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="15" y="128" width="115" height="55" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="150" y="128" width="115" height="55" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="30" y="75" width="85" height="8" fill={colors[0]} rx="4" opacity="0.4" />
      <rect x="165" y="75" width="85" height="8" fill={colors[0]} rx="4" opacity="0.4" />
    </svg>
  ),
  'services-white': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="30" fill={colors[0]} rx="8" />
      <rect x="15" y="8" width="40" height="14" fill={colors[1]} rx="7" opacity="0.5" />
      <rect x="15" y="45" width="55" height="70" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="82" y="45" width="55" height="70" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="149" y="45" width="55" height="70" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="216" y="45" width="50" height="70" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="15" y="128" width="55" height="60" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="82" y="128" width="55" height="60" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="149" y="128" width="55" height="60" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="216" y="128" width="50" height="60" fill={colors[1]} rx="6" opacity="0.15" />
    </svg>
  ),
  'restaurant-wood': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="40" fill={colors[0]} rx="8" />
      <rect x="15" y="12" width="60" height="16" fill={colors[1]} rx="8" opacity="0.5" />
      <rect x="15" y="55" width="250" height="30" fill={colors[1]} rx="6" opacity="0.12" />
      <rect x="25" y="62" width="80" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="220" y="62" width="30" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="15" y="95" width="250" height="30" fill={colors[1]} rx="6" opacity="0.12" />
      <rect x="25" y="102" width="100" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="210" y="102" width="40" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="15" y="135" width="250" height="30" fill={colors[1]} rx="6" opacity="0.12" />
      <rect x="25" y="142" width="60" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="230" y="142" width="20" height="7" fill={colors[0]} rx="3" opacity="0.3" />
    </svg>
  ),
  'restaurant-red': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="45" fill={colors[0]} rx="8" />
      <rect x="15" y="14" width="70" height="17" fill={colors[1]} rx="8" opacity="0.5" />
      <rect x="15" y="60" width="75" height="55" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="102" y="60" width="75" height="55" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="189" y="60" width="75" height="55" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="15" y="128" width="75" height="55" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="102" y="128" width="75" height="55" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="189" y="128" width="75" height="55" fill={colors[1]} rx="8" opacity="0.2" />
      <rect x="30" y="75" width="45" height="25" fill={colors[0]} rx="4" opacity="0.3" />
    </svg>
  ),
  'restaurant-black': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="50" fill={colors[0]} rx="8" />
      <rect x="15" y="15" width="80" height="20" fill={colors[1]} rx="10" opacity="0.5" />
      <rect x="15" y="65" width="250" height="45" fill={colors[1]} rx="6" opacity="0.12" />
      <rect x="30" y="75" width="100" height="8" fill={colors[0]} rx="4" opacity="0.3" />
      <rect x="30" y="90" width="60" height="6" fill={colors[0]} rx="3" opacity="0.2" />
      <rect x="15" y="120" width="250" height="45" fill={colors[1]} rx="6" opacity="0.12" />
      <rect x="30" y="130" width="120" height="8" fill={colors[0]} rx="4" opacity="0.3" />
      <rect x="30" y="145" width="80" height="6" fill={colors[0]} rx="3" opacity="0.2" />
      <rect x="15" y="175" width="250" height="15" fill={colors[1]} rx="4" opacity="0.08" />
    </svg>
  ),
  'restaurant-green': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="35" fill={colors[0]} rx="8" />
      <rect x="15" y="10" width="50" height="15" fill={colors[1]} rx="4" opacity="0.5" />
      <rect x="15" y="50" width="115" height="65" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="150" y="50" width="115" height="65" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="15" y="128" width="115" height="60" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="150" y="128" width="115" height="60" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="30" y="65" width="85" height="8" fill={colors[0]} rx="4" opacity="0.3" />
      <rect x="165" y="65" width="85" height="8" fill={colors[0]} rx="4" opacity="0.3" />
    </svg>
  ),
  'social-facebook': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="40" fill={colors[0]} rx="8" />
      <rect x="15" y="12" width="60" height="16" fill={colors[1]} rx="8" opacity="0.5" />
      <rect x="15" y="55" width="250" height="40" fill={colors[1]} rx="6" opacity="0.12" />
      <circle cx="35" cy="75" r="10" fill={colors[0]} opacity="0.4" />
      <rect x="55" y="68" width="80" height="6" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="55" y="80" width="50" height="5" fill={colors[0]} rx="3" opacity="0.2" />
      <rect x="15" y="105" width="250" height="40" fill={colors[1]} rx="6" opacity="0.12" />
      <circle cx="35" cy="125" r="10" fill={colors[0]} opacity="0.4" />
      <rect x="55" y="118" width="100" height="6" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="55" y="130" width="70" height="5" fill={colors[0]} rx="3" opacity="0.2" />
      <rect x="15" y="155" width="250" height="35" fill={colors[1]} rx="6" opacity="0.12" />
      <circle cx="35" cy="172" r="10" fill={colors[0]} opacity="0.4" />
    </svg>
  ),
  'social-twitter': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="35" fill={colors[0]} rx="8" />
      <rect x="15" y="10" width="50" height="15" fill={colors[1]} rx="4" opacity="0.5" />
      <rect x="15" y="50" width="250" height="30" fill={colors[1]} rx="6" opacity="0.1" />
      <circle cx="30" cy="65" r="8" fill={colors[0]} opacity="0.4" />
      <rect x="45" y="60" width="100" height="5" fill={colors[0]} rx="3" opacity="0.25" />
      <rect x="15" y="90" width="250" height="30" fill={colors[1]} rx="6" opacity="0.1" />
      <circle cx="30" cy="105" r="8" fill={colors[0]} opacity="0.4" />
      <rect x="45" y="100" width="80" height="5" fill={colors[0]} rx="3" opacity="0.25" />
      <rect x="15" y="130" width="250" height="30" fill={colors[1]} rx="6" opacity="0.1" />
      <circle cx="30" cy="145" r="8" fill={colors[0]} opacity="0.4" />
      <rect x="45" y="140" width="120" height="5" fill={colors[0]} rx="3" opacity="0.25" />
      <rect x="15" y="170" width="250" height="20" fill={colors[1]} rx="4" opacity="0.08" />
    </svg>
  ),
  'social-instagram': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="40" fill={colors[0]} rx="8" />
      <rect x="15" y="12" width="60" height="16" fill={colors[1]} rx="8" opacity="0.5" />
      <rect x="15" y="55" width="75" height="65" fill={colors[1]} rx="4" opacity="0.2" />
      <rect x="102" y="55" width="75" height="65" fill={colors[1]} rx="4" opacity="0.2" />
      <rect x="189" y="55" width="75" height="65" fill={colors[1]} rx="4" opacity="0.2" />
      <rect x="15" y="130" width="75" height="60" fill={colors[1]} rx="4" opacity="0.2" />
      <rect x="102" y="130" width="75" height="60" fill={colors[1]} rx="4" opacity="0.2" />
      <rect x="189" y="130" width="75" height="60" fill={colors[1]} rx="4" opacity="0.2" />
      <circle cx="52" cy="87" r="15" fill={colors[0]} opacity="0.3" />
      <circle cx="140" cy="87" r="15" fill={colors[0]} opacity="0.3" />
    </svg>
  ),
  'social-linkedin': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="35" fill={colors[0]} rx="8" />
      <rect x="15" y="10" width="50" height="15" fill={colors[1]} rx="4" opacity="0.5" />
      <rect x="15" y="50" width="250" height="50" fill={colors[1]} rx="6" opacity="0.12" />
      <circle cx="40" cy="75" r="15" fill={colors[0]} opacity="0.4" />
      <rect x="65" y="65" width="100" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="65" y="78" width="70" height="5" fill={colors[0]} rx="3" opacity="0.2" />
      <rect x="15" y="112" width="250" height="35" fill={colors[1]} rx="6" opacity="0.1" />
      <rect x="25" y="120" width="80" height="6" fill={colors[0]} rx="3" opacity="0.25" />
      <rect x="15" y="157" width="250" height="35" fill={colors[1]} rx="6" opacity="0.1" />
      <rect x="25" y="165" width="100" height="6" fill={colors[0]} rx="3" opacity="0.25" />
    </svg>
  ),
  'analytics-dark': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="35" fill={colors[0]} rx="8" />
      <rect x="15" y="10" width="50" height="15" fill={colors[1]} rx="4" opacity="0.5" />
      <rect x="15" y="50" width="130" height="65" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="25" y="60" width="40" height="20" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="75" y="60" width="20" height="30" fill={colors[0]} rx="3" opacity="0.2" />
      <rect x="105" y="60" width="30" height="40" fill={colors[0]} rx="3" opacity="0.15" />
      <rect x="160" y="50" width="105" height="65" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="170" y="60" width="85" height="8" fill={colors[0]} rx="4" opacity="0.3" />
      <rect x="170" y="75" width="60" height="6" fill={colors[0]} rx="3" opacity="0.2" />
      <rect x="15" y="128" width="250" height="60" fill={colors[1]} rx="6" opacity="0.12" />
      <rect x="25" y="138" width="230" height="8" fill={colors[0]} rx="4" opacity="0.2" />
      <rect x="25" y="155" width="180" height="6" fill={colors[0]} rx="3" opacity="0.15" />
    </svg>
  ),
  'analytics-bright': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="40" fill={colors[0]} rx="8" />
      <rect x="15" y="12" width="60" height="16" fill={colors[1]} rx="8" opacity="0.5" />
      <rect x="15" y="55" width="55" height="40" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="82" y="55" width="55" height="40" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="149" y="55" width="55" height="40" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="216" y="55" width="50" height="40" fill={colors[1]} rx="6" opacity="0.2" />
      <rect x="15" y="108" width="250" height="80" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="25" y="118" width="230" height="10" fill={colors[0]} rx="5" opacity="0.2" />
      <rect x="25" y="138" width="180" height="10" fill={colors[0]} rx="5" opacity="0.15" />
      <rect x="25" y="158" width="200" height="10" fill={colors[0]} rx="5" opacity="0.1" />
    </svg>
  ),
  'analytics-purple': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="35" fill={colors[0]} rx="8" />
      <rect x="15" y="10" width="50" height="15" fill={colors[1]} rx="4" opacity="0.5" />
      <rect x="15" y="50" width="160" height="70" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="25" y="60" width="30" height="50" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="65" y="70" width="30" height="40" fill={colors[0]} rx="3" opacity="0.25" />
      <rect x="105" y="55" width="30" height="55" fill={colors[0]} rx="3" opacity="0.2" />
      <rect x="145" y="65" width="20" height="45" fill={colors[0]} rx="3" opacity="0.15" />
      <rect x="190" y="50" width="75" height="70" fill={colors[1]} rx="6" opacity="0.15" />
      <rect x="200" y="60" width="55" height="8" fill={colors[0]} rx="4" opacity="0.3" />
      <rect x="200" y="75" width="40" height="6" fill={colors[0]} rx="3" opacity="0.2" />
      <rect x="15" y="135" width="250" height="55" fill={colors[1]} rx="6" opacity="0.12" />
    </svg>
  ),
  'analytics-green': (colors) => (
    <svg viewBox="0 0 280 200" className="template-svg">
      <rect width="280" height="200" fill={colors[2]} rx="8" />
      <rect x="0" y="0" width="280" height="40" fill={colors[0]} rx="8" />
      <rect x="15" y="12" width="60" height="16" fill={colors[1]} rx="8" opacity="0.5" />
      <rect x="15" y="55" width="250" height="30" fill={colors[1]} rx="6" opacity="0.12" />
      <rect x="25" y="63" width="80" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="220" y="63" width="30" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="15" y="95" width="250" height="30" fill={colors[1]} rx="6" opacity="0.12" />
      <rect x="25" y="103" width="120" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="210" y="103" width="40" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="15" y="135" width="250" height="30" fill={colors[1]} rx="6" opacity="0.12" />
      <rect x="25" y="143" width="60" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="230" y="143" width="20" height="7" fill={colors[0]} rx="3" opacity="0.3" />
      <rect x="15" y="175" width="250" height="15" fill={colors[1]} rx="4" opacity="0.08" />
    </svg>
  )
}

export function WebsitePreview({ style, colors }) {
  const renderPreview = previews[style]
  if (!renderPreview) return previews['ecommerce-classic'](colors)
  return renderPreview(colors)
}

export default WebsitePreview