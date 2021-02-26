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

export type IVoucher = {
    id: string;
    code: string;
    type: 'percentual' | 'fixed' | 'shipping',
    amount: number,
    minValue?: number
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
    appliedVouchers: IVoucher[];
}

interface ICartProvider {
    loading: boolean;
    addToCart: (data: IAddToCartDTO) => void;
    myCart: IMyCart;
    allItemsOfApi: IProduct[];
    incrementIntem: (item_id: string) => void;
    decrementItem: (item_id: string) => void;
    addPromoteCode: (voucherCode: string) => void;
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
      appliedVouchers: [],
    };
  });
  const [allVoucher, setAllVoucher] = useState<IVoucher[]>(() => {
    const vounchers = localStorage.getItem('@codeminer42-shopping-vounchers');

    if (vounchers) {
      return JSON.parse(vounchers);
    }

    return [];
  });
  const [allItemsOfApi, setAllItemsOfApi] = useState<IProduct[]>(() => {
    const products = localStorage.getItem('@codeminer42-shopping-products');
    if (products) {
      return JSON.parse(products);
    }
    return [];
  });
  const [loading, setLoading] = useState<boolean>(false);

  const getForAllRegisterOfProducts = useCallback(async () => {
    try {
      const { data } = await baseURL.get('/products.json');

      setAllItemsOfApi(data.products);

      localStorage.setItem('@codeminer42-shopping-products', JSON.stringify(data.products));
    } catch (error) {
      console.log('error in request of products ', error);
    }

    setLoading(false);
  }, []);

  const getAllAvailableCoupons = useCallback(async () => {
    try {
      const { data } = await baseURL.get('/vouchers.json');

      setAllVoucher(data.vouchers);
      localStorage.setItem('@codeminer42-shopping-vounchers', JSON.stringify(data.vouchers));
    } catch (error) {
      console.log('erro when requesting the list of vounchers ', error);
    }
  }, []);

  //   const saveCartInLocalStorage = useCallback(() => {
  //     localStorage.setItem(keyLocalStorage, JSON.stringify(myCart));
  //   }, [myCart]);

  useEffect(() => {
    setLoading(true);
    getAllAvailableCoupons();
    getForAllRegisterOfProducts();
  }, [getForAllRegisterOfProducts, getAllAvailableCoupons]);

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
      const oldFreightPrice = myCart.infos.shipping;
      const calculedTotal = () => {
        if (subTotalOfCart >= 400) {
          return 0;
        }
        if (totalKilosInTheCart <= 10) {
          console.log(totalKilosInTheCart);
          return 30;
        }

        return Math.round(oldFreightPrice + (((totalKilosInTheCart - 10) / 5) * 7));
      };

      const existsVoucherAppliedForShipping = myCart.appliedVouchers.find((voucher) => voucher.type === 'shipping');

      if (!existsVoucherAppliedForShipping) {
        return calculedTotal();
      }
      if (existsVoucherAppliedForShipping) {
        if (subTotalOfCart >= Number(existsVoucherAppliedForShipping.minValue)) {
          return 0;
        }
      }
      return calculedTotal();
    };

    // calcular descontos
    const totalOfDiscounts = () => {
      const existsVoucher = myCart.appliedVouchers.find((voucher) => voucher.type !== 'shipping');

      if (existsVoucher) {
        switch (existsVoucher.type) {
          case 'fixed':
            return existsVoucher.amount;
          case 'percentual':
            return (subTotalOfCart - ((existsVoucher.amount * 100) * subTotalOfCart));
          default:
            return 0;
        }
      }

      return 0;
    };

    // console.log(myCart.appliedVouchers);

    const discounts = totalOfDiscounts();

    setMyCart((oldCart) => ({
      ...oldCart,
      infos: {
        discount: Math.round(discounts),
        subTotal: subTotalOfCart,
        total: Number((subTotalOfCart - discounts).toFixed(2)),
        shipping: totalOfShipping(),
      },
    }));
  }, [myCart]);

  useEffect(() => {
    UpdateCartInformation();
  }, [myCart.items, myCart.appliedVouchers]);

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

      UpdateCartInformation();
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

    UpdateCartInformation();
  }, [allItemsOfApi, myCart, UpdateCartInformation]);

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

    UpdateCartInformation();
  }, [myCart, allItemsOfApi, UpdateCartInformation]);

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

    UpdateCartInformation();
  }, [myCart, UpdateCartInformation]);

  const addPromoteCode = useCallback((voucherCode: string) => {
    if (!voucherCode) {
      alert('invalid vouncher!');
      return;
    }

    const voucherExists = allVoucher.find((voucher) => voucher.code === voucherCode);

    if (!voucherExists) {
      alert('Vouncher code not found!');
      return;
    }

    const voucherAlreadyApplied = myCart.appliedVouchers.find(
      (voucher) => voucher.code === voucherCode,
    );

    if (voucherAlreadyApplied) {
      alert('Voucher already applied!');
      return;
    }

    const vounchers = myCart.appliedVouchers;
    vounchers.push(voucherExists);
    setMyCart((oldCart) => ({
      ...oldCart,
      appliedVouchers: vounchers,
    }));

    UpdateCartInformation();
  }, [allVoucher, myCart.appliedVouchers, UpdateCartInformation]);

  return (
    <ICartContext.Provider value={{
      addToCart,
      loading,
      incrementIntem,
      myCart,
      addPromoteCode,
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
