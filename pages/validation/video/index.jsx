import React, { useState } from 'react';

import { Container, Flex } from '@chakra-ui/react';

import CustomHeader from '../../../src/components/atoms/CustomHeader';
import VideoDoc from '../../../src/components/molecules/VideoDoc';
import EndApp from '../../../src/components/molecules/EndApp';

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
        {!finish ? <VideoDoc setFinish={setFinish} /> : <EndApp />}
      </Flex>
    </Container>
  );
};

export default Validation;
