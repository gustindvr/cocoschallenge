import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import {
  Text,
  FormControl,
  Select,
  Checkbox,
  Flex,
  Box,
  Container,
  FormLabel,
} from '@chakra-ui/react';

import CustomHeader from '../../../atoms/CustomHeader';
import CustomInput from '../../../atoms/CustomInput';
import PrincipalButton from '../../../atoms/PrincipalButton';

import { postNewData } from '../../../../store/Slices/dataSlice';

const Step1 = ({ setStep1 }) => {
  const [legals, setLegals] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [doc, setDoc] = useState('');

  const { userData } = useSelector((state) => state.userData);

  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();

  const optionsDocuments = ['', 'DNI', 'Pasaporte', 'LC', 'LE'];

  const onSubmit = async (data) => {
    data = { ...data, legals };
    const response = await dispatch(postNewData(data));
    if (response.payload) {
      setStep1(true);
    }
  };

  console.log('dataUser', userData);

  useEffect(() => {
    if (legals) {
      setDisabledButton(false);
    }
    if (!legals) {
      setDisabledButton(true);
    }
  }, [legals]);

  return (
    <>
      <CustomHeader />
      <Text
        textAlign='justify'
        fontWeight={700}
        fontSize={{ base: '1em', lg: '1.5em' }}
      >
        Bienvenido/a, antes de comenzar queremos decirte que tus datos están
        seguros y solamente serán utilizados con fines propios de la empresa y
        nunca serán vendidos, cedidos o transferidos.
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired onSubmit={(e) => console.log(e)}>
          <CustomInput
            type='number'
            placeholder='Teléfono'
            register={register}
            nameRegister='phone'
            label='Teléfono'
          />
          <CustomInput
            type='email'
            placeholder='cocos@capital.com'
            register={register}
            nameRegister='email'
            label='Email'
          />
          <Flex
            flexFlow='row wrap'
            justifyContent='space-between'
            textAlign='left'
          >
            <FormLabel flexBasis='40%'>Tipo de documento</FormLabel>
            <Select
              {...register('document')}
              placeholder=''
              w='50%'
              size='lg'
              onChange={(e) => setDoc(e.target.value)}
            >
              {optionsDocuments.map((doc) => (
                <option key={doc} value={doc.toLowerCase()}>
                  {doc}
                </option>
              ))}
            </Select>
          </Flex>

          <CustomInput
            type='number'
            placeholder={`N° ${doc.toUpperCase()}`}
            register={register}
            nameRegister='numberDoc'
            label='Número de documento'
          />
          <Box fontSize={{ base: '1em', md: '1.5em' }}>
            <Checkbox
              colorScheme='green'
              m='1rem'
              onChange={(e) => setLegals(e.target.checked)}
            >
              <Text color='var(--color-green-text)' textAlign='justify'>
                Declaro bajo juramento que toda la información consignada en el
                presente formulario es fehaciente y he leído y acepto los
                términos de la APertura de Cuenta Comitente.
              </Text>
            </Checkbox>
          </Box>

          <PrincipalButton
            type='submit'
            text='Siguiente'
            isStep
            disabled={disabledButton}
          />
        </FormControl>
      </form>
    </>
  );
};

export default Step1;
