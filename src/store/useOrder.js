import { useContext } from 'react';
import OrderContext from './orderContext';

export const useOrders = () => {
  return useContext(OrderContext);
};