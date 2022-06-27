import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Heading,
  Link,
  Progress,
} from '@chakra-ui/react';

import CustomHeader from '../../atoms/CustomHeader';
import PrincipalButton from '../../atoms/PrincipalButton';

const LoadingData = () => {
  const [dataOK, setDataOK] = useState(false);
  const [errorData, setErrorData] = useState(false);

  const data = useSelector((state) => state.userData.userData);
  const [afipData] = useSelector((state) => state.userData.afipData);

  useEffect(() => {
    if (
      afipData?.apellido.toLowerCase() == data[1].lastsNames.toLowerCase() &&
      afipData?.nombre.toLowerCase() == data[1].firstsNames.toLowerCase() &&
      data[0].numberDoc == afipData?.numeroDocumento
    ) {
      console.log('hay coincidencia');
      setTimeout(() => {
        setDataOK(true);
      }, 3000);
    } else {
      console.log('no hay coincidencia');
      setErrorData(true);
    }
  }, [afipData]);

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
          {errorData && (
            <Alert status='error' flexDirection={['column', 'row']}>
              <AlertTitle>Error en ingreso de información</AlertTitle>
              <AlertDescription mt='2rem'>
                No se pudo validar cierta información ingresada. Lamentablemente
                deberás hacer el proceso de nuevo. Recordá verificar que todos
                tus datos estén correctamente ingresados
              </AlertDescription>
              <Link href='/steps'>
                <PrincipalButton text='Aceptar' />
              </Link>
            </Alert>
          )}
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
