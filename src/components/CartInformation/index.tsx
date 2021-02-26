import React, { useState } from 'react';
import ListOfItems from '../ListingOfItems';
import { useCart } from '../../hooks/Cart';

import {
  Container,
  ContainerCupom,
  CointainerInformationsOfCart,
  ButtonCheckout,
} from './styles';

const CartInformation: React.FC = () => {
  const [cuppon, setCuppon] = useState('');
  const { myCart, addPromoteCode, checkout } = useCart();
  return (
    <Container>
      <ListOfItems items={myCart.items} />
      <ContainerCupom>
        <input onChange={(e) => setCuppon(e.target.value)} placeholder="insert your promotion code" type="text" />
        <button type="button" onClick={() => addPromoteCode(cuppon)}> Apply </button>
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
          {myCart.infos.shipping >= 0 ? `$${myCart.infos.shipping},00` : 'FREE'}
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
      <ButtonCheckout onClick={checkout}>
        <strong>Checkout</strong>
      </ButtonCheckout>
    </Container>
  );
};

export default CartInformation;
