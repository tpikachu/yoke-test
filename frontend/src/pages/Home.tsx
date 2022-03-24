import { SimpleGrid } from '@chakra-ui/react';
import React from 'react'
import Header from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import useFetch from '../hooks/useFetch'
import { Product } from '../models';
import { Endpoints } from '../utils/constants';

const Home = () => {
  const { data } = useFetch<Product[]>(Endpoints.getProducts)
  return (
    <div>
      <Header />
      <SimpleGrid columns={[1, 2, 3]} mt={6} spacing={3}>
        {data && data.map((item) => (
          <ProductCard
            key={item._id}
            productId={item._id}
            productName={item.productName}
            price={item.price}
            quantity={item.quantity}
          />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Home;