import { withIronSessionApiRoute } from "iron-session/next";



export default withIronSessionApiRoute(
    async function customer(req, res) {
    
      
     // get the variables that were sent over
     var id = req.body.productid;
     var name = req.body.title;
     var description = req.body.description;
     var price = req.body.price;
     var images = req.body.images;
     var quantity = req.body.quantity;

     
    // declaring variable to add over than 1 product into the session by using an array
     const newItem = {id, name, description, price, images, quantity}
     var items = []

     if(req.session.cart_product){
        items = Array.from(req.session.cart_product.items)
     }

     items.push(newItem); 


     // sum of the array values 
     var total = 0.00;

     items.forEach(vprice => { 
      total += (vprice.price * vprice.quantity)
     })
   

     // add the items to the cart object.
      req.session.cart_product = {
        items, total
       
      };
      console.log(req.session.cart_product);

      await req.session.save();

      // send back a message that it went to plan!
      res.status(200).json("updated cart");

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





























