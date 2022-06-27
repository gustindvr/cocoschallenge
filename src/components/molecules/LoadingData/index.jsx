import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Heading, Link, Progress } from '@chakra-ui/react';

import CustomHeader from '../../atoms/CustomHeader';
import PrincipalButton from '../../atoms/PrincipalButton';

const LoadingData = () => {
  const [dataOK, setDataOK] = useState(false);

  const data = useSelector((state) => state.userData.userData);
  const [afipData] = useSelector((state) => state.userData.afipData);

  useEffect(() => {
    console.log('data', data);
    console.log('afipData', afipData);

    console.log(afipData.apellido.toLowerCase().trim());

    console.log(data[1].lastsNames.toLowerCase().trim());
    console.log(afipData.nombre.toLowerCase().trim());
    console.log(data[1].firstsNames.toLowerCase().trim());
    console.log(afipData.numeroDocumento.trim());
    console.log(data[0].numberDoc.trim());

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
