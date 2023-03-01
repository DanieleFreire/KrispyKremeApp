import React from 'react'

import Head from 'next/head'
import { Box } from '../components/Box'
import Feed from '../components/Feed'




export default function Home({data}) {


  
  return (

    <Box>   
     <Head>
      <title>Krispy Kreme</title>
      <meta name ="description" content="Doughnuts"/>
      <link rel="icon" href="/favicon.ico" />
     </Head>
      <Feed/> 
  </Box>    
    
    
  );
}