import { Card, Col, Text } from "@nextui-org/react";
import { Link } from "@nextui-org/react";




export const Card1 = () => (
  <Card>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={18} weight="bold" color="seagreen">
          Made Fresh Daily
        </Text>
        <Text  h4 color="darkgreen">
          SHARE FRESH FLAVOURS
        </Text>
      </Col>
    </Card.Header>
    <Card.Image
      src="/img/slider.png"
      objectFit="cover"
      width="100%"
      height={340}
      alt="Unsplash Card image background"
    />
  </Card>



);