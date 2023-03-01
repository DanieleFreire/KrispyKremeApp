import {useRouter} from 'next/router'

import { Table, Row, Col, User, Text, Button, Grid } from "@nextui-org/react";
import { Input, Modal, useModal } from "@nextui-org/react";

import { withIronSessionSsr } from "iron-session/next";


const columns = [
   
    { name: "Order Summary", uid: "product" },
    
  ];
 

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      
      case "product":
        return  (
            <User squared src={"/img/" + user.images} product={cellValue} css={{ p: 0 }}>
           {user.description}
          </User>
          );

      
      default:
        return cellValue;
    }
  };



export default function Checkout({data, itemstotal}) {
    const router = useRouter()
    const { setVisible, bindings } = useModal();
  
    // Handle the submit for the form
    async function handleSubmit(event) {

            
  
    }
  
    return (
      <>
        <Table 
        aria-label="Example table with custom cells"
        css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={data}>
        {(item) => (
          <Table.Row >
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>




    <Grid.Container gap={2} >
       
      <Grid justify='flex-end' xs={10} md={3} >       
        <Text  h4 color="red" size={22} css={{ m: 20 }}>
        Total
        </Text>
       
      <Text  h4 color="darkgreen" size={22} css={{ m: 20 }}>
      € {itemstotal.toFixed(2)}
        </Text>
      </Grid>     
    </Grid.Container>   
          
    <Grid.Container gap={1} >
       
      <Grid justify='flex-end' xs={10} md={3} >       
      <Input 
                                size="xs"
                                placeholder="4111 1111 1111 1111"
                                label="Card Number" 
                                type="text" 
                            />
        </Grid>
      <Grid justify='flex-end' xs={10} md={3} >
      <Input 
                            size="xs"
                            width="186px" 
                            label="Expiration Date" 
                            type="date" 
                        />
       </Grid>
       <Grid justify='flex-end' xs={10} md={3} >                 
                        <Input 
                                size="xs"
                                placeholder="123"    
                                label="Card Varification Number" 
                                type="text" 
                            />
      </Grid>
    <Grid justify='flex-end'xs={10} md={3}>   
    <div> 
    <Button  css ={{ 
                            height: '30px',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginTop: '20px',
                            backgroundColor: 'darkgreen',
                            justify: 'flex-end'
                        }}        
                        onClick={() => setVisible(true)}>CONFIRM NOW!                        
                        </Button>
                    <Modal
                        scroll
                        width="600px"
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                        {...bindings}
                    >
                    <Modal.Header>
                        <Text id="modal-title" css ={{ 
                            fontSize: '18px',
                            fontWeight: 'bold',
                        }}>        
                           ORDER CONFIRMATION
                        </Text>
                    </Modal.Header>
                    <Modal.Header>    
                        <Text id="modal-subtitle" size={16}>
                            Thank you for your purchase!
                        </Text>
                        </Modal.Header>   
                    <Modal.Body>
                        <Text id="modal-description">
                            We have received your order and will contact you as soon
                            as possible. Please, check your e-mail account.
                        </Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button  css ={{ 
                            height: '30px',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginTop: '20px',
                            backgroundColor: 'red',
                        }}  
                        onClick={() => setVisible(false)}>
                            Thanks!
                        </Button>
                    </Modal.Footer>
                </Modal>
                </div>
                </Grid>
                </Grid.Container>
                
      </>
    )
  
  }
  
  
  
// make a call to the API to get the cart data
// before the page loads

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
  
  console.log("getting data from session..");
  console.log(req.session.cart_product);

    return {
      props: {
        data: req.session.cart_product.items,
        itemstotal: req.session.cart_product.total,
      },
    };    
  }, // -------------------- All boilerplate code for sessions ------------------------------------
  {
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);

