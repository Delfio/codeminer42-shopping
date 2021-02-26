/* eslint-disable no-debugger */
import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';

import baseURL from '../utils/api';

import { IProduct } from '../dtos/IProduct';

type IAddToCartDTO = {
    id: string;
    amount: number
}

type IInfoOfCart = {
    total: number;
    subTotal: number;
    shipping: number;
    discount: number;
}

export type IITemsInCart = {
    id: string;
    name: string;
    price: number;
    amount: number;
}

type IMyCart = {
    items: IITemsInCart[];
    infos: IInfoOfCart;
}

interface ICartProvider {
    loading: boolean;
    addToCart: (data: IAddToCartDTO) => void;
    myCart: IMyCart;
    allItemsOfApi: IProduct[];
    incrementIntem: (item_id: string) => void;
    decrementItem: (item_id: string) => void;
    // addPromoteCode: (promote_id: string) => void;
}

const ICartContext = createContext<ICartProvider>({} as ICartProvider);

const CartProvider: React.FC = ({ children }) => {
  const keyLocalStorage = '@codeminer42-shopping-cart';
  const [myCart, setMyCart] = useState<IMyCart>(() => {
    const cart = localStorage.getItem(keyLocalStorage);
    if (cart) {
      return JSON.parse(cart);
    }

    return {
      infos: {
        discount: 0,
        subTotal: 0,
        total: 0,
      },
      items: [],
    };
  });
  const [allItemsOfApi, setAllItemsOfApi] = useState<IProduct[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const getForAllRegisterOfProducts = useCallback(async () => {
    const { data } = await baseURL.get('/products.json');

    setAllItemsOfApi(data.products);

    setLoading(true);
  }, []);

  //   const saveCartInLocalStorage = useCallback(() => {
  //     localStorage.setItem(keyLocalStorage, JSON.stringify(myCart));
  //   }, [myCart]);

  useEffect(() => {
    setLoading(false);
    getForAllRegisterOfProducts();
  }, [getForAllRegisterOfProducts]);

  const UpdateCartInformation = useCallback(() => {
    // cart weight
    const totalKilosInTheCart = myCart.items
      .map((item) => (item.amount))
      .reduce((prev, curr) => (prev + curr), 0);

    // calculate subtotal
    const subTotalOfCart = myCart.items
      .map((item) => (item.amount * item.price))
      .reduce((prev, curr) => (prev + curr), 0);

    // calculate total freight
    const totalOfShipping = () => {
      if (subTotalOfCart >= 400) {
        return 0;
      }
      if (totalKilosInTheCart === 10) {
        return 30;
      }

      return Number((((totalKilosInTheCart - 5) / 10) * 7).toFixed(2));
    };

    setMyCart((oldCart) => ({
      ...oldCart,
      infos: {
        discount: 0,
        subTotal: subTotalOfCart,
        total: (subTotalOfCart - 0),
        shipping: totalOfShipping(),
      },
    }));
  }, [myCart]);

  useEffect(() => {
    UpdateCartInformation();
  }, [myCart.items]);

  const addToCart = useCallback((data: IAddToCartDTO) => {
    const selectedItem = allItemsOfApi?.find((item) => item.id === data.id);

    if (!selectedItem) {
      return;
    }

    if (myCart.items.length <= 0) {
      const newCart = ({
        ...myCart,
        items: [{
          ...selectedItem,
          amount: 1,
        }],
      });
      setMyCart(newCart);

      return;
    }

    const itemExists = myCart.items.find((item) => item.id === data.id);

    if (itemExists) {
      setMyCart((oldCart) => ({
        ...oldCart,
        items: oldCart.items.map((item) => {
          if (item.id === data.id) {
            return {
              ...item,
              amount: item.amount + 1,
            };
          }
          return item;
        }),
      }));
      return;
    }

    const allItems = myCart.items;

    allItems.push({
      ...selectedItem,
      amount: 1,
    });

    setMyCart((oldCart) => ({
      ...oldCart,
      items: allItems,
    }));
  }, [allItemsOfApi, myCart]);

  const incrementIntem = useCallback((itemid: string) => {
    const itemInCart = myCart.items.findIndex((item) => item.id === itemid);

    if (itemInCart >= 0) {
      const updatedItems = myCart.items;

      const item = updatedItems[itemInCart];

      const totalUnitsOfThisItem = allItemsOfApi!.find((itemOfApi) => itemOfApi.id === item.id);

      if (totalUnitsOfThisItem!.available <= updatedItems[itemInCart].amount) {
        alert('You cannot add more units of this item!');
        return;
      }

      updatedItems[itemInCart].amount += 1;
      setMyCart((oldCart) => ({
        ...oldCart,
        items: updatedItems,
      }));
    }
  }, [myCart, allItemsOfApi]);

  const decrementItem = useCallback((itemId: string) => {
    const itemInCart = myCart.items.findIndex((item) => item.id === itemId);

    const updatedItems = myCart.items;

    if (updatedItems[itemInCart].amount === 1) {
      updatedItems.splice(itemInCart, 1);
    } else {
      updatedItems[itemInCart].amount -= 1;
    }

    setMyCart((oldCart) => ({
      ...oldCart,
      items: updatedItems,
    }));
  }, [myCart]);

  return (
    <ICartContext.Provider value={{
      addToCart,
      loading,
      incrementIntem,
      myCart,
      decrementItem,
      allItemsOfApi: (allItemsOfApi as IProduct[]),
    }}
    >
      {children}
    </ICartContext.Provider>
  );
};

function useCart(): ICartProvider {
  const context = useContext(ICartContext);

  if (!context) {
    throw new Error('Incorrect implementation');
  }

  return context;
}

export { useCart, CartProvider };
