import {Button, Header, Icon, Image, Modal, Item } from 'semantic-ui-react'
import React from 'react'

const SelectedItem = ({ selectedItem, deleteProduct }) => (
    <Item>
      <Item.Image size='tiny' src={`./data/products/${selectedItem.sku}_1.jpg`}/>
      <Item.Content>
          <Item.Header>{ selectedItem.title }</Item.Header>
          <Item.Meta>Quantity: { selectedItem.quantity }</Item.Meta>
          <Item.Extra>{ selectedItem.size } | { selectedItem.description }</Item.Extra>
      </Item.Content>
      <Button onClick={ () => deleteProduct(selectedItem) }>
          remove
      </Button>
    </Item>
  );

const ShoppingCart = ({ selected, stateVisible, deleteProduct }) => {
    return (

  <Modal open={ stateVisible.visible } trigger={<Button onClick={ () => stateVisible.setVisible(true) }>Cart</Button>}>
    <Modal.Header>Shopping Cart
    <Button onClick={ () => stateVisible.setVisible(false) }> close </Button>
    </Modal.Header>
    <Modal.Content image scrolling>
      <Modal.Description>
        
        <Item.Group>
          {
            selected.map(selectedItem => 
                //console.log(selectedItem)
            <SelectedItem key={ selectedItem.sku } selectedItem={ selectedItem } 
            deleteProduct={ deleteProduct }
            />
            )
          }
        </Item.Group>
        
      </Modal.Description>
      
    </Modal.Content>
    <Modal.Actions>
     <Header>Subtotal: </Header>
      <Button primary onClick={ (e) => alert("success") }>
        Checkout <Icon name='chevron right' />
      </Button>
    </Modal.Actions>
  </Modal>
     
    )
   };
  

export default ShoppingCart