import React from 'react';
import ListOfItems from '../ListingOfItems';
import { useCart } from '../../hooks/Cart';

import {
  Container,
  ContainerCupom,
  CointainerInformationsOfCart,
} from './styles';

const CartInformation: React.FC = () => {
  const { myCart } = useCart();
  return (
    <Container>
      <ListOfItems items={myCart.items} />
      <ContainerCupom>
        <input placeholder="insert your promotion code" type="text" />
        <button type="button"> Apply </button>
      </ContainerCupom>
      <CointainerInformationsOfCart>
        <p>Subtotal</p>
        <p>50</p>
      </CointainerInformationsOfCart>
      <CointainerInformationsOfCart>
        <p>Subtotal</p>
        <p>50</p>
      </CointainerInformationsOfCart>
      <CointainerInformationsOfCart>
        <p>Subtotal</p>
        <p>50</p>
      </CointainerInformationsOfCart>
      <CointainerInformationsOfCart>
        <p>Subtotal</p>
        <p>50</p>
      </CointainerInformationsOfCart>

    </Container>
  );
};

export default CartInformation;
