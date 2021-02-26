import React, { useCallback } from 'react';
import { IITemsInCart, useCart } from '../../hooks/Cart';

import {
  ContainerItem,
  ContainerInfoItem,
  FakeImageItem,
  Item,
  ContainerButtons,
  Button,
} from './styles';

type IListOfItemsInTheCarProps = {
    items: IITemsInCart[]
}

const ListingOfItems: React.FC<IListOfItemsInTheCarProps> = ({ items }) => {
  const {
    incrementIntem,
    decrementItem,
  } = useCart();
  const formatTotal = useCallback((item: IITemsInCart) => (item.amount * item.price), []);
  return (
    <>
      {items.map((item) => (
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
              <p>
                Total: $
                {' '}
                {formatTotal(item)}
                ,00
              </p>
            </Item>
          </ContainerInfoItem>
          <ContainerButtons>
            <Button onClick={() => incrementIntem(item.id)}>+</Button>
            <p>{item.amount}</p>
            <Button onClick={() => decrementItem(item.id)}>-</Button>
          </ContainerButtons>
        </ContainerItem>
      ))}
    </>
  );
};

export default ListingOfItems;
