
import { Grid, Card, Text, Container } from "@nextui-org/react";
import { Input, Button, Row } from "@nextui-org/react";


import {useRouter} from 'next/router'



export default function Register() {
  const router = useRouter()
  


  // Handle the submit for the form
  async function handleSubmit(event) { 

       alert("The form was submitted");
       event.preventDefault();
    

       // grab the variables from the form.
       const username = document.querySelector('#username').value;

       console.log("username is " + username);

       const pass = document.querySelector('#password').value;

       console.log("password is " + pass);

       const email = document.querySelector('#email').value;

       console.log("email is " + email);

       const telephone = document.querySelector('#telephone').value;

       console.log("telephone is " + telephone);

       const address = document.querySelector('#address').value;

       console.log("address is " + address);

           


        // Get data from the form - make json.
        const data = {
          username: event.target.username.value,
          password: event.target.password.value,
          email: event.target.email.value,
          telephone: event.target.telephone.value,
          address: event.target.address.value,
        }
    
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)
    

      //Send the data to the server side.  
        // API endpoint where we send form data.
        const endpoint = '/api/register'


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
 
        router.push("/");
      }
    
  }
  
  
  return (
    <>
 <form onSubmit={handleSubmit}> 
    <Container xs={650} gap={2} >
      <Row gap={1}>
        
          <Card css={{ $$cardColor: 'none' }}>
            <Card.Body >
            <Grid justify='center' xs={12} md={6} >       
            <Text  h4 color="red" size={20} css={{ m: 20 }}>
              REGISTRATION
            </Text>
            </Grid>
            </Card.Body>
          </Card> 
        </Row>   
       
        <Row gap={1}>
          <Card css={{ $$cardColor: 'none' }}>
            <Card.Body>

              <Input clearable label="Username" placeholder="Username"  id='username'/>
            </Card.Body>
          </Card>
      </Row>
      <Row gap={1}>
       
          <Card css={{ $$cardColor: 'none' }}>
            <Card.Body>

              <Input clearable label="Address" placeholder="Address"  id="address" />
            </Card.Body>
          </Card>
      </Row>    
      <Row gap={1}>
          <Card css={{ $$cardColor: 'none' }}>
            <Card.Body>

              <Input clearable label="Email" placeholder="Email Address" id="email" />
            </Card.Body>
          </Card>
      </Row>  
      <Row gap={1}>
          <Card css={{ $$cardColor: 'none' }}>
            <Card.Body>

              <Input clearable label="Telephone" placeholder="(123) 456-7890" id="telephone" />
            </Card.Body>
          </Card>
      </Row>      
     
      <Row gap={1}>
        
          <Card css={{ $$cardColor: 'none' }}>
            <Card.Body>
        <Input.Password
          clearable
          initialValue="123"
          type="password"
          label="Password"
          placeholder="Enter your password with eye"
          id="password"
        />
            
            </Card.Body>
          </Card>

      
      </Row>
      
      <Row gap={1}>
        
          <Card css={{  $$cardColor: 'none'  }}>
            <Card.Body>

            <Button auto css={{ background: 'darkgreen', color: 'white' }}  type="submit">
               Create an Account
              </Button>   
            </Card.Body>
          </Card>

      
      </Row>
     
    </Container>

    </form> 
  
    </>
  )
}