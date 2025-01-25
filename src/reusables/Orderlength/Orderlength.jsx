import { useState, useEffect } from 'react';
import supabase from '../../config/superbaseClient'
  

const Orderlength = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const {data,error} = await supabase.from('orders').select('*');
      if (error) 
      {
        console.error('Error fetching products:',error);
      } 
      else 
      {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const orderLength = orders.length;
  return {orderLength}
 
};

export default Orderlength;


