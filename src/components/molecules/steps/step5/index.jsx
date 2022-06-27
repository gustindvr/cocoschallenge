import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import {
  Text,
  FormControl,
  Flex,
  Container,
  Select,
  FormLabel,
} from '@chakra-ui/react';

import CustomHeader from '../../../atoms/CustomHeader';
import CustomInput from '../../../atoms/CustomInput';
import PrincipalButton from '../../../atoms/PrincipalButton';

import { postNewData } from '../../../../store/Slices/dataSlice';

const Step5 = ({ setStep5 }) => {
  const [account, setAccount] = useState();
  const [otherAccount, setOtherAccount] = useState(false);

  const { userData } = useSelector((state) => state.userData);

  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();

  const accountType = ['', 'Caja de Ahorro', 'Cuenta Corriente', 'Otro'];

  const currencys = ['', 'ARS', 'USD', 'Bimonetaria'];

  useEffect(() => {
    if (account === 'otro') {
      setOtherAccount(true);
    }
    if (account !== 'otro') {
      setOtherAccount(false);
    }
  }, [account]);

  const onSubmit = async (data) => {
    const response = await dispatch(postNewData(data));
    if (response.payload) {
      setStep5(true);
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

      <Text>Datos bancarios</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <CustomInput
            type='number'
            placeholder='CBU/CVU'
            register={register}
            nameRegister='cbu'
            label='CBU/CVU'
          />

          <Flex
            flexFlow='row wrap'
            justifyContent='space-between'
            textAlign='left'
          >
            <FormLabel flexBasis='40%'>Tipo de cuenta</FormLabel>
            <Select
              {...register('account')}
              placeholder=''
              w='52%'
              size='lg'
              onChange={(e) => setAccount(e.target.value.toLowerCase())}
            >
              {accountType.map((doc) => (
                <option key={doc} value={doc.toLowerCase()}>
                  {doc}
                </option>
              ))}
            </Select>
          </Flex>

          {otherAccount && (
            <CustomInput
              type='text'
              placeholder='Tipo de cuenta'
              register={register}
              nameRegister='account'
              label='Otro'
            />
          )}

          <Flex
            flexFlow='row wrap'
            justifyContent='space-between'
            textAlign='left'
            mt={{ base: '2rem' }}
          >
            <FormLabel flexBasis='40%'>Moneda</FormLabel>
            <Select {...register('currency')} placeholder='' w='52%' size='lg'>
              {currencys.map((doc) => (
                <option key={doc} value={doc.toLowerCase()}>
                  {doc}
                </option>
              ))}
            </Select>
          </Flex>

          <CustomInput
            type='text'
            placeholder='Banco ...'
            register={register}
            nameRegister='bank'
            label='Entidad'
          />

          <PrincipalButton type='submit' text='Siguiente' isStep />
        </FormControl>
      </form>
    </>
  );
};

export default Step5;
