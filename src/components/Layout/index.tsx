import React from 'react';
import { Grid } from './styles';
import ItemList from '../ItemListing';
import ItemListHeader from '../ItemListHeader';
import TitleCart from '../TitleCart';
import CartInformation from '../CartInformation';
import { useCart } from '../../hooks/Cart';

const Layout: React.FC = () => {
  const {
    loading,
  } = useCart();

  if (!loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
      }}
      >
        <h1>loading...</h1>
      </div>
    );
  }
  return (
    <Grid>
      <ItemListHeader />
      <ItemList />
      <TitleCart />
      <CartInformation />
    </Grid>
  );
};

export default Layout;
