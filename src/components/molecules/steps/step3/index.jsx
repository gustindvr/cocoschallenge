import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Text, FormControl, Flex, Container } from '@chakra-ui/react';

import CustomHeader from '../../../atoms/CustomHeader';
import CustomInput from '../../../atoms/CustomInput';
import PrincipalButton from '../../../atoms/PrincipalButton';

import { postNewData } from '../../../../store/Slices/dataSlice';

const Step3 = ({ setStep3 }) => {
  const { userData } = useSelector((state) => state.userData);

  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    data = { ...data, step: '3 completed' };
    console.log(data);
    const response = await dispatch(postNewData(data));
    if (response.payload) {
      setStep3(true);
    }
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

      <Text>Datos residenciales</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <CustomInput
            type='text'
            placeholder='Argentina'
            register={register}
            nameRegister='home'
            label='Pais de residencia'
          />

          <CustomInput
            type='text'
            placeholder='Provincia'
            register={register}
            nameRegister='state'
            label='Provincia'
          />

          <CustomInput
            type='text'
            placeholder='Ciudad'
            register={register}
            nameRegister='city'
            label='Ciudad o Localidad'
          />

          <CustomInput
            type='text'
            placeholder='Falsa'
            register={register}
            nameRegister='adress'
            label='Calle'
          />

          <CustomInput
            type='number'
            placeholder='123'
            register={register}
            nameRegister='nAdress'
            label='Altura'
          />

          <CustomInput
            type='text'
            placeholder='9no B'
            defaultValue='-'
            register={register}
            nameRegister='apartment'
            label='Piso y/o departamento'
          />

          <CustomInput
            type='text'
            placeholder='1111'
            register={register}
            nameRegister='postalCode'
            label='Código postal'
          />

          <PrincipalButton type='submit' text='Siguiente' isStep />
        </FormControl>
      </form>
    </>
  );
};

export default Step3;
