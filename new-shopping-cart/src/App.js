import React, { useEffect, useState } from 'react';
import 'rbx/index.css'; //import in react file need styling
import { Button, Container, Title, Message, Column, Card, Image, Content, Block, Box } from 'rbx'; //and specify the components
import {db} from './db';

import firebase from 'firebase/app';
import 'firebase/database';
import "firebase/auth";
import "firebase/firestore";
import 'firebase/auth';
import { ColumnGroup } from 'rbx/grid/columns/column-group';

import ShoppingCart from './ShoppingCart'
//


const sizes = ['S', 'M', 'L', 'XL'];

const Banner = () => (
  <React.Fragment>
    <Title>{ 'Shopping Cart' }</Title>
  </React.Fragment>
);

//use badge for free shipping
const Product = ({ product, stateSelect, setVisible }) => (
  <React.Fragment>
    <Column size="one-quarter"> 
      <Card textAlign={"centered"}
        tooltip={ product.isFreeShipping ? "Free shipping !" : "Shipping: $3" }
      >
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
          <Card.Footer.Item as="a" href="#" 
            onClick={ () => { 
              stateSelect.addProduct(product); 
              setVisible(true);
            }}
          >
            Add to cart
          </Card.Footer.Item>
        </Card.Footer>
      </Card>
    </Column>
  </React.Fragment>
);



const buttonColor = selected => (
  selected ? 'success' : null
);

const SizeSelector = ({ stateSize }) => (
  <Button.Group>
    { sizes.map(size =>
        <Button color= { buttonColor(stateSize.sizeList.includes(size)) } 
        rounded key={size}
        onClick={ () =>  stateSize.toggle(size)
        }
        >
          { size }
        </Button>
      ) 
    }
  </Button.Group>
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
//一开始给的是不是空的！判断空的，读数据方法没错！！

const ProductList = ({ products, stateProduct, stateSelect, setVisible }) => {
  const [sizeList, toggle] = useSizeSelection();
  const productsDisplay = products.filter(product => AvailableSizeList(product, sizeList).length !== 0);
  //const productsDisplay = products.filter(product => sizeList.includes(product.size));

  //sizeList.includes(product.size)
  return (
    <React.Fragment>
      <SizeSelector stateSize={ { sizeList, toggle } } stateProduct={ stateProduct } products={ products }/>
      <Column.Group multiline >
        { productsDisplay.map(product =>
          <Product key={ product.sku } product={ product } stateSelect= { stateSelect } setVisible={ setVisible } 
          />) }
      </Column.Group>
    </React.Fragment>
  );
};





//overlay
//use a card modal for this


//在动作时调用就行
const useSelection = () => {
  const [selected, setSelected] = useState([]); //selected是一个list
  const addProduct = (x) => { //x is product
    //setSelected(selected)
    //create new with quantity=1 when not included
    //delete old and create new with quantity += 1 when included
    //both do insersion
    var tempQuantity = { quantity: 1 };
    var tempSelectedItem = selected.find(selectedItem => 
                            selectedItem.sku === x.sku);
    //tempSelectedItem {sku: 123, title: ..., q: 2}
    //without tempSelectedItem
    if (tempSelectedItem){ //setSelected(selected.filter(y => y !== tempSelectedItem));
       tempSelectedItem.quantity += 1;}
    else { tempSelectedItem = Object.assign(tempQuantity, x);
    setSelected([tempSelectedItem].concat(selected));}


  };
  const deleteProduct = (x) => {
    setSelected(selected.filter(y => y.sku !== x.sku));

  };
  return [selected, addProduct, deleteProduct];
}; 


const App = () => {
  const [data, setData] = useState({});
  const [inventory, setInventory] = useState({});
  const products = Object.values(data); 
  const [productsDisplay, setProductDisplay] = useState([]);

  const [visible, setVisible] = useState(false);
  const [selected, addProduct, deleteProduct] = useSelection();
  //the x to be given should be sku

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      const handleData = snap => {
        if (snap.val()) {
          Object.keys(json).forEach(sku => {
            Object.assign(json[sku], snap.val()[sku]);
          });
          setData(json); //put productInventory into product
        }
      };
      db.on('value', handleData, error => alert(error));
      return () => { db.off('value', handleData); };
    }; 
    fetchProducts();
  }, []);

  //inventory is an object not an array
  return (
    //console.log(inventory)
      <Container>
      <Banner />
      <ShoppingCart selected={ selected } stateVisible={ { visible, setVisible } } deleteProduct={ deleteProduct }/>
      <ProductList products={ products } stateProduct={ { productsDisplay, setProductDisplay} } stateSelect={ {selected, addProduct, deleteProduct} } setVisible={ setVisible }/>
    </Container>   
  );
};
// {products.map(product => <li key={product.sku}>{product.title}</li>)}
export default App;




/*inventory
{
 12064273040195392: {
      "S": 0,
      "M": 3,
      "L": 1,
      "XL": 2
    },
    51498472915966370: {
      "S": 0,
      "M": 2,
      "L": 3,
      "XL": 2
    }
}
*/



/* selected
  [
   {
      "sku": 51498472915966370,
      "title": "Dark Thug Blue-Navy T-Shirt",
      "description": "",
      "style": "Front print and paisley print",
      "price": 29.45,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
      "quantity": 1
    },
   {
      sku: 10686354557628304,
      title: "Sphynx Tie Dye Wine T-Shirt",
      description: "GPX Poly 1",
      style: "Front tie dye print",
      price: 9,
      currencyId: "USD",
      currencyFormat: "$",
      isFreeShipping: true
      quantity: 3
    }
]
*/