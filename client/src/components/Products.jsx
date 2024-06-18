import React, { useEffect } from 'react';
import styled from 'styled-components';
import { categories, popularProducts } from '../data';
import Product from './Product';
import { mobile } from '../responsive';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${mobile({ padding: '0' })}

`;



const Products = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
   
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `http://localhost:5000/api/products?category=${category}`
            : 'http://localhost:5000/api/products'
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }

    }
  }, [category]);

  useEffect(() => {
    category && setFilterProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
  }, [products, filters]);

  return (
    <Container>
      {popularProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
