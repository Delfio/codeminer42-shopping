import React from 'react';
import { Grid } from './styles';
import ItemList from '../ItemListing';
import ItemListHeader from '../ItemListHeader';
import TitleCart from '../TitleCart';
import CartInformation from '../CartInformation';

const Layout: React.FC = () => (
  <Grid>
    <ItemListHeader />
    <ItemList />
    <TitleCart />
    <CartInformation />
  </Grid>
);

export default Layout;
