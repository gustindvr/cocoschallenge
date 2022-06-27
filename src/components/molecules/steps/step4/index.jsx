import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Router from 'next/router';

import {
  Text,
  Checkbox,
  Flex,
  Container,
  CheckboxGroup,
  Stack,
  Link,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';

import CustomHeader from '../../../atoms/CustomHeader';
import PrincipalButton from '../../../atoms/PrincipalButton';

import { postNewData } from '../../../../store/Slices/dataSlice';

const Step4 = ({ setStep4 }) => {
  const [disabledButton, setDisabledButton] = useState(true);
  const [conditions, setConditions] = useState([]);
  const [taxOtherCountry, setTaxOtherCountry] = useState('');
  const [lawfulfunds, setLawfulfunds] = useState('');

  const { userData } = useSelector((state) => state.userData);

  const { handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    data = { ...data, conditions, taxOtherCountry, lawfulfunds };
    data = { ...data, step: '4 completed' };
    console.log(data);
    const response = await dispatch(postNewData(data));
    if (response.payload) {
      setStep4(true);
    }
  };
  useEffect(() => {
    if (conditions !== [] && taxOtherCountry !== '' && lawfulfunds !== '') {
      setDisabledButton(false);
    }
  }, [conditions, taxOtherCountry, lawfulfunds]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <CustomHeader />

      <Text fontSize={{ base: '1.5em', sm: '2em' }} fontWeight='bold'>
        Datos residenciales
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize={{ base: '1.5em', sm: '2em' }}>
          ¿Cumplís alguna de las siguientes condiciones?
        </Text>
        <CheckboxGroup onChange={(e) => setConditions(e)}>
          <Stack
            justifyContent='center'
            spacing={[1, 5]}
            direction={['column', 'row']}
            my='1rem'
            ml={{ base: '40%', sm: '0' }}
          >
            <Checkbox value='SOI'>SOI</Checkbox>
            <Checkbox value='PEP'>PEP</Checkbox>
            <Checkbox value='FATCA'>FATCA</Checkbox>
            <Checkbox value='Ninguna'>Ninguna</Checkbox>
          </Stack>
        </CheckboxGroup>

        <Text>
          ¿No estas seguro? <Link color='blue.300'>Consulta acá</Link>
        </Text>

        <Text fontSize={{ base: '1.5em', sm: '2em' }} my='1rem'>
          ¿Tributas en otro país además de Argntina?
        </Text>
        <RadioGroup
          value={taxOtherCountry}
          onChange={(e) => setTaxOtherCountry(e)}
        >
          <Stack direction='row' justifyContent='center'>
            <Radio value='yes'>Si</Radio>
            <Radio value='no'>No</Radio>
          </Stack>
        </RadioGroup>

        <Text fontSize={{ base: '1.5em', sm: '2em' }} my='1rem'>
          ¿Sus fondos provienen de origenes lícitos?
        </Text>
        <RadioGroup onChange={(e) => setLawfulfunds(e)} value={lawfulfunds}>
          <Stack direction='row' justifyContent='center'>
            <Radio value='yes'>Si</Radio>
            <Radio value='no'>No</Radio>
          </Stack>
        </RadioGroup>

        <PrincipalButton
          type='submit'
          text='Siguiente'
          isStep
          disabled={disabledButton}
        />
      </form>
    </>
  );
};

export default Step4;
