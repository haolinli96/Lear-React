
import {Button, Segment, Header, Icon, Image, Modal, Item } from 'semantic-ui-react'
import React from 'react'

const SelectedItem = ({ selectedItem }) => (
    <Item>
      <Item.Image size='tiny' src={`./data/products/${selectedItem.sku}_1.jpg`}/>
      <Item.Content>
          <Item.Header>{ selectedItem.title }</Item.Header>
          <Item.Meta>Quantity: { selectedItem.quantity }</Item.Meta>
          <Item.Extra>{ selectedItem.size } | { selectedItem.description }</Item.Extra>
      </Item.Content>
      <Button>
          remove
      </Button>
    </Item>
  );

const ShoppingCart = ({ selected, visible }) => {
    return (

  <Modal trigger={<Button>Scrolling Content Modal</Button>}>
    <Modal.Header>Shopping Cart</Modal.Header>
    <Modal.Content image scrolling>
      <Modal.Description>
        
        <Item.Group>
          {
            selected.map(selectedItem => 
                //console.log(selectedItem)
            <SelectedItem key={ selectedItem.sku } selectedItem={ selectedItem } 
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
   /* <Item.Group>
    <Item>
      <Item.Image size='tiny' src='/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>Header</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          <Image src='/images/wireframe/short-paragraph.png' />
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image size='tiny' src='/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>Header</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          <Image src='/images/wireframe/short-paragraph.png' />
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group> */

export default ShoppingCart