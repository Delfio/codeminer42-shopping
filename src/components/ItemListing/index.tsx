import React, { useCallback } from 'react';

import {
  Container, Title, ContainerBotom,
} from './styles';

import { useCart } from '../../hooks/Cart';
import { IProduct } from '../../dtos/IProduct';

const items = {
  products: [{
    id: 1, name: 'Banana', price: 10.0, available: 10,
  }, {
    id: 2, name: 'Apple', price: 20.0, available: 15,
  }, {
    id: 3, name: 'Orange', price: 30.0, available: 8,
  }, {
    id: 4, name: 'Mango', price: 15.0, available: 20,
  }, {
    id: 5, name: 'Mango', price: 15.0, available: 20,
  }, {
    id: 6, name: 'Mango', price: 15.0, available: 20,
  }],
};

const ItemListing: React.FC = () => {
  const {
    allItemsOfApi,
    addToCart,
  } = useCart();

  const addItemToCart = useCallback((data: IProduct) => {
    addToCart({
      amount: 1,
      id: data.id,
    });
  }, [addToCart]);

  return (
    (
      <Container>
        {allItemsOfApi.map((product) => (
          <li key={product.id}>
            <Title>
              <strong>{product.name}</strong>
            </Title>
            <ContainerBotom>
              <div>
                <p>
                  $
                  {' '}
                  {product.price}
                  ,00
                </p>
                <p>
                  Available:
                  {' '}
                  {product.available}
                </p>

              </div>
              <button type="button" onClick={() => addItemToCart(product)}>
                <span>
                  Add to cart
                </span>
              </button>

            </ContainerBotom>
          </li>
        ))}
      </Container>

    )
  );
};

export default ItemListing;
