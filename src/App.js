import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const listings = [
  {
    id: 'sunny-sprouts-green-park',
    name: 'Foundtree DayCare',
    area: 'BTM 2nd Stage • 6 minutes walk to BTM Metro Station',
    badges: ['Toddler‑friendly', 'Meals included'],
    features: [
      'Convenient location close to the park and community center',
      'Clean play spaces, caring teachers, budget‑friendly fees'
    ],
    rating: 4.8,
    ratingLabel: 'Excellent',
    price: 1350,
    originalPrice: 3600,
    image:
      "https://media.istockphoto.com/id/1151191813/photo/teacher-with-preschool-students-riding-rocking-horse.jpg?s=1024x1024&w=is&k=20&c=h1zVb_tiAAQ538A1JM9-SUZ2qnbhO200UY1zAHooKMQ="
  },
  {
    id: 'ginger-kids-candolim',
    name: 'Kidzee Daycare and Pre-school',
    area: 'Electronic city-phase 1',
    badges: ['Free Cancellation', 'Pick‑up Available'],
    features: [
      'Daily activity updates with photos',
      'Experienced staff, secure campus, hygienic meals'
    ],
    rating: 4.4,
    ratingLabel: 'Very Good',
    price: 3059,
    originalPrice: 3339,
    image:
      "https://media.istockphoto.com/id/1458807880/photo/learning-through-play.jpg?s=1024x1024&w=is&k=20&c=YJH2UBjCzWM4TtSseS00I8Sk1VE0gII__8S4U71DppA="
  }
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 960 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [menuOpen]);

  const NavLinks = ({ onClick }) => (
    <>
      <a href="#listings" onClick={onClick}>Listings</a>
      <a href="#programs" onClick={onClick}>Programs</a>
      <a href="#facilities" onClick={onClick}>Facilities</a>
      <a href="#gallery" onClick={onClick}>Gallery</a>
      <a href="#admissions" onClick={onClick}>Admissions</a>
      <a href="#contact" className="cta" onClick={onClick}>Contact</a>
    </>
  );

  return (
    <header className="site-header">
      <div className="container nav">
        <div className="brand"><span className="brand-badge">DCG</span> DayCareGlobal </div>
        <nav className="desktop-nav">
          <NavLinks />
        </nav>
        <button
          className="menu-btn"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          ☰
        </button>
        {menuOpen && (
          <>
            <div className="mobile-nav-overlay" onClick={() => setMenuOpen(false)} />
            <div className="mobile-nav">
              <button
                className="close-btn"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                ✕
              </button>
              <NavLinks onClick={() => setMenuOpen(false)} />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

function Search() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [whoCount, setWhoCount] = useState('1');
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  const openPicker = (ref) => {
    if (ref.current && typeof ref.current.showPicker === 'function') {
      ref.current.showPicker();
    } else if (ref.current) {
      ref.current.focus();
    }
  };

  return (
    <div className="container">
      <div className="search-bar">
        <div className="search-field">
          <label>Where</label>
          <input placeholder="Search daycare" />
        </div>
        <div
          className="search-field clickable"
          onClick={() => openPicker(checkInRef)}
        >
          <label htmlFor="checkin">Check in</label>
          <input
            id="checkin"
            type="date"
            value={checkIn}
            ref={checkInRef}
            onChange={(e) => {
              const val = e.target.value;
              setCheckIn(val);
              if (checkOut && val && checkOut < val) setCheckOut('');
            }}
            onFocus={() => openPicker(checkInRef)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div
          className="search-field clickable"
          onClick={() => openPicker(checkOutRef)}
        >
          <label htmlFor="checkout">Check out</label>
          <input
            id="checkout"
            type="date"
            value={checkOut}
            min={checkIn || undefined}
            ref={checkOutRef}
            onChange={(e) => setCheckOut(e.target.value)}
            onFocus={() => openPicker(checkOutRef)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div className="search-field">
          <label>Who</label>
          <select value={whoCount} onChange={(e) => setWhoCount(e.target.value)}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={String(n)}>
                {n} {n === 1 ? 'child' : 'children'}
              </option>
            ))}
          </select>
        </div>
        <button
          className="search-btn"
          onClick={() => {
            const el = document.getElementById('listings');
            if (el && typeof el.scrollIntoView === 'function') {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              window.location.hash = '#listings';
            }
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <h1>Where little learners grow with joy</h1>
          <p>
            A warm and secure place for children 12 months to 5 years. We blend
            play, creativity, and early academics to build confidence and
            curiosity.
          </p>
          <div className="actions">
            <button className="btn btn-primary">Book a Tour</button>
            <button className="btn btn-secondary">Explore Programs</button>
          </div>
        </div>
        <div className="hero-img" />
      </div>
    </section>
  );
}

function ListingCard({ item, onEnquire }) {
  return (
    <article className="card">
      <div
        className="photo"
        style={{ backgroundImage: `url(${item.image})` }}
      />
      <div className="card-body">
        <h3 style={{ margin: 0 }}>{item.name}</h3>
        <div style={{ color: '#6b7280', margin: '4px 0 6px' }}>{item.area}</div>
        <div>
          {item.badges.map((b) => (
            <span className="badge" key={b}>{b}</span>
          ))}
        </div>
        <div className="features">
          {item.features.map((f) => (
            <div key={f}>• {f}</div>
          ))}
        </div>
      </div>
      <div className="price">
        <div className="rating">
          <span>⭐ {item.rating.toFixed(1)}</span>
          <span style={{ color: '#6b7280', fontWeight: 600 }}>{item.ratingLabel}</span>
        </div>
        <div className="amount">₹ {item.price.toLocaleString()}</div>
        <small>+ taxes & fees • Per Month</small>
        <button
          className="btn btn-primary"
          style={{ marginTop: 10 }}
          onClick={() => onEnquire?.(item)}
        >
          Enquire
        </button>
      </div>
    </article>
  );
}

function Listings({ onEnquire }) {
  return (
    <section id="listings" className="section">
      <div className="container">
        <h2>Daycare & Playschool Listings</h2>
        <div className="sub">Showing centers near you</div>
        <div className="cards" style={{ marginTop: 12 }}>
          {listings.map((l) => (
            <ListingCard item={l} key={l.id} onEnquire={onEnquire} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section id="programs" className="section">
      <div className="container">
        <h2>Programs</h2>
        <div className="sub">Age‑appropriate learning designed by early childhood experts</div>
        <div className="grid-3" style={{ marginTop: 12 }}>
          <div className="info-card">
            <h3>Playgroup (1–2.5 yrs)</h3>
            <p>Sensorial play, music and movement, language building, and social skills.</p>
          </div>
          <div className="info-card">
            <h3>Nursery (2.5–4 yrs)</h3>
            <p>Pre‑literacy and numeracy, story‑based learning, and hands‑on activities.</p>
          </div>
          <div className="info-card">
            <h3>Kindergarten (4–6 yrs)</h3>
            <p>Phonics, early math, STEM corners, and collaborative projects.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Facilities() {
  return (
    <section id="facilities" className="section">
      <div className="container">
        <h2>Facilities</h2>
        <div className="grid-3" style={{ marginTop: 12 }}>
          <div className="info-card">
            <h3>Safety & Hygiene</h3>
            <p>24×7 CCTV, verified staff, secure entry, frequent sanitization.</p>
          </div>
          <div className="info-card">
            <h3>Enriched Spaces</h3>
            <p>Reading nooks, pretend‑play corners, outdoor play, and nap zones.</p>
          </div>
          <div className="info-card">
            <h3>Nutrition</h3>
            <p>Balanced meals designed by nutritionists with allergy awareness.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CareHighlights() {
  const cards = [
    {
      title: 'Health & Safety',
      image:
        'https://images.unsplash.com/photo-1624727828489-a1e03b79bba8',
      points: [
        'Protocols aligned with CDC, British Safety Council & WHO',
        'NEBOSH & IOSH certified safety oversight',
        'Dedicated and trained safety officer and on‑call nurse'
      ]
    },
    {
      title: 'Parent Communication',
      image:
        'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=1200&auto=format&fit=crop',
      points: [
        'Parents are partners in our learning approach',
        'Live CCTV access for complete transparency',
        "Daily updates, newsletters and milestone tracking"
      ]
    },
    {
      title: 'Trained Caregivers',
      image:
        'https://plus.unsplash.com/premium_photo-1664302067274-0117087dfd45',
      points: [
        'Well‑trained educators with continuous upskilling',
        'Induction covering safety, childcare and soft skills',
        'Strong protocol adherence and classroom management'
      ]
    },
    {
      title: 'Corporate Tie‑Ups',
      image:
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
      points: [
        'Childcare benefits for working parents',
        'Top‑notch early learning for peace of mind',
        'Flexible engagement models for employers'
      ]
    }
  ];

  return (
    <section id="care-highlights" className="section">
      <div className="container">
        <h2>
          Child Care <span style={{ color: 'var(--accent)' }}>At It’s Best</span>
        </h2>
        <div className="highlight-grid" style={{ marginTop: 12 }}>
          {cards.map((c) => (
            <article key={c.title} className="highlight-card">
              <div
                className="highlight-image"
                style={{ backgroundImage: `url(${c.image})` }}
              />
              <div className="highlight-body">
                <h3>{c.title}</h3>
               <ul className="bullet-list">
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const images = [
    'https://images.unsplash.com/photo-1564429238817-393bd4286b2d',
    'https://plus.unsplash.com/premium_photo-1750373196034-00c452ebf6dd',
    'https://images.unsplash.com/photo-1587616211892-f743fcca64f9',
    'https://images.unsplash.com/photo-1555448049-f8657e9fc8f3',
    'https://plus.unsplash.com/premium_photo-1747608207700-0ca5b35c92bc',
    'https://plus.unsplash.com/premium_photo-1747608207601-cb722bb357ad'
  ];

  const [active, setActive] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="gallery" className="section">
      <div className="container">
        <h2>Gallery</h2>
        <div className="sub">A peek into our playful, colorful world.</div>
        <div className="gallery" style={{ marginTop: 12 }}>
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Gallery ${i + 1}`}
              className="gimg"
              onClick={() => setActive(src)}
            />
          ))}
        </div>
      </div>

      {active && (
        <div className="lightbox" onClick={() => setActive(null)}>
          <img src={active} alt="Expanded view" />
        </div>
      )}
    </section>
  );
}

function Admissions() {
  return (
    <section id="admissions" className="section">
      <div className="container admissions">
        <h2>Admissions & Fees</h2>
        <p className="sub">Flexible monthly plans with sibling discounts. Book a free counseling call.</p>
        <ul>
          <li>Registration opens year‑round for ages 12 months to 6 years</li>
          <li>Documents: Birth certificate, vaccination record, parent ID</li>
          <li>Trial week available for all programs</li>
        </ul>
        <div className="actions">
          <button className="btn btn-primary">Download Brochure</button>
          <button className="btn btn-secondary">Book a Campus Tour</button>
        </div>
      </div>
    </section>
  );
}

function EnquiryForm({ note, onClose }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input placeholder="Parent's Name" required />
      <input placeholder="Email" type="email" required />
      <input placeholder="Phone" required />
      <textarea
        rows={4}
        placeholder={
          note
            ? `Enquiry about ${note}. Tell us about your child and preferred program`
            : 'Tell us about your child and preferred program'
        }
      />
      <div className="actions">
        <button className="btn btn-primary" type="submit">Send Enquiry</button>
        {onClose && (
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        )}
      </div>
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container contact">
        <h2>Contact Us</h2>
        <EnquiryForm />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        © {new Date().getFullYear()} DayCareGlobal. All rights reserved.
      </div>
    </footer>
  );
}

function App() {
  const [enquiryFor, setEnquiryFor] = useState(null);
  return (
    <>
      <Header />
      <Search />
      <Hero />
      <Listings onEnquire={(item) => setEnquiryFor(item.name)} />
      <Programs />
      <Facilities />
      <CareHighlights />
      <Gallery />
      <Admissions />
      <Contact />
      {enquiryFor && (
        <div className="modal" onClick={() => setEnquiryFor(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Enquire about {enquiryFor}</h3>
            <EnquiryForm note={enquiryFor} onClose={() => setEnquiryFor(null)} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default App;
