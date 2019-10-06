import React, { useState } from 'react'
import { Button, Card, Image, Container } from 'semantic-ui-react'
import SizeChart from './SizeChart'

/* const HandleClick = ({ product, stateSelect, setVisible, stateSizeChartVisible }) => (
    //stateSelect.addProduct(product); 
    //setVisible(true);
    stateSizeChartVisible.setSizeChartVisible(true)

); */

//open={ stateVisible.visible }

//改productlist
//改成很多product的写法


const Product = ({ product, stateSelect, setVisible }) => {

    const [sizeChartVisible, setSizeChartVisible] = useState(false);

    return (
        <React.Fragment>
            <SizeChart stateSizeChartVisible = { { sizeChartVisible, setSizeChartVisible } } 
            product={ product } setVisible={ setVisible } stateSelect={ stateSelect }/>
            <Card>
            <Card.Content>
                <Image
                    src={`./data/products/${product.sku}_1.jpg`}
                />
                <Card.Header>{ product.title }</Card.Header>
                <Card.Meta>{ product.description }</Card.Meta>
                <Card.Description>
                {product.currencyFormat} { product.price }
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button 
                    onClick={() => setSizeChartVisible(true)}
                >
                    Add to cart
                </Button>
            </Card.Content>
            </Card>
        </React.Fragment>
);
};

/* <Card>
    <Card.Content>
        <Image
          src={`./data/products/${product.sku}_1.jpg`}
        />
        <Card.Header>{ product.title }</Card.Header>
        <Card.Meta>{ product.description }</Card.Meta>
        <Card.Description>
        {product.currencyFormat} { product.price }
        </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Button 
            onClick={HandleClick(product, stateSelect, setVisible, stateSizeChartVisible)}
        >
            Add to cart
        </Button>
      </Card.Content>
  </Card>  */

export default Product
