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
        <p>
          $
          {myCart.infos.subTotal}
          ,00
        </p>
      </CointainerInformationsOfCart>
      <CointainerInformationsOfCart>
        <p>Shipping</p>
        <p>
          $
          {myCart.infos.shipping}
          ,00
        </p>
      </CointainerInformationsOfCart>
      <CointainerInformationsOfCart>
        <p>Discount</p>
        <p>
          $
          {myCart.infos.discount}
          ,00
        </p>
      </CointainerInformationsOfCart>
      <CointainerInformationsOfCart>
        <strong>Total</strong>
        <strong>
          $
          {myCart.infos.total}
          ,00
        </strong>
      </CointainerInformationsOfCart>

    </Container>
  );
};

export default CartInformation;
