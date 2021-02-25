import React from 'react';
import ListOfItems from '../ListingOfItems';

import {
  Container,
  ContainerCupom,
  CointainerInformationsOfCart,
} from './styles';

const CartInformation: React.FC = () => (
  <Container>
    <ListOfItems />
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

export default CartInformation;
