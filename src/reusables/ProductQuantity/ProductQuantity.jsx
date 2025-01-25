import { useState, useEffect } from 'react';
import supabase from '../../config/superbaseClient'

const ProductQuantity = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const productLength = products.length;
  return { productLength, loading, products };
};

export default ProductQuantity;
