/* eslint-disable no-restricted-syntax */
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
    discount: number;
}

type IProdutoNoCarrinho = {
    id: string;
    name: string;
    price: number;
    amount: number;
}

type IMyCart = {
    items: IProdutoNoCarrinho[];
    infos: IInfoOfCart;
}

interface ICartProvider {
    loading: boolean;
    addToCart: (data: IAddToCartDTO) => void;
    myCart: IMyCart;
    allItemsOfApi: IProduct[];
}

const ICartContext = createContext<ICartProvider>({} as ICartProvider);

const CartProvider: React.FC = ({ children }) => {
  const [myCart, setMyCart] = useState<IMyCart>(() => {
    const cart = localStorage.getItem('@codeminer42-shopping-cart');
    if (cart) {
      return JSON.parse(cart);
    }

    return {} as IMyCart;
  });
  const [allItemsOfApi, setAllItemsOfApi] = useState<IProduct[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const getForAllRegisterOfProducts = useCallback(async () => {
    const { data } = await baseURL.get('/products.json');

    setAllItemsOfApi(data.products);

    setLoading(true);
  }, []);

  useEffect(() => {
    setLoading(false);
    getForAllRegisterOfProducts();
  }, [getForAllRegisterOfProducts]);

  //   function updateData() {}

  const addToCart = useCallback((data: IAddToCartDTO) => {
    const selectedItem = allItemsOfApi?.filter((item) => item.id === data.id);

    if (!selectedItem) {
      return;
    }
    const newItemList: IProdutoNoCarrinho[] = [];

    // incrementando os items novos e adiconando os que não existem
    for (const item of selectedItem) {
      if (!item) break;

      const itemIsAlreadyInCart = myCart.items.find(
        (itemAA) => itemAA.id === item.id,
      );

      if (itemIsAlreadyInCart) {
        newItemList.push({
          ...itemIsAlreadyInCart,
          amount: (itemIsAlreadyInCart.amount + data.amount),
        });
      } else {
        newItemList.push({
          ...item,
          amount: data.amount,
        });
      }
    }

    const novosItems = myCart.items.map((itemOfCart) => {
      const itemSubstituido = newItemList.find((item) => item.id === itemOfCart.id);

      if (itemSubstituido) {
        return itemSubstituido;
      }

      return itemOfCart;
    });

    setMyCart((oldCart) => ({
      ...oldCart,
      items: novosItems,
    }));
  }, [allItemsOfApi, myCart.items]);

  return (
    <ICartContext.Provider value={{
      addToCart,
      loading,
      myCart,
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
    throw new Error('asdfsd');
  }

  return context;
}

export { useCart, CartProvider };
