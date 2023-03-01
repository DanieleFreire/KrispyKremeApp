import Footer from "./Footer"
import Sliderbar from "./Sliderbar"
import { Container, Card, Row, Text, Col, Spacer } from "@nextui-org/react";


const MyLayout = ({children}) => {

    return (

      <> 
        <Sliderbar/>
          {children}
        <Footer/>
      </>
        
        /*<Container gap={0}> 
            <Sliderbar/>
            <Row gap={2}>
        <Col css={{flex:'1'}}>
          <Card css={{ bgColor: 'skyblue' }} >
            <Card.Body css={{padding: '2'}}>
                <Sidebar/>
            </Card.Body>
          </Card>
        </Col>
        <Col css={{flex:'4'}}>
          <Card css={{ background: 'pink'}}>
            <Card.Body css={{padding: '2'}}>
                <Feed/>
            </Card.Body>
          </Card>
        </Col>
        <Col  css={{flex:'2'}}>
          <Card css={{ background: 'lightcoral'}}>
            <Card.Body css={{padding: '2'}}>
                <Rightbar/>
            </Card.Body>
          </Card>
        </Col>
      </Row>   
            
        </Container>

        <Container gap={0}>
          <Sliderbar/>
        <Row gap={1}>
          <Col css={{flex:'1'}}>
            <Card css={{ bgColor: 'skyblue' }}>
              <Card.Body css={{padding: '2'}}>
                <Sidebar/>
              </Card.Body>
            </Card>
          </Col>
          </Row>
          <Row gap={1}>
          <Col css={{flex:'4'}}>       
            <Card css={{ background: 'pink'}}>
              <Card.Body css={{padding: '2'}}>
                <Feed/>
              </Card.Body>
            </Card>
          </Col>
        </Row> 
        <Row gap={1}>
          <Col css={{flex:'2'}}>
            <Card css={{ background: 'lightcoral'}}>
              <Card.Body css={{padding: '2'}}>
                <Rightbar/>
              </Card.Body>
            </Card>
          </Col>       
        </Row>
      </Container>*/


    );


};

export default MyLayout;