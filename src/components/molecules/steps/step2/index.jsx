import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Text, FormControl, Flex, Container } from '@chakra-ui/react';

import CustomHeader from '../../../atoms/CustomHeader';
import CustomInput from '../../../atoms/CustomInput';
import PrincipalButton from '../../../atoms/PrincipalButton';

import { postNewData } from '../../../../store/Slices/dataSlice';

const Step2 = ({ setStep2 }) => {
  const { userData } = useSelector((state) => state.userData);

  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    data = { ...data, step: '2 completed' };
    console.log(data);
    const response = await dispatch(postNewData(data));
    if (response.payload) {
      setStep2(true);
    }
  };

  return (
    <>
      <CustomHeader />

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

          <PrincipalButton type='submit' text='Siguiente' isStep />
        </FormControl>
      </form>
    </>
  );
};

export default Step2;
