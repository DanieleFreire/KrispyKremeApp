
import React from 'react'
import { Grid, styled, Box, useState } from "@nextui-org/react";
import { Card1 } from './Card1';
import { Link } from "@nextui-org/react";

const StyledBox = styled("box", {
    position: "relative",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    '&:active': {
      opacity: 0.8,
    }
  });


const Feed = () => {

    
  

    return (
        <StyledBox>
        <Grid.Container gap={2} justify="center">
            <Grid xs={12} sm={4}>
                <Link href='#'><Card1 /></Link> 
            </Grid>
        </Grid.Container>
        </StyledBox>
    )


}

export default Feed