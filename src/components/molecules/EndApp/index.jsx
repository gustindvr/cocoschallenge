import { Text } from '@chakra-ui/react';
import React from 'react';
import CustomHeader from '../../atoms/CustomHeader';

const EndApp = () => {
  return (
    <>
      <CustomHeader />
      <Text fontSize='lg' fontWeight='semibold'>
        Muchas gracias por tu tiempo. Vamos a validar los datos y en breve nos
        vamos a comunicar para darte el acceso a la plataforma{' '}
      </Text>
    </>
  );
};

export default EndApp;
