import React from 'react';

import {
  Container, Title, ContainerBotom,
} from './styles';

type ProductInfo = {
    id: number;
    name: string;
    price: number;
    available: number;
}

type ItemListingProps = {
    products: ProductInfo[]
}

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

const ItemListing: React.FC = () => (
  <Container>
    {items.products.map((product) => (
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
          <button type="button">
            <span>
              Add to cart
            </span>
          </button>

        </ContainerBotom>
      </li>
    ))}
  </Container>

);

export default ItemListing;
