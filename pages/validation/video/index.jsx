import React, { useState } from 'react';

import { Container, Flex } from '@chakra-ui/react';

import CustomHeader from '../../../src/components/atoms/CustomHeader';
import VideoDoc from '../../../src/components/molecules/VideoDoc';

const Validation = () => {
  const [finish, setFinish] = useState(false);

  return (
    <Container>
      <Flex
        flexFlow='row wrap'
        justifyContent='center'
        alignContent='center'
        textAlign='center'
        h='100%'
      >
        <CustomHeader />
        {!finish ? <VideoDoc setFinish={setFinish} /> : 'otra cosa'}
      </Flex>
    </Container>
  );
};

export default Validation;
