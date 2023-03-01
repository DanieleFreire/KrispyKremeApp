import React from 'react'
import {useRouter} from 'next/router'
import { Navbar, Button, Link, Text, styled, Badge, Input } from "@nextui-org/react";
import { Modal } from "@nextui-org/react";

import { CartIcon } from './CartIcon';
import { Row, Checkbox } from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";
 
const Styledimg = styled("img", {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  '&:active': {
    opacity: 0.8,
  }
});

const StyledButton = styled("button", {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  '&:active': {
    opacity: 0.8,
  }
});




export default function Sliderbar() {

  const router = useRouter()


  // Handle the submit for the form
  async function handleSubmit(event){
     
          
       alert("The form was submitted");
       event.preventDefault();

           

       // grab the variables from the form.
       const name = document.querySelector('#username').value

       console.log("username is " + name);

       const pass = document.querySelector('#password').value

       console.log("password is " + pass);




        // Get data from the form.
        const data = {
          username: event.target.username.value,
          password: event.target.password.value,
        }
    
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)
    
        // API endpoint where we send form data.
        const endpoint = '/api/login'


    
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
      if(result.includes("customer")){
 
        router.push("/customer");
      }
      else if(result.includes("manager")) {

        router.push("/manager");
      }


  }    

  const [isInvisible] = React.useState(false);

  const [visible, setVisible] = React.useState(false);
  
  

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");

  };


    return (      
        <Navbar isCompact isBordered variant="sticky">
          <Link href="/">
          <Styledimg src="/img/Krispy-Kreme-Logo.png" height={70} cursor="pointer"/>
          </Link>
          <Navbar.Content hideIn="xs" variant="underline">
            <Navbar.Link href="/customer"><Text css={{ color: 'darkgreen', fontWeight: "bold"}} >Menu</Text></Navbar.Link>
            <Input        
              size="xs" 
              placeholder="Search..." />
            <Navbar.Link href="/cart">
              <StyledButton aria-label="more than 99 notifications">
                <Badge size="xs" css={{ background: 'red', color: 'white'}} isInvisible={isInvisible} content="9+" shape="circle">
                <CartIcon fill="darkgreen" size={30} />
              </Badge>
              </StyledButton>
            </Navbar.Link>
          </Navbar.Content>
          <Navbar.Content>
            <Navbar.Link>
            <div>
              <Button auto css={{ background: 'none', color: 'red' }} 
                        onClick={() => setVisible(true)}><Text css={{ color: 'red', fontWeight: "bold"}} >Login</Text>
               </Button>
              <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
              >
              <Modal.Header>
              <Text css={{ color: 'darkgreen' }} id="modal-title" size={18}>
                Welcome to
              <Text p css={{ color: 'red' }}  size={18}>
                 Krispy Kreme
              </Text>
              </Text>
              </Modal.Header>
              <form onSubmit={handleSubmit}>
              <Modal.Body>
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Email"
                  id='username'
                  contentLeft={<Mail fill="currentColor" />}
                />
                <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Password"
                  id='password'
                  contentLeft={<Password fill="currentColor" />}
                />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button type='submit' auto css ={{background: 'darkgreen', color: 'white'}} onClick={closeHandler}>
            Sign in
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
    </div>
            </Navbar.Link>
            <Navbar.Item>
              <Button auto css={{ background: 'darkgreen', color: 'white' }} flat as={Link} href="/register">
                Sign Up
              </Button>
            </Navbar.Item>
          </Navbar.Content>
        </Navbar>
     

        
    );

  
};





