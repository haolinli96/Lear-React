import React, { useEffect, useState } from 'react';
import 'rbx/index.css'; //import in react file need styling
import { Button, Container, Title, Message, Column, Card, Image, Content } from 'rbx'; //and specify the components

import firebase from 'firebase/app';
import 'firebase/database';
import "firebase/auth";
import "firebase/firestore";
import 'firebase/auth';
import { ColumnGroup } from 'rbx/grid/columns/column-group';

//
const Banner = () => (
  <React.Fragment>
    <Title>{ 'Shopping Cart' }</Title>
  </React.Fragment>
);



const Product = ({ product }) => (
  <React.Fragment>
    <Column size="one-quarter"> 
      <Card>
        <Card.Image>
          <Image.Container size={64} >
            <Image src={`./data/products/${product.sku}_2.jpg`}/>
          </Image.Container>
        </Card.Image>
        <Card.Content>
          <Content>
            { product.title }
          </Content>
        </Card.Content>
      </Card>
    </Column>
  </React.Fragment>
);

const ProductList = ({ products }) => {
  return (
    <React.Fragment>
      <Column.Group multiline >
        { products.map(product =>
          <Product key={ product.sku } product={ product } 
          />) }
      </Column.Group>
    </React.Fragment>
  );
};

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <Banner />
      <ProductList products={ products }/>
    </Container>
  );
};
// {products.map(product => <li key={product.sku}>{product.title}</li>)}
export default App;