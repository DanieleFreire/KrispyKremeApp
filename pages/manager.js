import {useRouter} from 'next/router'


import { Table, Row, Col, User, Text, Button, Grid, Link } from "@nextui-org/react";
import { useModal } from "@nextui-org/react";



const columns = [
    { name: "Orders", uid: "orderid" },
    { name: "Total", uid: "total" },
    
       
  ];
  
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "orderid":
        return (
            <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize", color:"green" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );
      case "total":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize", color: "darkgreen" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );
            
      default:
        return cellValue;
    }
  };



export default function Checkout({orderList, totalorder}) {
    const router = useRouter()
    const { setVisible, bindings } = useModal();
  
    // Handle the submit for the form
    async function handleSubmit(event) {
  
    }
    console.log("ORDER LIST: ")
    console.log(orderList)
    //console.log(totalorder)
  
    
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
      <Table.Body items={orderList}>
        {(item) => (
          <Table.Row key={item.orderid}>
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
        Total of all orders
        </Text>
       
      <Text  h4 color="darkgreen" size={22} css={{ m: 20 }}>
        € {totalorder.toFixed(2)}
        </Text>
      </Grid>  
      <Grid justify='flex-end' xs={12} md={6} >    
      <Button auto css ={{ 
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            backgroundColor: 'red',
                        }}        
                         flat as={Link} href="/"> CLOSE                        
     </Button> 
    </Grid>   
    </Grid.Container>   
          
   
                    

      </>
    )
  }
  
  
  
 // This gets called on every request
//the next.js calls the database from the same page
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/manager`)
  const order = await res.json()
  const orderList = order.results
  const totalorder = order.total

  // Pass data to the page via props
  return { props: { orderList, totalorder } }
}