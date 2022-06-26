import { Heading, Link, Progress } from '@chakra-ui/react';
import React, { useState } from 'react';
import CustomHeader from '../../atoms/CustomHeader';
import PrincipalButton from '../../atoms/PrincipalButton';

const LoadingData = () => {
  const [dataOK, setDataOK] = useState(false);

  setTimeout(() => {
    setDataOK(true);
  }, 3000);
  return (
    <>
      <CustomHeader />

      {!dataOK ? (
        <>
          <Heading as='h2' fontSize='lg'>
            Estamos procesando la información, esto puede demorar unos segundos
          </Heading>{' '}
          <Progress
            size='lg'
            isIndeterminate
            w={300}
            borderRadius='8px'
            my='2rem'
          />
        </>
      ) : (
        <>
          <Heading as='h2' fontSize='lg'>
            Su cuenta fue creada con éxito.
          </Heading>
          <Link href='/validation'>
            <PrincipalButton text='Hacer prueba de vida' />
          </Link>
        </>
      )}
    </>
  );
};

export default LoadingData;
