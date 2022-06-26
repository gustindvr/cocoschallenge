import React from 'react';
import Link from 'next/link';

import { Container, Heading, Flex, Button } from '@chakra-ui/react';
import CustomHeader from '../src/components/atoms/CustomHeader';

const Home = () => {
  return (
    <Container maxW='container.md' height='100%'>
      <Flex
        height='100vh'
        flexFlow='row wrap'
        textAlign='center'
        justifyContent='center'
        alignContent='center'
      >
        <CustomHeader />
        <Heading
          as='h2'
          w='100%'
          fontWeight='bold'
          fontSize={{ base: 'xl', sm: '2xl', md: '4xl', lg: '5xl' }}
          m='2rem 0'
        >
          Abrí tu cuenta en minutos
        </Heading>
        <Link href='/steps'>
          <Button
            type='submit'
            colorScheme='whiteAlpha'
            p={{ base: '0.5rem', sm: '1rem', md: '2rem' }}
            w={{ base: '80%', xl: '20%' }}
            style={{ backgroundColor: 'var(--principal-color)' }}
            fontSize={{ base: '0.9em', sm: '1em', md: '1.2em', lg: '1.5em' }}
          >
            Comenzar
          </Button>
        </Link>
      </Flex>
    </Container>
  );
};

export default Home;
