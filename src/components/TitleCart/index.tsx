import React from 'react';
import { useCart } from '../../hooks/Cart';

import {
  Container,
} from './styles';

const TitleCart: React.FC = () => {
  const { myCart } = useCart();
  return (
    <Container>
      <div>
        <h2>Your Cart</h2>
        <strong>
          {myCart.items.length}
          {' '}
          items
        </strong>
      </div>
    </Container>
  );
};

export default TitleCart;
