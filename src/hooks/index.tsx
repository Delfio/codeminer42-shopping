import React from 'react';
import { CartProvider } from './Cart';

// import { Container } from './styles';

const hooks: React.FC = ({ children }) => (
  <CartProvider>
    {children}
  </CartProvider>

);

export default hooks;
