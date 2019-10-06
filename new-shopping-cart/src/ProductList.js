import React, { useState } from 'react'
import { Button, Grid, Card, Image } from 'semantic-ui-react'
import Product from './Product'

const sizes = ['S', 'M', 'L', 'XL'];

const buttonColor = selected => (
    selected ? 'green' : null
  );

const useSizeSelection = () => {
    const [sizeList, setSizeList] = useState(sizes);
    const toggle = (x) => {
      setSizeList(sizeList.includes(x) ? sizeList.filter(y => y !== x) : [x].concat(sizeList))
    };
    return [ sizeList, toggle ];
  };
  
const AvailableSizeList = (product, sizeList) => {
    const availableSizeList = sizeList.filter(size => product[size] !== 0);
    return availableSizeList;
};

//Button改
const SizeSelector = ({ stateSize }) => (
    <Button.Group>
      { sizes.map(size =>
          <Button color= { buttonColor(stateSize.sizeList.includes(size)) } 
          onClick={ () =>  stateSize.toggle(size)
          }
          >
            { size }
          </Button>
        ) 
      }
    </Button.Group>
  );

const ProductList = ({ products, stateProduct, stateSelect, setVisible }) => {
    const [sizeList, toggle] = useSizeSelection();
    const productsDisplay = products.filter(product => AvailableSizeList(product, sizeList).length !== 0);
    return (
        <Grid >
            <Grid.Column width={4}>
                <SizeSelector stateSize={ { sizeList, toggle } } 
                stateProduct={ stateProduct } products={ products }/>
            </Grid.Column>
            <Grid.Row>
            <Card.Group>
                { productsDisplay.map(product =>
                        <Product key={ product.sku } product={ product } 
                        stateSelect= { stateSelect } setVisible={ setVisible }   
                    />) }
                    
                </Card.Group>          
            </Grid.Row>  
        </Grid>
    );
};

/*  <Card.Group>
              
      
{ productsDisplay.map(product =>
                        <Product key={ product.sku } product={ product } stateSelect= { stateSelect } setVisible={ setVisible } stateSizeChartVisible = { stateSizeChartVisible } 
                    />) }
                    
                </Card.Group> */
export default ProductList