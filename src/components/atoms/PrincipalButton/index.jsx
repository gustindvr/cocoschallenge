import React from 'react';

import { Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const PrincipalButton = ({ text, isStep, disabled }) => {
  return (
    <Button
      type='submit'
      colorScheme='whiteAlpha'
      p={{ base: '0.5rem', sm: '1rem', md: '2rem' }}
      my='3rem'
      style={{ backgroundColor: 'var(--principal-color)' }}
      fontSize={{ base: '0.9em', sm: '1em', md: '1.2em', lg: '1.5em' }}
      disabled={disabled}
    >
      {isStep && <ArrowForwardIcon mr='0.5rem' />}
      {text}
    </Button>
  );
};

export default PrincipalButton;
