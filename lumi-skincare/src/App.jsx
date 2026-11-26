import { useMemo, useState } from "react";

const products = [
  {
    id: "glow-serum",
    category: "SERUM",
    name: "Glow Serum",
    price: 32,
    description: "Hydrating serum for radiant, healthy-looking skin.",
    image: "/assets/glow-serum.png",
  },
  {
    id: "daily-cream",
    category: "MOISTURIZER",
    name: "Daily Cream",
    price: 28,
    description: "Lightweight daily moisturizer for soft, nourished skin.",
    image: "/assets/daily-cream.png",
  },
  {
    id: "soft-cleanser",
    category: "CLEANSER",
    name: "Soft Cleanser",
    price: 24,
    description: "Gentle cleanser for a fresh and balanced feel.",
    image: "/assets/soft-cleanser.png",
  },
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Button({ children, variant = "Primary", onClick, className = "", type = "button" }) {
  return (
    <button type={type} className={`button button-${variant.toLowerCase()} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

function NavigationLink({ children, onClick, footer = false }) {
  return (
    <button type="button" className={`navigation-link${footer ? " footer-link" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

function Header({ cartCount, onCartOpen }) {
  return (
    <header className="header" id="home">
      <button className="logo" type="button" onClick={() => scrollToSection("home")} aria-label="LUMI home">
        <span className="logo-main">LUMI</span>
        <span className="logo-subtitle">SKINCARE STUDIO</span>
      </button>

      <nav className="header-navigation" aria-label="Primary navigation">
        <NavigationLink onClick={() => scrollToSection("home")}>Home</NavigationLink>
        <NavigationLink onClick={() => scrollToSection("products")}>Products</NavigationLink>
        <NavigationLink onClick={() => scrollToSection("story")}>About</NavigationLink>
        <NavigationLink onClick={() => scrollToSection("footer")}>Contact</NavigationLink>
      </nav>

      <div className="header-actions">
        <button className="bag-icon" type="button" onClick={onCartOpen} aria-label="Open shopping bag">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.5 8.5h11l1.2 11H5.3l1.2-11Z" />
            <path d="M9 9V7a3 3 0 0 1 6 0v2" />
          </svg>
        </button>
        <Button variant="Outline" onClick={onCartOpen}>Bag</Button>
        <span className="cart-count" aria-label={`${cartCount} items in bag`}>{cartCount}</span>
        <Button onClick={() => scrollToSection("products")}>Shop Now</Button>
      </div>
    </header>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details">
        <p className="product-category">{product.category}</p>
        <div className="product-title-row">
          <h3>{product.name}</h3>
          <span>${product.price}</span>
        </div>
        <p className="product-description">{product.description}</p>
        <Button variant="Outline" className="add-to-cart" onClick={() => onAdd(product)}>
          Add to Cart
        </Button>
      </div>
    </article>
  );
}

function BenefitCard({ icon, title, description }) {
  return (
    <article className="benefit-card">
      <img className="benefit-icon" src={icon} alt="" />
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  function subscribe() {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!isValid) {
      setStatus("Please enter a valid email address.");
      return;
    }
    setStatus("Thank you. A little glow is on its way.");
  }

  return (
    <section className="newsletter" id="newsletter">
      <h2>A little glow in your inbox.</h2>
      <p className="newsletter-description">Subscribe to receive skincare tips, new arrivals and exclusive offers.</p>
      <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); subscribe(); }} noValidate>
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status) setStatus("");
          }}
          placeholder="Your email address"
          aria-label="Email address"
        />
        <Button type="submit">Subscribe</Button>
      </form>
      <p className={`newsletter-status${status ? " visible" : ""}`} role="status" aria-live="polite">
        {status || "A thoughtful note, every so often. Unsubscribe anytime."}
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <span>LUMI</span>
          <p>Thoughtful skincare. Simple rituals.<br />A little more you, every day.</p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <p className="footer-label">EXPLORE LUMI</p>
          <NavigationLink footer onClick={() => scrollToSection("products")}>Products</NavigationLink>
          <NavigationLink footer onClick={() => scrollToSection("story")}>About</NavigationLink>
          <NavigationLink footer onClick={() => scrollToSection("footer")}>Contact</NavigationLink>
        </nav>

        <div className="footer-contact">
          <p className="footer-label">LET’S STAY IN TOUCH</p>
          <a href="mailto:hello@lumiskincare.studio">hello@lumiskincare.studio</a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 LUMI Skincare Studio</span>
        <span>Made for your everyday glow.</span>
      </div>
    </footer>
  );
}

