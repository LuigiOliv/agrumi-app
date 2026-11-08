import React, { useState } from 'react';
import ProductCard from './ProductCard';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Arance Navel',
    pricePerKg: 1.20,
    image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=500&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Limoni Primofiore',
    pricePerKg: 1.80,
    image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=500&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Pompelmi Rosa',
    pricePerKg: 2.00,
    image: 'https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?w=500&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Mandarini Dolci',
    pricePerKg: 1.50,
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a96946b0?w=500&auto=format&fit=crop'
  },
];

// Stili definiti PRIMA del componente
const styles = {
  mainContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  title: {
    color: '#e67e22',
    fontSize: '2.5rem',
    marginBottom: '10px'
  },
  subtitle: {
    color: '#7f8c8d',
    marginBottom: '40px',
    fontSize: '1.2rem'
  },
  grid: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  cartContainer: {
    marginTop: '50px',
    backgroundColor: '#fff9f4',
    padding: '30px',
    borderRadius: '15px',
    border: '1px solid #ffe0b2'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#d35400'
  },
  finalPrice: {
    color: '#27ae60'
  },
  orderBtn: {
    width: '100%',
    marginTop: '20px',
    padding: '15px',
    background: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#e74c3c',
    cursor: 'pointer',
    fontSize: '1rem'
  }
};

const Catalog = ({ products, weightStep, cart, onAddToCart, onRemoveFromCart }) => {
  // Rimuovi la const MOCK_PRODUCTS e usa products dalla prop

  return (
    <div style={styles.mainContainer}>
      <h1 style={styles.title}>🍋 AgrumiAmo 🍊</h1>
      <p style={styles.subtitle}>Dal giardino di Ivan, direttamente a casa tua.</p>

      <div style={styles.grid}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {cart.length > 0 && (
        <div style={styles.cartContainer}>
          <h3 style={{ borderBottom: '2px solid #e67e22', paddingBottom: '10px' }}>
            🛒 Riepilogo il tuo Ordine
          </h3>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: '#7f8c8d' }}>
                <th>Prodotto</th>
                <th>Quantità</th>
                <th style={{ textAlign: 'right' }}>Prezzo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={`${item.id}-${index}`} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '10px 0' }}>{item.name}</td>
                  <td><strong>{item.weight} kg</strong></td>
                  <td style={{ textAlign: 'right' }}>{item.totalPrice}€</td>
                  <td style={{ textAlign: 'right' }}>
                    <button onClick={() => onRemoveFromCart(item.id)} style={styles.removeBtn}>
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.totalRow}>
            <span>TOTALE ORDINE:</span>
            <span style={styles.finalPrice}>
              {cart.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0).toFixed(2)}€
            </span>
          </div>

          <button
            style={styles.orderBtn}
            onClick={() => alert("Richiesta inviata! L'admin ti contatterà.")}
          >
            Conferma e Invia Ordine
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalog;