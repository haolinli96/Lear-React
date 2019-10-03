import React, { useEffect, useState } from 'react';
import 'rbx/index.css'; //import in react file need styling
import { Button, Container, Title, Message, Column, Card, Image, Content, Block } from 'rbx'; //and specify the components

import firebase from 'firebase/app';
import 'firebase/database';
import "firebase/auth";
import "firebase/firestore";
import 'firebase/auth';
import { ColumnGroup } from 'rbx/grid/columns/column-group';

//
const sizes = ['S', 'M', 'L', 'XL'];

const Banner = () => (
  <React.Fragment>
    <Title>{ 'Shopping Cart' }</Title>
  </React.Fragment>
);


const Product = ({ product }) => (
  <React.Fragment>
    <Column size="one-quarter"> 
      <Card textAlign={"centered"}>
        <Card.Header>
          <Card.Header.Title>{ product.title }</Card.Header.Title>
        </Card.Header>
        <Block>
          <Card.Image>
            <Image.Container as="p" size={'3by4'} >
              <Image src={`./data/products/${product.sku}_1.jpg`}/>
            </Image.Container>
          </Card.Image>
        </Block>
        <Block>
          <Card.Content>
            <Block>
              <Content size="medium">
                {product.currencyFormat} { product.price }
              </Content>
            </Block>
            <Block>
              <Content>
                  {product.description}
              </Content>
            </Block>
          </Card.Content>
        </Block>
        <Card.Footer>
          <Card.Footer.Item as="a" href="#">
            Add to cart
          </Card.Footer.Item>
        </Card.Footer>
      </Card>
    </Column>
  </React.Fragment>
);


const SizeSelector = () => (
  <Button.Group>
    { sizes.map(size =>
        <Button rounded key={size}
        >
          { size }
        </Button>
      ) 
    }
  </Button.Group>
);


const ProductList = ({ products }) => {
  return (
    <React.Fragment>
      <SizeSelector />
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