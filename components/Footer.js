
import React from 'react'
import { Spacer, Grid,  Card, Row, Text, Link, styled, Image} from "@nextui-org/react";

const StyledCard = styled("card", {
    position: "relative",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    '&:active': {
      opacity: 0.8,
    }
  });
  
  const Styledimg = styled("img", {
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    '&:active': {
      opacity: 0.8,
    }
  });
  

const Footer = () => {
    
    return (
        
        <StyledCard css={{ p: "$6", mw: "900px" }}>
        <Card.Header>
            <Styledimg src="/img/footer.jpg" layout="fill" alt="" width={260}
            height={250} />
                       
          <Grid.Container css={{ pl: "$6", padding: "20px 20px 0px" }}>
            <Grid xs={12}>
              <Text h4 css={{ lineHeight: "$xs", color: "#b7903c" }}>
              VISIT OUR STORES
              </Text>
            </Grid>
            
            <Grid xs={10}>
            <Text p css={{ lineHeight: "$xs", color: "darkgrey" }}>
            Unit 4 One Central Plaza, Dame Street.
                    <br /> Dublin, D02 R2V6
              </Text>
            </Grid>
            <Spacer y={4} />
            <Grid xs={10}>
            <Text p css={{ lineHeight: "$xs", color: "darkgrey" }}>
            Ilac Centre, Henry Street
                    <br /> Dublin, D01 X209
              </Text>
             </Grid>


            <Spacer y={3} />
            <Grid xs={12}>
              <Text h4 css={{ lineHeight: "$xs", color: "#b7903c" }}>
              WORKING HOURS
              </Text>
            </Grid>
            <Grid xs={10}>
            <Text p css={{ lineHeight: "$xs", color: "darkgrey" }}>
                MONDAY- SUNDAY
                    <br /> 09:00-20:00
              </Text>
            </Grid>
          </Grid.Container>
        </Card.Header>
        
      </StyledCard>
      

       

    

    );
        
        
        



}

export default Footer