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

  //   function updateData() {}

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
    throw new Error('Incorrect implementation');
  }

  return context;
}

export { useCart, CartProvider };
