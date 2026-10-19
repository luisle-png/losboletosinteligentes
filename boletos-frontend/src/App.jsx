import { useEffect, useState } from 'react'
import './App.css'

const events = [
  {
    id: 1,
    title: 'Horizonte Festival',
    artist: 'Una noche para perder la noción del tiempo',
    category: 'Música',
    date: 'Sáb, 24 AGO · 18:00',
    venue: 'Parque Fundidora',
    city: 'Monterrey, NL',
    price: 890,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1500&q=85',
    badge: 'ÚLTIMOS BOLETOS',
    accent: 'coral',
  },
  {
    id: 2,
    title: 'Noche de Comedia',
    artist: 'Risas sin guion con talentos de casa',
    category: 'Comedia',
    date: 'Vie, 30 AGO · 20:30',
    venue: 'Foro Tims',
    city: 'Monterrey, NL',
    price: 420,
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1100&q=85',
    badge: 'NUEVO',
    accent: 'blue',
  },
  {
    id: 3,
    title: 'Sabor a México',
    artist: 'Cocina, música y tradición en un solo lugar',
    category: 'Experiencias',
    date: 'Dom, 08 SEP · 13:00',
    venue: 'Casa Morelos',
    city: 'Monterrey, NL',
    price: 350,
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1100&q=85',
    badge: 'PARA COMPARTIR',
    accent: 'green',
  },
  {
    id: 4,
    title: 'Luz de Cámara',
    artist: 'Las grandes bandas sonoras, en vivo',
    category: 'Cultura',
    date: 'Sáb, 14 SEP · 19:00',
    venue: 'Auditorio San Pedro',
    city: 'San Pedro, NL',
    price: 680,
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1100&q=85',
    badge: 'FECHA ESPECIAL',
    accent: 'yellow',
  },
  {
    id: 5,
    title: 'Tour de Tombo',
    artist: 'Tombo en vivo en Ciudad de México',
    category: 'Experiencias',
    date: 'Vie, 16 OCT · 21:00',
    venue: 'Estadio',
    city: 'CDMX',
    price: 1000,
    capacity: 10000,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1100&q=85',
    badge: 'HOY · CDMX',
    accent: 'coral',
  },
  {
    id: 6,
    title: 'BTS · Tour (demo)',
    artist: 'Listado de demostración, no oficial. Fecha y sede por confirmar.',
    category: 'Música',
    date: 'Fecha por confirmar',
    venue: 'Sede por confirmar',
    city: '',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1100&q=85',
    badge: 'DEMO · NO OFICIAL',
    accent: 'coral',
  },
  {
    id: 7,
    title: 'NewJeans · Tour (demo)',
    artist: 'Listado de demostración, no oficial. Fecha y sede por confirmar.',
    category: 'Música',
    date: 'Fecha por confirmar',
    venue: 'Sede por confirmar',
    city: '',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1100&q=85',
    badge: 'DEMO · NO OFICIAL',
    accent: 'blue',
  },
  {
    id: 8,
    title: 'Stray Kids · Tour (demo)',
    artist: 'Listado de demostración, no oficial. Fecha y sede por confirmar.',
    category: 'Música',
    date: 'Fecha por confirmar',
    venue: 'Sede por confirmar',
    city: '',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1100&q=85',
    badge: 'DEMO · NO OFICIAL',
    accent: 'green',
  },
]

const categories = ['Todo', 'Música', 'Comedia', 'Experiencias', 'Cultura']
const formatPrice = (price) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(price)

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

function createReceipt(event, quantity, user) {
  return {
    id: `AF-${Date.now().toString().slice(-8)}`,
    eventId: event.id,
    title: event.title,
    date: event.date,
    venue: event.venue,
    quantity,
    total: event.price * quantity,
    buyer: user.name,
    email: user.email,
    createdAt: new Date().toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' }),
  }
}

