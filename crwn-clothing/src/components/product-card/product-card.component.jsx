import './product-card.style.scss';
import { useState, useContext } from 'react';
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../firebase/firebase.utils.js'

import Button from '../button/button.component'
import { CartContext } from '../../contexts/cart.context'

const ProductCard = ({product}) => {
  const { name, price, imageUrl } = product
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product)
  
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>Add to card</Button>
    </div>
  );
};

export default ProductCard;