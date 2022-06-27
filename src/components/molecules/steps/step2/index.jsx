import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import {
  Text,
  FormControl,
  Alert,
  AlertTitle,
  AlertDescription,
  Link,
} from '@chakra-ui/react';

import CustomHeader from '../../../atoms/CustomHeader';
import CustomInput from '../../../atoms/CustomInput';
import PrincipalButton from '../../../atoms/PrincipalButton';

import { postNewData, setDataAfip } from '../../../../store/Slices/dataSlice';

const Step2 = ({ setStep2 }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const base_url = 'https://api-gateway.staging.scala.ly/afip';

  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);

    data = { ...data, step: '2 completed' };

    await axios({
      method: 'get',
      url: `${base_url}/ws_sr_padron_a13/getPersona?idPersona=${data?.cuit_cuil}`,
      headers: {
        authorization:
          'Apikey ChTec.mnJeDQsJijJVdLZ409HHgcOnY1OnhZr4DgCvhzWebKqGnQX55M',
      },
    })
      .then((response) => {
        dispatch(setDataAfip(response.data.persona));
        dispatch(postNewData(data));
        setLoading(false);
        setStep2(true);
      })
      .catch((error) => {
        console.log(error);
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        setAlert(true);
      });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <CustomHeader />
      {alert && (
        <Alert status='error' flexDirection={['column', 'row']} mb='1rem'>
          <AlertTitle>Error en ingreso de información</AlertTitle>
          <AlertDescription mt='2rem'>
            Parece que hubo un error, por favor complete nuevamente el
            formulario
          </AlertDescription>
          <Link href='/steps'>
            <PrincipalButton text='Aceptar' />
          </Link>
        </Alert>
      )}

      <Text>Datos Personales</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired onSubmit={(e) => console.log(e)}>
          <CustomInput
            type='text'
            placeholder='Cocos'
            register={register}
            nameRegister='firstsNames'
            label='Nombres'
          />

          <CustomInput
            type='text'
            placeholder='Capital'
            register={register}
            nameRegister='lastsNames'
            label='Apellidos'
          />

          <CustomInput
            type='number'
            placeholder='00000000000'
            register={register}
            nameRegister='cuit_cuil'
            label='Cuit'
          />

          <CustomInput
            type='text'
            placeholder='Argentina'
            register={register}
            nameRegister='nationality'
            label='Nacionalidad'
          />

          <CustomInput
            type='text'
            placeholder='Argentina'
            register={register}
            nameRegister='country'
            label='Pais de Nacimiento'
          />

          <CustomInput
            type='date'
            placeholder='Argentina'
            register={register}
            nameRegister='date'
            label='Fecha de nacimiento'
          />
          <PrincipalButton
            isLoading={loading}
            type='submit'
            text='Siguiente'
            isStep
          />
        </FormControl>
      </form>
    </>
  );
};

export default Step2;
