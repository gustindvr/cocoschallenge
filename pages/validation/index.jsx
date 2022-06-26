import React, { useState } from 'react';

import { Container, Flex, Link, Text } from '@chakra-ui/react';

import PhotoDoc from '../../src/components/molecules/PhotoDoc';
import CustomHeader from '../../src/components/atoms/CustomHeader';
import PrincipalButton from '../../src/components/atoms/PrincipalButton';

const Validation = () => {
  const [frontCard, setFrontCard] = useState(false);
  const [backCard, setBackCard] = useState(false);

  return (
    <Container>
      <Flex
        flexFlow='row wrap'
        justifyContent='center'
        alignContent='center'
        textAlign='center'
        h='100%'
      >
        <CustomHeader />
        {!frontCard && (
          <>
            <Text fontSize='2rem'>Captura el frente de tu DNI</Text>
            <PhotoDoc setFrontCard={setFrontCard} isFront />
          </>
        )}
        {!backCard && frontCard && (
          <>
            <Text fontSize='2rem'>Captura el dorso de tu DNI</Text>
            <PhotoDoc setBackCard={setBackCard} isBack />
          </>
        )}
        {backCard && (
          <>
            <Text>
              ¡Excelente! Ahora necesitamos que grabes un video con el DNI en tu
              mano
            </Text>
            <Text>
              Importante: Segui las instrucciones que aparecen en el video
            </Text>
            <Link href='/validation/video'>
              <PrincipalButton text='Realizar video' />
            </Link>
          </>
        )}
      </Flex>
    </Container>
  );
};

export default Validation;
