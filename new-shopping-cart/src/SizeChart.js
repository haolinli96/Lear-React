import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'

const sizes = ['S', 'M', 'L', 'XL'];

/* const HandleClick = (setVisible, size, product, stateSelect, setSizeChartVisible) => {
  stateSelect.addProduct(product, size); 
  setSizeChartVisible(false);
  setVisible(true);
}; */
//不要再用handleclick了全都写在onclick里面就行了！


const SizeChart = ({ stateSizeChartVisible, product, setVisible, stateSelect }) => {
  const availableSizes = sizes.filter(size => product[size] !== 0);
  //only show buttons for existing sizes
  return (
  <Modal open={ stateSizeChartVisible.sizeChartVisible } closeIcon>
    <Header icon='cart arrow down' content='Choose Size' />
    <Modal.Actions>
      { availableSizes.map(size =>
          <Button
          onClick={() => { stateSizeChartVisible.setSizeChartVisible(false);
            stateSelect.addProduct(product, size);
            setVisible(true); }}
          >
            { size }
          </Button>)
      }
    </Modal.Actions>
  </Modal>
)};
/* onClick={HandleClick(setVisible, size, product, stateSelect, stateSizeChartVisible.setSizeChartVisible)} */

export default SizeChart;