function Icon({ name, size = 18 }) {
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
    ticket: <><path d="M2 9a3 3 0 0 0 0 6v4h20v-4a3 3 0 0 1 0-6V5H2Z" /><path d="M13 5v2m0 4v2m0 4v2" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    user: <><circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function App() {
  const [users, setUsers] = useState(() => readStorage('aforo-users', []))
  const [session, setSession] = useState(() => readStorage('aforo-session', null))
  const [receipts, setReceipts] = useState(() => readStorage('aforo-purchases', []))
  const [category, setCategory] = useState('Todo')
  const [search, setSearch] = useState('')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [accountOpen, setAccountOpen] = useState(false)
  const [receiptOpen, setReceiptOpen] = useState(null)
  const [pendingPurchase, setPendingPurchase] = useState(false)
  const [authError, setAuthError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => localStorage.setItem('aforo-users', JSON.stringify(users)), [users])
  useEffect(() => localStorage.setItem('aforo-session', JSON.stringify(session)), [session])
  useEffect(() => localStorage.setItem('aforo-purchases', JSON.stringify(receipts)), [receipts])

  const currentUser = users.find((user) => user.email === session?.email)
  const selectedEventRemaining = selectedEvent?.capacity === undefined
    ? Infinity
    : Math.max(0, selectedEvent.capacity - receipts.reduce((total, receipt) => (
      receipt.eventId === selectedEvent.id ? total + receipt.quantity : total
    ), 0))
  const maxPurchaseQuantity = Math.min(8, selectedEventRemaining)
  const visibleEvents = events.filter((event) => {
    const matchesCategory = category === 'Todo' || event.category === category
    const matchesSearch = `${event.title} ${event.artist} ${event.venue} ${event.city}`.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  function openEvent(event) {
    setSelectedEvent(event)
    const soldTickets = receipts.reduce((total, receipt) => (
      receipt.eventId === event.id ? total + receipt.quantity : total
    ), 0)
    setQuantity(event.capacity !== undefined && soldTickets >= event.capacity ? 0 : 1)
  }

  function finishPurchase(user) {
    const receipt = createReceipt(selectedEvent, quantity, user)
    setReceipts((current) => [receipt, ...current])
    setSelectedEvent(null)
    setReceiptOpen(receipt)
    setPendingPurchase(false)
  }

  function handleAuthSubmit(event) {
    event.preventDefault()
    setAuthError('')
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email')).trim().toLowerCase()
    const password = String(formData.get('password'))

    if (authMode === 'register') {
      if (users.some((user) => user.email === email)) {
        setAuthError('Ya existe una cuenta con este correo.')
        return
      }
      const newUser = { name, email, password }
      setUsers((current) => [...current, newUser])
      setSession({ email })
      setAuthOpen(false)
      if (pendingPurchase && selectedEvent) finishPurchase(newUser)
      else setNotice(`¡Bienvenido, ${name.split(' ')[0]}!`)
      return
    }

    const user = users.find((item) => item.email === email && item.password === password)
    if (!user) {
      setAuthError('Correo o contraseña incorrectos.')
      return
    }
    setSession({ email })
    setAuthOpen(false)
    if (pendingPurchase && selectedEvent) finishPurchase(user)
    else setNotice(`Qué bueno verte, ${user.name.split(' ')[0]}.`)
  }

  function confirmPurchase() {
    if (!currentUser) {
      setPendingPurchase(true)
      setAuthMode('login')
      setAuthOpen(true)
      return
    }
    finishPurchase(currentUser)
  }

  function signOut() {
    setSession(null)
    setAccountOpen(false)
    setNotice('Sesión cerrada.')
  }

  return (
    <div className="app-shell">
      <div className="announcement"><span className="announcement-dot" /> CON NUESTRA AGENCIA TODO ES MEJOR <span className="announcement-note">Viajes y experiencias para recordar</span></div>
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Susu viaja conmigo, inicio"><span className="brand-mark" aria-hidden="true">✦</span><span className="brand-name"><strong>SUSU</strong><small>VIAJA CONMIGO</small></span></a>
        <nav className="main-nav" aria-label="Navegación principal"><a href="#eventos" className="nav-active">Descubrir</a><a href="#eventos">Categorías</a><a href="#como-funciona">Cómo funciona</a></nav>
        <div className="header-actions">
          {currentUser ? <button className="account-button" onClick={() => setAccountOpen(true)}><span className="avatar">{currentUser.name.charAt(0).toUpperCase()}</span><span className="account-name">{currentUser.name.split(' ')[0]}</span></button> : <button className="login-button" onClick={() => { setAuthMode('login'); setAuthOpen(true) }}>Iniciar sesión</button>}
          <a className="header-cta" href="#eventos">Ver eventos <Icon name="arrow" size={16} /></a>
        </div>
      </header>

      <main id="inicio">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><span /> EXPERIENCIAS PARA RECORDAR</div>
            <h1>Susu viaja<br /><span>conmigo.</span></h1>
            <p className="hero-tagline">Con nuestra agencia todo es mejor.</p>
            <p>Descubre conciertos, viajes y momentos especiales. Tu próxima aventura empieza aquí.</p>
            <a href="#eventos" className="primary-button">Encuentra tu próximo plan <Icon name="arrow" size={18} /></a>
            <div className="hero-proof"><div className="proof-avatars"><span>M</span><span>J</span><span>L</span></div><p><strong>2,400+</strong> personas ya tienen plan</p></div>
          </div>
          <div className="hero-art" role="img" aria-label="Público en un concierto en vivo">
            <div className="hero-photo" />
            <div className="hero-sticker"><span>VAMOS</span><strong>Tu próxima<br />aventura.</strong><i>↗</i></div>
            <div className="hero-caption"><span className="caption-line" /> Momentos que se quedan contigo</div>
            <div className="hero-spark" aria-hidden="true">✦</div>
          </div>
          <div className="hero-index"><span>01</span> / 07</div>
        </section>

        <section className="event-section" id="eventos">
          <div className="section-heading">
            <div><div className="eyebrow section-eyebrow">LA CIUDAD TIENE PLANES</div><h2>Algo bueno <em>está pasando.</em></h2></div>
            <a className="text-link" href="#eventos">Ver toda la agenda <Icon name="arrow" size={16} /></a>
          </div>
          <div className="discovery-bar">
            <div className="category-list" role="tablist" aria-label="Filtrar eventos por categoría">
              {categories.map((item) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? 'category-chip selected' : 'category-chip'} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <label className="search-box"><Icon name="search" size={17} /><input aria-label="Buscar eventos" placeholder="Busca un evento" value={search} onChange={(event) => setSearch(event.target.value)} /><span>⌘ K</span></label>
          </div>

          <div className="event-grid">
            {visibleEvents.map((event) => <article className="event-card" key={event.id}>
              <button className="event-image-button" onClick={() => openEvent(event)} aria-label={`Ver detalles de ${event.title}`}>
                <img src={event.image} alt={event.title} loading="lazy" />
                <span className={`event-badge ${event.accent}`}>{event.badge}</span>
                <span className="image-arrow"><Icon name="arrow" size={18} /></span>
              </button>
              <div className="event-card-body">
                <div className="event-meta"><span>{event.category}</span><span>{event.date.split(' · ')[0]}</span></div>
                <button className="event-title-button" onClick={() => openEvent(event)}><h3>{event.title}</h3></button>
                <p className="event-artist">{event.artist}</p>
                <div className="event-card-footer"><span className="venue-line"><Icon name="pin" size={15} />{event.venue}</span><span className="event-price">Desde <strong>{formatPrice(event.price)}</strong></span></div>
              </div>
            </article>)}
          </div>
          {visibleEvents.length === 0 && <div className="empty-results">No encontramos eventos con esa búsqueda. Prueba con otra palabra.</div>}
          <div className="all-events"><button className="outline-button" onClick={() => { setCategory('Todo'); setSearch('') }}>Explorar todos los eventos <Icon name="arrow" size={16} /></button></div>
        </section>

        <section className="how-section" id="como-funciona">
          <div className="how-intro"><div className="eyebrow section-eyebrow">ASÍ DE FÁCIL</div><h2>Del “deberíamos”<br />al <em>“qué buena noche”.</em></h2></div>
          <div className="how-steps"><div className="step"><span className="step-number">01</span><div><h3>Encuentra el plan</h3><p>Explora eventos y descubre los detalles antes de elegir.</p></div></div><div className="step"><span className="step-number">02</span><div><h3>Elige tus boletos</h3><p>Selecciona la cantidad que necesitas y confirma tu compra.</p></div></div><div className="step"><span className="step-number">03</span><div><h3>Vívelo en grande</h3><p>Tu comprobante queda guardado para que lo tengas a la mano.</p></div></div></div>
        </section>
      </main>

      <footer className="site-footer"><a className="brand footer-brand" href="#inicio" aria-label="Susu viaja conmigo, inicio"><span className="brand-mark" aria-hidden="true">✦</span><span className="brand-name"><strong>SUSU</strong><small>VIAJA CONMIGO</small></span></a><p>Con nuestra agencia todo es mejor.</p><span>© 2026 Susu Viaja Conmigo</span></footer>

      {selectedEvent && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedEvent(null) }}>
        <section className="event-modal" role="dialog" aria-modal="true" aria-labelledby="event-modal-title">
          <button className="modal-close" onClick={() => setSelectedEvent(null)} aria-label="Cerrar"><Icon name="close" /></button>
          <img className="modal-event-image" src={selectedEvent.image} alt="" />
          <div className="event-modal-content"><div className="eyebrow section-eyebrow">{selectedEvent.category}{selectedEvent.city && ` · ${selectedEvent.city}`}</div><h2 id="event-modal-title">{selectedEvent.title}</h2><p className="modal-event-description">{selectedEvent.artist}</p>
            <div className="detail-row"><Icon name="calendar" /><div><strong>Fecha y hora</strong><span>{selectedEvent.date}</span></div></div>
            <div className="detail-row"><Icon name="pin" /><div><strong>Lugar</strong><span>{[selectedEvent.venue, selectedEvent.city].filter(Boolean).join(', ')}</span></div></div>
            <div className="purchase-row"><div><span className="field-label">BOLETOS · {formatPrice(selectedEvent.price)} C/U</span>{selectedEvent.capacity !== undefined && <span className="ticket-availability">{selectedEventRemaining.toLocaleString('es-MX')} disponibles</span>}<div className="quantity-control"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Quitar un boleto" disabled={quantity <= 1}><Icon name="minus" size={16} /></button><span>{quantity}</span><button onClick={() => setQuantity((value) => Math.min(maxPurchaseQuantity, value + 1))} aria-label="Agregar un boleto" disabled={quantity >= maxPurchaseQuantity}><Icon name="plus" size={16} /></button></div></div><div className="purchase-total"><span>Total</span><strong>{formatPrice(selectedEvent.price * quantity)}</strong></div></div>
          </div>
        </section>
      </div>}

      {authOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setAuthOpen(false) }}>
        <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
          <button className="modal-close" onClick={() => setAuthOpen(false)} aria-label="Cerrar"><Icon name="close" /></button>
          <div className="auth-mark">✦ <span>SUSU</span></div><div className="eyebrow section-eyebrow">TU PRÓXIMA HISTORIA</div><h2 id="auth-title">{authMode === 'login' ? 'Qué bueno verte.' : 'Hazte un lugar.'}</h2><p className="auth-subtitle">{authMode === 'login' ? 'Entra a tu cuenta para continuar.' : 'Crea tu cuenta y empieza a hacer planes.'}</p>
          <form className="auth-form" onSubmit={handleAuthSubmit}>
            {authMode === 'register' && <label>Nombre completo<input name="name" type="text" placeholder="Tu nombre" autoComplete="name" required /></label>}
            <label>Correo electrónico<input name="email" type="email" placeholder="tu@correo.com" autoComplete="email" required /></label>
            <label>Contraseña<input name="password" type="password" placeholder="Mínimo 6 caracteres" autoComplete={authMode === 'login' ? 'current-password' : 'new-password'} minLength="6" required /></label>
            {authError && <p className="form-error" role="alert">{authError}</p>}
            <button className="primary-button auth-submit" type="submit">{authMode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'} <Icon name="arrow" size={17} /></button>
          </form>
          <p className="auth-switch">{authMode === 'login' ? '¿Aún no tienes cuenta?' : '¿Ya tienes cuenta?'} <button onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setAuthError('') }}>{authMode === 'login' ? 'Regístrate' : 'Inicia sesión'}</button></p>
        </section>
      </div>}

      {accountOpen && currentUser && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setAccountOpen(false) }}>
        <section className="account-modal" role="dialog" aria-modal="true" aria-labelledby="account-title"><button className="modal-close" onClick={() => setAccountOpen(false)} aria-label="Cerrar"><Icon name="close" /></button><div className="account-avatar-large">{currentUser.name.charAt(0).toUpperCase()}</div><div className="eyebrow section-eyebrow">TU CUENTA</div><h2 id="account-title">Hola, {currentUser.name.split(' ')[0]}.</h2><p className="account-email">{currentUser.email}</p><div className="receipt-list-title"><Icon name="ticket" size={17} /> Tus comprobantes <span>{receipts.filter((item) => item.email === currentUser.email).length}</span></div>{receipts.filter((item) => item.email === currentUser.email).length ? receipts.filter((item) => item.email === currentUser.email).map((item) => <button className="saved-receipt" key={item.id} onClick={() => { setAccountOpen(false); setReceiptOpen(item) }}><span><strong>{item.title}</strong><small>{item.quantity} boleto{item.quantity > 1 ? 's' : ''} · {item.createdAt}</small></span><Icon name="arrow" size={16} /></button>) : <p className="no-receipts">Todavía no tienes compras. Tu próximo plan te espera.</p>}<button className="signout-button" onClick={signOut}>Cerrar sesión</button></section>
      </div>}

      {receiptOpen && <div className="modal-backdrop receipt-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setReceiptOpen(null) }}>
        <section className="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title"><button className="modal-close" onClick={() => setReceiptOpen(null)} aria-label="Cerrar"><Icon name="close" /></button><div className="receipt-check"><Icon name="check" size={26} /></div><div className="eyebrow section-eyebrow">COMPRA CONFIRMADA</div><h2 id="receipt-title">Ya tienes plan.</h2><p className="receipt-thanks">Tu compra quedó guardada en este dispositivo.</p><div className="receipt-ticket"><div className="receipt-ticket-top"><span>SUSU <span className="receipt-logo-dot">✦</span></span><span>COMPROBANTE</span></div><h3>{receiptOpen.title}</h3><p>{receiptOpen.date}</p><p>{receiptOpen.venue}</p><div className="receipt-divider" /><div className="receipt-data"><span>Folio<strong>{receiptOpen.id}</strong></span><span>Boletos<strong>{receiptOpen.quantity}</strong></span><span>Comprador<strong>{receiptOpen.buyer}</strong></span></div><div className="receipt-total"><span>Total pagado</span><strong>{formatPrice(receiptOpen.total)}</strong></div><p className="receipt-date">{receiptOpen.createdAt}</p></div><button className="primary-button receipt-done" onClick={() => setReceiptOpen(null)}>Listo, gracias <Icon name="check" size={17} /></button></section>
      </div>}

      {notice && <div className="toast" role="status"><Icon name="check" size={16} />{notice}<button onClick={() => setNotice('')} aria-label="Cerrar aviso"><Icon name="close" size={15} /></button></div>}
    </div>
  )
}

export default App
