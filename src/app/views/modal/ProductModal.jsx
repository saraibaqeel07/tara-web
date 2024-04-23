import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import {  Modal } from 'antd';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
const ProductModal = ({isModalOpens,handleOks,handleCancels,pData,UpdateCount,valueCount}) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);
  
console.log(pData);
    const handleIncrement = () => {
      if (valueCount < 5) {
        UpdateCount(valueCount => valueCount + 1);
      } else {
        alert("You can't add more than 5 products.");
      }
    };
  
    const handleDecrement = () => {
      if (valueCount > 0) {
        UpdateCount(valueCount => valueCount - 1);
      } else {
        alert("You can't have less than 0 products.");
      }
    };
    const onCurrencyChange = ({ target: { value } }) => {
        setCurrency(value);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    }

    const onCreateOrder = (data,actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: (parseFloat(pData?.price) * parseFloat(valueCount)),
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data,actions) => {
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
        });
    }
  return (

<>
{isModalOpens &&   
     <Modal title={pData?.title} open={isModalOpens} onCancel={handleCancels} footer={[]}>
       <Box >
       <Typography>
                        {pData?.price}
                      </Typography>
    <div className='mb-2 countBOx'>
      <Button onClick={handleDecrement} variant="contained" color="secondary">
        -
      </Button>
      <input type={"number"} disabled maxLength={5} minLength={0} value={valueCount} className='inputcount' />
      <Button onClick={handleIncrement} variant="contained" color="secondary">
        +
      </Button>
      <br />
    </div>

    <ul className='totalprize'>
        <li><h5>Total Prize</h5>
        <b>${parseFloat(pData?.price) * parseFloat(valueCount)}</b>
        </li>
    </ul>

    <div className="checkout">
            {isPending ? <p>LOADING...</p> : (
                <>
                    <PayPalButtons 
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                </>
            )}
        </div>
   </Box>
      </Modal>
    }
   </>
  )
}

export default ProductModal