function CartDrawer({ open, onClose, cart, onQuantityChange }) {
  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  return (
    <>
      <button
        type="button"
        className={`cart-backdrop${open ? " open" : ""}`}
        onClick={onClose}
        aria-label="Close shopping bag"
        tabIndex={open ? 0 : -1}
      />
      <aside className={`cart-drawer${open ? " open" : ""}`} aria-hidden={!open} aria-label="Shopping bag">
        <div className="cart-header">
          <h2>Your bag</h2>
          <button type="button" className="cart-close" onClick={onClose} aria-label="Close shopping bag">×</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="cart-empty">Your bag is empty.</p>
          ) : cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt="" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <div className="quantity-controls" aria-label={`Quantity for ${item.name}`}>
                  <button type="button" onClick={() => onQuantityChange(item.id, -1)} aria-label={`Decrease ${item.name}`}>−</button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => onQuantityChange(item.id, 1)} aria-label={`Increase ${item.name}`}>+</button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="cart-footer">
          <div className="subtotal">
            <span>Subtotal</span>
            <strong>${subtotal}</strong>
          </div>
          <Button className="checkout-button" onClick={() => undefined}>Checkout</Button>
        </div>
      </aside>
    </>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }

  function changeQuantity(productId, delta) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  return (
    <div className="landing-page">
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow">YOUR DAILY SKINCARE RITUAL</p>
            <h1 id="hero-title">Your skin,<br />your natural glow.</h1>
            <p className="hero-description">Discover simple, effective skincare designed to make you feel confident in your own skin.</p>
            <div className="hero-actions">
              <Button onClick={() => scrollToSection("products")}>SHOP COLLECTION</Button>
              <Button variant="Outline" onClick={() => scrollToSection("story")}>DISCOVER OUR STORY</Button>
            </div>
            <p className="hero-trust">Clean ingredients. Thoughtful formulas.<br />Everyday confidence.</p>
          </div>
          <img className="hero-image" src="/assets/hero.png" alt="LUMI skincare collection with botanical ingredients" />
        </section>

        <section className="products-section" id="products">
          <div className="products-heading">
            <p className="eyebrow">THE DAILY EDIT</p>
            <h2>Your everyday essentials</h2>
            <p>Thoughtfully created products for a simple skincare routine.</p>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={addToCart} />
            ))}
          </div>
        </section>

        <section className="benefits-section">
          <h2>A little more care, every day.</h2>
          <div className="benefit-grid">
            <BenefitCard icon="/assets/clean-ingredients.svg" title="Clean Ingredients" description="Thoughtfully selected ingredients for your daily skincare ritual." />
            <BenefitCard icon="/assets/simple-routine.svg" title="Simple Routine" description="Easy-to-use products that fit naturally into everyday life." />
            <BenefitCard icon="/assets/everyday-glow.svg" title="Everyday Glow" description="Skincare that helps you feel comfortable and confident." />
          </div>
        </section>

        <section className="story-section" id="story">
          <img className="story-image" src="/assets/story.png" alt="Hands preparing a skincare ritual" />
          <div className="story-content">
            <p className="eyebrow">LESS, BUT BETTER</p>
            <h2>Beauty in<br />simplicity.</h2>
            <p className="story-description">At LUMI, we believe skincare should feel simple, personal and enjoyable. Our philosophy is built around thoughtful formulas, uncomplicated routines and the beauty of everyday self-care.</p>
            <Button variant="Outline" onClick={() => scrollToSection("newsletter")}>OUR PHILOSOPHY</Button>
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onQuantityChange={changeQuantity}
      />
    </div>
  );
}
