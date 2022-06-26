import React from 'react';

import {
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

const CustomInput = ({
  type,
  placeholder,
  register,
  nameRegister,
  icon,
  label,
  isRequired,
}) => {
  return (
    <InputGroup my='2rem'>
      <FormLabel w={{ base: '100%' }} alignSelf='center'>
        {label}
      </FormLabel>
      <InputLeftElement pointerEvents='none'>{icon}</InputLeftElement>
      <Input
        {...register(nameRegister)}
        type={type}
        placeholder={placeholder}
        size='lg'
        fontSize={{ base: '1em', md: '1.5em' }}
        isRequired={isRequired}
        p='0.4em'
      />
    </InputGroup>
  );
};

export default CustomInput;
