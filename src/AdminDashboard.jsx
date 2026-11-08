import React, { useState } from 'react';

const AdminDashboard = ({ products, setProducts, weightStep, setWeightStep }) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("✅ Modifiche salvate!");
    }, 500);
  };

  const updateProduct = (id, field, value) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const deleteProduct = (id) => {
    if (window.confirm("Eliminare questo prodotto?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div style={styles.container}>
      {/* Barra Azioni Rapide */}
      <div style={styles.topBar}>
        <h3 style={{ margin: 0 }}>⚙️ Gestione</h3>
        <div style={styles.globalActions}>
          <div style={styles.stepBox}>
            <label style={{ fontSize: '0.8rem' }}>Passo kg: </label>
            <input type="number" step="0.5" value={weightStep} onChange={(e) => setWeightStep(parseFloat(e.target.value))} style={styles.miniInput} />
          </div>
          <button onClick={() => setProducts([...products, { id: Date.now(), name: '', pricePerKg: 0, image: '', active: true }])} style={styles.addBtn}>+ Nuovo</button>
          <button onClick={handleSave} style={styles.saveBtn} disabled={isSaving}>{isSaving ? "..." : "💾 Salva"}</button>
        </div>
      </div>

      {/* Tabella Prodotti */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Nome Prodotto</th>
              <th style={styles.th}>Prezzo (€/kg)</th>
              <th style={styles.th}>URL Immagine (opz)</th>
              <th style={styles.th}>Stato</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{ ...styles.tr, opacity: p.active ? 1 : 0.6 }}>
                <td style={styles.td}>
                  <input type="text" value={p.name} onChange={(e) => updateProduct(p.id, 'name', e.target.value)} style={styles.tableInput} placeholder="Es: Limoni" />
                </td>
                <td style={styles.td}>
                  <input type="number" value={p.pricePerKg} onChange={(e) => updateProduct(p.id, 'pricePerKg', parseFloat(e.target.value))} style={{ ...styles.tableInput, width: '60px' }} />
                </td>
                <td style={styles.td}>
                  <input type="text" value={p.image} onChange={(e) => updateProduct(p.id, 'image', e.target.value)} style={styles.tableInput} placeholder="http://..." />
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => updateProduct(p.id, 'active', !p.active)}
                    style={{ ...styles.miniStatus, backgroundColor: p.active ? '#2ecc71' : '#bdc3c7' }}
                  >
                    {p.active ? "ON" : "OFF"}
                  </button>
                </td>
                <td style={styles.td}>
                  <button onClick={() => deleteProduct(p.id)} style={styles.delBtn}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: 'white', padding: '15px', borderRadius: '12px', maxWidth: '800px', margin: '0 auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' },
  globalActions: { display: 'flex', gap: '10px', alignItems: 'center' },
  stepBox: { backgroundColor: '#f8f9fa', padding: '4px 8px', borderRadius: '6px', border: '1px solid #ddd' },
  miniInput: { width: '45px', border: '1px solid #ccc', borderRadius: '4px', marginLeft: '5px', padding: '2px' },
  addBtn: { backgroundColor: '#3498db', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' },
  saveBtn: { backgroundColor: '#e67e22', color: 'white', border: 'none', padding: '6px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' },
  headerRow: { backgroundColor: '#f4f4f4', textAlign: 'left' },
  th: { padding: '10px', color: '#666', fontWeight: '600', borderBottom: '2px solid #ddd' },
  tr: { borderBottom: '1px solid #eee' },
  td: { padding: '8px' },
  tableInput: { width: '100%', padding: '6px', border: '1px solid #eee', borderRadius: '4px', outline: 'none' },
  miniStatus: { border: 'none', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 'bold', width: '40px' },
  delBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }
};

export default AdminDashboard;