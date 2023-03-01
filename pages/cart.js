import {useRouter} from 'next/router'

import { withIronSessionSsr } from "iron-session/next";
import { Table, Row, Col, Tooltip, User, Text, Button, Link, Grid } from "@nextui-org/react";
import { IconButton } from "../components/IconButton";
import { DeleteIcon } from "../components/DeleteIcon";




export default function Cart({data, itemstotal}) {
    const router = useRouter()

    const columns = [
      { name: "PRODUCT", uid: "name" },
      { name: "PRICE", uid: "price" },
      { name: "QUANTITY", uid: "quantity" },
      { name: "SUBTOTAL", uid: "subtotal" },
      { name: "DELETE", uid: "actions" },
   
    ];
  
    const renderCell = (user, columnKey) => {
      const cellValue = user[columnKey];
      switch (columnKey) {
        case "name":
          return (
            <User squared src={"/img/" + user.images} name={cellValue} css={{ p: 0 }}>
              {user.description}
            </User>
          );
        case "price":
          return (
            <Col>
              <Row>
              
                <Text b size={14} css={{ tt: "capitalize", color: "darkgreen" }}>
                € {cellValue}
                </Text>
              </Row>
            </Col>
          );
          
        case "quantity":
          return  (
              <Col>
                <Row>
                  <Text b size={14} css={{ tt: "capitalize", color:"green" }}>
                    {cellValue}
                  </Text>
                </Row>
              </Col>
            );

        case "subtotal":
          return (
             <Col>
                <Row>
                  
                  <Text b size={14} css={{ tt: "capitalize", color: "darkgreen" }}>
                  € {(user.price * user.quantity).toFixed(2)}
                  </Text>
                </Row>
              </Col>
            );   

        case "actions":
          return (
            <Row justify="center" align="center" >
              <Col css={{ d: "flex" }}>
              <form onSubmit={handleSubmit}>
              <input type="hidden" id='productid' value={user.id}></input>
              <input type="hidden" id='productprice' value={user.price}></input>
                <Tooltip
                  content="Delete item"              
                  color="error"
                  onClick={() => console.log("Delete item", user.id)}
                >
                  <IconButton type='submit' >
                    <DeleteIcon size={20} fill="red" />
                  </IconButton>
                </Tooltip>
                </form>
              </Col>       
            </Row>    
          );

        
        default:
          return cellValue;    
      }
    };
  
    
  

  
    // Handle the submit for the form
    async function handleSubmit(event) {

      alert("Item deleted!")
      event.preventDefault();

           
       // grab the variables from the form.
       const productid = document.querySelector('#productid').value
       const productprice = document.querySelector('#productprice').value   
       
             
        // Get data from the form - make json
        const data = {
          productid: event.target.productid.value,
          productprice: event.target.productprice.value,
        }
  
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)
    
        // API endpoint where we send form data.
        const endpoint = '/api/delete_item'


    
        // Form the request for sending data to the server.
        const options = {
          // The method is POST because we are sending data.
          method: 'POST',
          // Tell the server we're sending JSON.
          headers: {
            'Content-Type': 'application/json',
          },
          // Body of the request is the JSON data we created above.
          body: JSONdata,
        }

        
    
        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)
    
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        
        alert(`server result: ${result}`)


      }    



      // Handle the submit for the form
    async function handleSubmitCheckout(event) {

        alert("The form was submitted");
        event.preventDefault();
   

      // grab the variables from the form.
      const userid = document.querySelector('#userid').value;

      console.log("userid is " + userid);

      const total = document.querySelector('#total').value;

      console.log("total is " + total);
          


       // Get data from the form - make json.
       const data = {
         userid: event.target.userid.value,
         total: event.target.total.value,
       }
   
       // Send the data to the server in JSON format.
       const JSONdata = JSON.stringify(data)
   

     //Send the data to the server side.  
       // API endpoint where we send form data.
       const endpoint = '/api/savecart'


       // Form the request for sending data to the server.
       const options = {
         // The method is POST because we are sending data.
         method: 'POST',
         // Tell the server we're sending JSON.
         headers: {
           'Content-Type': 'application/json',
         },
         // Body of the request is the JSON data we created above.
         body: JSONdata,
       }

       
   
       // Send the form data to our forms API on Vercel and get a response.
       const response = await fetch(endpoint, options)
   
       // Get the response data from server as JSON.
       // If server returns the name submitted, that means the form works.
       const result = await response.json()
       alert(`server result: ${result}`)

       // redirect based on the result
      if(result.includes("ok")){
 
        router.push("/checkout");
      }

  
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
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
    <Grid.Container gap={2} >
       
      <Grid justify='flex-end' xs={12} md={6} >       
        <Text  h4 color="red" size={22} css={{ m: 20 }}>
        Total
        </Text>
       
      <Text  h4 color="darkgreen" size={22} css={{ m: 20 }}>
        € {itemstotal.toFixed(2)}
        </Text>
      </Grid>
      <Grid justify='flex-end'xs={12} md={6}>
      <div>
          <form onSubmit={handleSubmitCheckout}>
          <input type="hidden" id='userid' value={35}></input>
          <input type="hidden" id='total' value={itemstotal}></input>
      <Button auto type="submit" css={{ background: 'red', color: 'white' }} 
            src="/checkout">
               Proceed to checkout
              </Button>
      </form>
      </div>
      </Grid>
     
    </Grid.Container>   
          
      </>
    )
  }
  
  
  
  // This gets called on every request
  export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
      
     

      return {
        props: {
          data: req.session.cart_product.items,
          itemstotal: req.session.cart_product.total,
        },
      };
    },
    {
      cookieName: "myapp_cookiename",
      password: "complex_password_at_least_32_characters_long",
      // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
      },
    },
  );

  