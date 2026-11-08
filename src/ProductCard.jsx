import React, { useState } from 'react';

const STEP = 2.5;

const ProductCard = ({ product, onAddToCart }) => {
  const [weight, setWeight] = useState(STEP);

  const increment = () => setWeight(prev => prev + STEP);
  const decrement = () => setWeight(prev => (prev > STEP ? prev - STEP : STEP));

  const totalPrice = (weight * product.pricePerKg).toFixed(2);

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img src={product.image} alt={product.name} style={styles.image} />
        <div style={styles.priceTag}>{product.pricePerKg.toFixed(2)}€ / kg</div>
      </div>

      <h3 style={styles.productName}>{product.name}</h3>

      {/* Selettore Quantità */}
      <div style={styles.controlsContainer}>
        <p style={{ margin: '0 0 10px 0', color: '#7f8c8d', fontSize: '0.9rem' }}>Scegli la quantità (a scatti di 2.5kg):</p>
        <div style={styles.controls}>
          <button onClick={decrement} style={{ ...styles.btn, ...styles.btnQty }}>-</button>
          <span style={styles.weightText}>{weight.toFixed(1)} kg</span>
          <button onClick={increment} style={{ ...styles.btn, ...styles.btnQty }}>+</button>
        </div>
      </div>

      <div style={styles.totalContainer}>
        <span>Totale:</span>
        <span style={styles.totalPrice}>{totalPrice}€</span>
      </div>

      <button
        onClick={() => onAddToCart({ ...product, weight, totalPrice })}
        style={styles.addBtn}
      >
        Aggiungi al Cesto
      </button>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '20px',
    textAlign: 'center',
    width: '280px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s', // Predisposizione per animazioni future
    border: '1px solid #f0f0f0'
  },
  imageContainer: {
    position: 'relative',
    marginBottom: '15px'
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '12px'
  },
  priceTag: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    backgroundColor: 'rgba(46, 204, 113, 0.9)', // Verde fresco
    color: 'white',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 'bold'
  },
  productName: {
    margin: '10px 0',
    color: '#2c3e50',
    fontSize: '1.4rem'
  },
  controlsContainer: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '10px',
    margin: '15px 0'
  },
  controls: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  btn: {
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    width: '40px', height: '40px',
    borderRadius: '50%', // Bottoni rotondi
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'background-color 0.2s'
  },
  btnQty: {
    backgroundColor: '#ecf0f1',
    color: '#2c3e50',
  },
  weightText: { margin: '0 15px', fontWeight: 'bold', fontSize: '1.3rem', color: '#2c3e50', minWidth: '70px' },
  totalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '0 10px'
  },
  totalPrice: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: '#e67e22' // Arancione
  },
  addBtn: {
    // Gradiente arancione per il tasto d'acquisto
    background: 'linear-gradient(to right, #f39c12, #d35400)',
    color: 'white',
    border: 'none',
    padding: '15px',
    borderRadius: '30px', // Bottone stondato
    cursor: 'pointer',
    width: '100%',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    boxShadow: '0 4px 10px rgba(243, 156, 18, 0.4)'
  }
};

export default ProductCard;