import React from 'react';

import { Image } from '@chakra-ui/react';

const CustomHeader = () => {
  return (
    <Image
      src='/principal-img.png'
      width={{ base: 300, md: 400 }}
      height={{ base: 200, md: 300 }}
      alt='corp image'
    />
  );
};

export default CustomHeader;
