import React, { useMemo, useRef, useState, useEffect } from 'react';
import Catalog from './Catalog';
import AdminDashboard from './AdminDashboard';
import { MOCK_PRODUCTS } from './mocks/products';

const DEMO_MODE = true;
const STORAGE_KEY = 'agrumi.products.demo.v1';

function App() {
  const [view, setView] = useState('customer');
  const [weightStep, setWeightStep] = useState(2.5);

  const [products, setProducts] = useState(() => {
    if (!DEMO_MODE) return []; // in versione finale: riempirai da DB
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
    } catch {
      return MOCK_PRODUCTS;
    }
  });

  useEffect(() => {
    if (!DEMO_MODE) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const [cart, setCart] = useState([]);

  const addToCart = (newItem) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === newItem.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === newItem.id
            ? {
                ...item,
                weight: item.weight + newItem.weight,
                totalPrice: (parseFloat(item.totalPrice) + parseFloat(newItem.totalPrice)).toFixed(2),
              }
            : item
        );
      }
      return [...prevCart, newItem];
    });
  };

  const totalCartPrice = cart.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0).toFixed(2);
  const totalItems = cart.length;

  const rootRef = useRef(null);

  const scrollToCheckout = useMemo(() => {
    return () => {
      const scrollContainer = rootRef.current?.closest('.embedded-demo-frame');
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
        return;
      }
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };
  }, []);

  return (
    <div className="App agrumi-root" ref={rootRef}>
      <header style={styles.header}>
        <div style={styles.navLinks}>
          <button
            onClick={() => setView('customer')}
            style={view === 'customer' ? styles.activeTab : styles.tab}
          >
            🏠 Negozio
          </button>
          <button
            onClick={() => setView('admin')}
            style={view === 'admin' ? styles.activeTab : styles.tab}
          >
            ⚙️ Admin
          </button>
        </div>

        {view === 'customer' && (
          <button style={styles.cartSummary} onClick={scrollToCheckout}>
            🛒 {totalItems} art. | <strong>{totalCartPrice}€</strong>
          </button>
        )}
      </header>
      <main>
        {view === 'customer' ? (
          <Catalog
            products={products.filter(p => p.active)}
            weightStep={weightStep}
            cart={cart}
            onAddToCart={addToCart}
            onRemoveFromCart={(id) => setCart(prev => prev.filter(i => i.id !== id))}
          />
        ) : (
          <AdminDashboard
            products={products}
            setProducts={setProducts}
            weightStep={weightStep}
            setWeightStep={setWeightStep}
          />
        )}
      </main>
    </div>
  );
}

const styles = {
  header: {
    position: 'sticky', top: 0, height: '60px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '0 20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', zIndex: 1000,
    backdropFilter: 'blur(5px)',
    borderRadius: '20px',
    overflow: 'hidden'
  },
  navLinks: { display: 'flex', gap: '10px' },
  tab: { border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem', color: '#7f8c8d', display: 'flex', alignItems: 'center', gap: '6px' },
  activeTab: { border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem', color: '#e67e22', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' },
  cartSummary: { backgroundColor: '#fdf2e9', padding: '5px 15px', borderRadius: '20px', border: '1px solid #fad7bc', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', outline: 'none' }
};

export default App;