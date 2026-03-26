import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, minPrice }) => {
  const previewImage = product.colors[0]?.images[0];

  return (
    <div className="product-card" style={{ border: '1px solid #eee', padding: '10px', borderRadius: '8px' }}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img 
          src={previewImage} 
          alt={product.name} 
          style={{ width: '100%', height: '200px', objectFit: 'contain' }} 
        />
        <h3>{product.name}</h3>
        <p>от {minPrice.toFixed(2)} руб.</p>
        <div style={{ display: 'flex', gap: '5px' }}>
          {product.colors.map(c => (
             <span key={c.id} title={c.name} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: translateColor(c.name), border: '1px solid #ccc' }} />
          ))}
        </div>
      </Link>
    </div>
  );
};

const translateColor = (name) => {
  const colors = {
    "черный": "#000",
    "белый": "#fff",
    "серый": "#808080",
    "желтый": "#ffff00",
    "синий": "#0000ff",
    "бежевый": "#f5f5dc",
    "хаки": "#bdb76b",
    "графит": "#383838"
  };
  return colors[name] || '#ccc';
};

export default ProductCard;