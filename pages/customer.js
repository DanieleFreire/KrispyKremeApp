import {useRouter} from 'next/router'
import { Card, Grid, Row, Text, Button, Input, Spacer, Link } from "@nextui-org/react";
import { withIronSessionApiRoute } from "iron-session/next";
import { withIronSessionSsr } from "iron-session/next";



export default function Customer({productsList, temp}) {
  const router = useRouter()


  // Handle the submit for the form
  async function handleSubmit(event) {

      alert("Product was added to cart!")
      event.preventDefault();

           
       // grab the variables from the form.
       const productid = document.querySelector('#productid').value   
       const title = document.querySelector('#title').value 
       const description = document.querySelector('#description').value 
       const price = document.querySelector('#price').value    
       const images = document.querySelector('#images').value       
       const quantity = document.querySelector('#quantity').value

             
        // Get data from the form - make json
        const data = {
          productid: event.target.productid.value,
          title: event.target.title.value,
          description: event.target.description.value,
          price: event.target.price.value,
          images: event.target.images.value,
          quantity: event.target.quantity.value,
        }
    
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)
    
        // API endpoint where we send form data.
        const endpoint = '/api/cart_product'


    
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

    
  
  return (

    <Grid.Container gap={2} justify="flex-start">
    {productsList.map((item) => (
      <Grid xs={6} sm={3} key={item.productid}>
        <Card >
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              src={`/img/${item.images}`}
              objectFit="cover"
              width="100%"
              height={140}
              alt={item.title}
            />
          </Card.Body>
          <Card.Footer css={{ justifyItems: "flex-start" }}>
            <Row wrap="wrap" justify="space-between" align="center">
              <Text b color='darkgreen'>{item.title}</Text>
              <Text css={{ color: "#b7903c", fontWeight: "$semibold", fontSize: "$sm" }}>
              € {item.price} 
              </Text>
            </Row>
          </Card.Footer>
          <div>
          <form onSubmit={handleSubmit}>
          <input type="hidden" id='productid' value={item.productid}></input>
          <input type="hidden" id='title' value={item.title}></input>
          <input type="hidden" id='description' value={item.description}></input>
          <input type="hidden" id='price' value={item.price}></input>
          <input type="hidden" id='images' value={item.images}></input>
          <Input id='quantity' css ={{width: '120px', colorLabel: 'darkgreen', marginLeft: '20px', marginBottom: '10px'}}
          defaultValue={1}
          placeholder="quantity" 
          type="number" 
          />
          <Button size="xs" type="submit" css ={{background: 'seagreen', color: 'white', marginLeft: '60px'}}  >Add to Cart </Button>
          <Spacer y={1} />
          <Button auto type="submit" css ={{background: 'darkgreen', color: 'white', marginLeft: '15px'}}  flat as={Link} href="/checkout">Go to Checkout </Button>
          </form>
          <br></br>
          <Text p css={{ color: "#b7903c" ,fontWeight: "bold", marginLeft: '15px'}}  size={16}>
                WEATHER: {temp.toFixed(2)}℃
              </Text>
          </div>
          <br></br>
        </Card>

      </Grid>
    ))}
    </Grid.Container>
  );
}



// This gets called on every request
//the next.js calls the database from the same page
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3000/api/products`)
    const productsList = await res.json()


    // grab the weather from the api
  const res2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=2964574&appid=8413954f14a71a6017f7fd65f8c5a861`)
  const apidata = await res2.json()

  var temp = (apidata.list[0]['main']['temp'] - 273.15);
  console.log(temp);
  
    // Pass data to the page via props
    return { props: { productsList,
                      temp:temp
    } }
  }

  