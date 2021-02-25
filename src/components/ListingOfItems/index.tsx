import React from 'react';

import {
  ContainerItem,
  ContainerInfoItem,
  FakeImageItem,
  Item,
  ContainerButtons,
  Button,
} from './styles';

const products = [{
  id: 1, name: 'Banana', price: 10.0, quantity: 5,
}, {
  id: 2, name: 'Apple', price: 20.0, quantity: 2,
}, {
  id: 3, name: 'Orange', price: 30.0, quantity: 3,
}, {
  id: 4, name: 'Mango', price: 15.0, quantity: 3,
}];

const ListingOfItems: React.FC = () => (
  <>
    {products.map((item) => (
      <ContainerItem key={item.id}>
        <ContainerInfoItem>
          <FakeImageItem />
          <Item>
            <h3>{item.name}</h3>
            <h4>
              {' '}
              $
              {item.price}
              ,00
            </h4>
            <p>Total: $5</p>
          </Item>
        </ContainerInfoItem>
        <ContainerButtons>
          <Button>+</Button>
          <p>2</p>
          <Button>-</Button>
        </ContainerButtons>
      </ContainerItem>
    ))}
  </>
);

export default ListingOfItems;
