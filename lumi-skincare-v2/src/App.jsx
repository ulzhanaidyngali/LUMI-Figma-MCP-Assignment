import { useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";

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

const benefits = [
  {
    id: "clean-ingredients",
    icon: "/assets/clean-ingredients.svg",
    title: "Clean Ingredients",
    description: "Thoughtfully selected ingredients for your daily skincare ritual.",
  },
  {
    id: "simple-routine",
    icon: "/assets/simple-routine.svg",
    title: "Simple Routine",
    description: "Easy-to-use products that fit naturally into everyday life.",
  },
  {
    id: "everyday-glow",
    icon: "/assets/everyday-glow.svg",
    title: "Everyday Glow",
    description: "Skincare that helps you feel comfortable and confident.",
  },
];

function Button({
  children,
  variant = "Primary",
  type = "button",
  className = "",
  disabled = false,
  onClick,
}) {
  const variantClass = variant === "Outline" ? "button--outline" : "button--primary";

  return (
    <button
      className={`button ${variantClass} ${className}`.trim()}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function NavigationLink({ children, href, className = "" }) {
  return (
    <a className={`navigation-link ${className}`.trim()} href={href}>
      {children}
    </a>
  );
}

function HeaderLogo() {
  return (
    <a className="header-logo" href="#home" aria-label="LUMI Skincare Studio home">
      <span className="header-logo__wordmark">LUMI</span>
      <span className="header-logo__tagline">SKINCARE STUDIO</span>
    </a>
  );
}

function CartButton({ cartCount, onOpen }) {
  return (
    <div className="cart-button">
      <button
        className="cart-button__icon"
        type="button"
        onClick={onOpen}
        aria-label={`Open shopping bag, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
      >
        <img src="/assets/shopping-bag.svg" alt="" />
      </button>
      <Button variant="Outline" className="cart-button__label" onClick={onOpen}>
        Bag
      </Button>
      <span className="cart-button__count" aria-live="polite">
        {cartCount}
      </span>
    </div>
  );
}

function HeaderActions({ cartCount, onOpenCart }) {
  return (
    <div className="header-actions">
      <CartButton cartCount={cartCount} onOpen={onOpenCart} />
      <Button onClick={() => document.getElementById("products")?.scrollIntoView()}>
        Shop Now
      </Button>
    </div>
  );
}

function Header({ cartCount, onOpenCart }) {
  return (
    <header className="site-header" id="home">
      <HeaderLogo />
      <nav className="header-navigation" aria-label="Main navigation">
        <NavigationLink href="#home">Home</NavigationLink>
        <NavigationLink href="#products">Products</NavigationLink>
        <NavigationLink href="#story">About</NavigationLink>
        <NavigationLink href="#footer">Contact</NavigationLink>
      </nav>
      <HeaderActions cartCount={cartCount} onOpenCart={onOpenCart} />
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">YOUR DAILY SKINCARE RITUAL</p>
        <h1 className="hero-title" id="hero-title">
          <span>Your skin,</span>
          <span>your natural</span>
          <span>glow.</span>
        </h1>
        <p className="hero-description">
          Discover simple, effective skincare designed to make you feel confident in your own skin.
        </p>
        <div className="hero-actions">
          <Button onClick={() => document.getElementById("products")?.scrollIntoView()}>
            SHOP COLLECTION
          </Button>
          <Button
            variant="Outline"
            onClick={() => document.getElementById("story")?.scrollIntoView()}
          >
            DISCOVER OUR STORY
          </Button>
        </div>
        <p className="hero-trust">
          Clean ingredients. Thoughtful formulas.
          <br />
          Everyday confidence.
        </p>
      </div>
      <img
        className="hero-image"
        src="/assets/hero.png"
        alt="LUMI skincare products with botanical ingredients"
      />
    </section>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-card__image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-card__details">
        <p className="product-card__category">{product.category}</p>
        <div className="product-card__title-row">
          <h3>{product.name}</h3>
          <span>${product.price}</span>
        </div>
        <p className="product-card__description">{product.description}</p>
        <Button
          variant="Outline"
          className="product-card__add"
          onClick={() => onAdd(product)}
        >
          Add to Cart
        </Button>
      </div>
    </article>
  );
}

function ProductsSection({ onAdd }) {
  return (
    <section className="products-section" id="products" aria-labelledby="products-title">
      <div className="products-heading">
        <p className="eyebrow">THE DAILY EDIT</p>
        <h2 id="products-title">Your everyday essentials</h2>
        <p>Thoughtfully created products for a simple skincare routine.</p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}

function BenefitCard({ benefit }) {
  return (
    <article className="benefit-card">
      <img className="benefit-card__icon" src={benefit.icon} alt="" />
      <h3>{benefit.title}</h3>
      <p>{benefit.description}</p>
    </article>
  );
}

function BenefitsSection() {
  return (
    <section className="benefits-section" aria-labelledby="benefits-title">
      <h2 id="benefits-title">A little more care, every day.</h2>
      <div className="benefits-grid">
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </div>
    </section>
  );
}

function BrandStorySection() {
  return (
    <section className="brand-story-section" id="story" aria-labelledby="story-title">
      <img
        className="brand-story-image"
        src="/assets/story.png"
        alt="Hands preparing a LUMI skincare ritual"
      />
      <div className="brand-story-content">
        <p className="eyebrow">LESS, BUT BETTER</p>
        <h2 id="story-title">
          Beauty in
          <br />
          simplicity.
        </h2>
        <p>
          At LUMI, we believe skincare should feel simple, personal and enjoyable. Our philosophy is
          built around thoughtful formulas, uncomplicated routines and the beauty of everyday
          self-care.
        </p>
        <Button
          variant="Outline"
          onClick={() => document.getElementById("newsletter")?.scrollIntoView()}
        >
          OUR PHILOSOPHY
        </Button>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ kind: "note", message: "A thoughtful note, every so often. Unsubscribe anytime." });

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus({ kind: "error", message: "Please enter a valid email address." });
      return;
    }

    setEmail(trimmedEmail);
    setStatus({ kind: "success", message: "Thank you. A little glow is on its way." });
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
    if (status.kind !== "note") {
      setStatus({ kind: "note", message: "A thoughtful note, every so often. Unsubscribe anytime." });
    }
  }

  return (
    <section className="newsletter-section" id="newsletter" aria-labelledby="newsletter-title">
      <h2 id="newsletter-title">A little glow in your inbox.</h2>
      <p className="newsletter-description">
        Subscribe to receive skincare tips, new arrivals and exclusive offers.
      </p>
      <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
        <label className="visually-hidden" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Your email address"
          aria-invalid={status.kind === "error"}
          aria-describedby="newsletter-status"
          autoComplete="email"
        />
        <Button type="submit">Subscribe</Button>
      </form>
      <p
        className={`newsletter-status newsletter-status--${status.kind}`}
        id="newsletter-status"
        role={status.kind === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {status.message}
      </p>
    </section>
  );
}

function FooterLinkGroup({ group }) {
  if (group === "Contact") {
    return (
      <div className="footer-link-group footer-link-group--contact">
        <p className="footer-label">LET’S STAY IN TOUCH</p>
        <a href="mailto:hello@lumiskincare.studio">hello@lumiskincare.studio</a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          Instagram ↗
        </a>
      </div>
    );
  }

  return (
    <nav className="footer-link-group footer-link-group--navigation" aria-label="Footer navigation">
      <p className="footer-label">EXPLORE LUMI</p>
      <NavigationLink href="#products" className="footer-navigation-link">
        Products
      </NavigationLink>
      <NavigationLink href="#story" className="footer-navigation-link">
        About
      </NavigationLink>
      <NavigationLink href="#footer" className="footer-navigation-link">
        Contact
      </NavigationLink>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <span className="footer-brand__wordmark">LUMI</span>
          <p>
            Thoughtful skincare. Simple rituals.
            <br />A little more you, every day.
          </p>
        </div>
        <FooterLinkGroup group="Navigation" />
        <FooterLinkGroup group="Contact" />
      </div>
      <div className="footer-bottom">
        <p>© 2026 LUMI Skincare Studio</p>
        <p>Made for your everyday glow.</p>
      </div>
    </footer>
  );
}

function CartItem({ item, onQuantityChange, onRemove }) {
  return (
    <article className="cart-item">
      <img src={item.image} alt="" />
      <div className="cart-item__details">
        <h3>{item.name}</h3>
        <p>${item.price}</p>
        <div className="quantity-controls" aria-label={`Quantity for ${item.name}`}>
          <button
            type="button"
            onClick={() => onQuantityChange(item.id, -1)}
            aria-label={`Decrease ${item.name} quantity`}
          >
            −
          </button>
          <span aria-live="polite">{item.quantity}</span>
          <button
            type="button"
            onClick={() => onQuantityChange(item.id, 1)}
            aria-label={`Increase ${item.name} quantity`}
          >
            +
          </button>
        </div>
      </div>
      <button
        className="cart-item__remove"
        type="button"
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.name} from bag`}
      >
        Remove
      </button>
    </article>
  );
}

function CartDrawer({ open, onClose, cart, onQuantityChange, onRemove }) {
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  );

  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    previouslyFocusedRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onCloseRef.current();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [open]);

  return (
    <div className={`cart-layer${open ? " cart-layer--open" : ""}`} aria-hidden={!open}>
      <button
        className="cart-backdrop"
        type="button"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        aria-label="Close shopping bag"
      />
      <aside
        className={`cart-drawer${open ? " cart-drawer--open" : ""}`}
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-hidden={!open}
        aria-labelledby="cart-title"
      >
        <div className="cart-header">
          <h2 id="cart-title">Your bag</h2>
          <button
            ref={closeButtonRef}
            className="cart-close"
            type="button"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            aria-label="Close shopping bag"
          >
            ×
          </button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="cart-empty">Your bag is empty.</p>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={onQuantityChange}
                onRemove={onRemove}
              />
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-subtotal">
            <span>Subtotal</span>
            <strong>${subtotal}</strong>
          </div>
          <Button className="checkout-button" disabled={cart.length === 0}>
            Checkout
          </Button>
        </div>
      </aside>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  function addToCart(product) {
    setCart((currentCart) => {
      const existingProduct = currentCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function changeQuantity(productId, amount) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + amount } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(productId) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  }

  return (
    <div className="landing-page">
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <main>
        <HeroSection />
        <ProductsSection onAdd={addToCart} />
        <BenefitsSection />
        <BrandStorySection />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onQuantityChange={changeQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}
