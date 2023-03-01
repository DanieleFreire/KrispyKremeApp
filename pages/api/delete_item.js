import { withIronSessionApiRoute } from "iron-session/next";



export default withIronSessionApiRoute(
    async function cart(req, res) {
    
      
     // get the variables that were sent over
     var idProductCart = req.body.productid;
     var priceProdutCart = req.body.productprice;
          
     var items = Array.from(req.session.cart_product.items)

     console.log(idProductCart)

     var indexToDelete = items.findIndex(({ id }) => id === String(idProductCart));

     console.log(indexToDelete)

    items.splice(indexToDelete,1);


      // sum of the array values 
     var total = req.session.cart_product.total - priceProdutCart;

     
   
     // add the items to the cart object.
      req.session.cart_product = {
        items, total
       
      };
      console.log(req.session.cart_product);

      await req.session.save();

      // send back a message that it went to plan!
      res.status(200).json("item deleted from cart");

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
