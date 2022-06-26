import { Container, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingData from '../../src/components/molecules/LoadingData';
import Step1 from '../../src/components/molecules/steps/step1';
import Step2 from '../../src/components/molecules/steps/step2';
import Step3 from '../../src/components/molecules/steps/step3';
import Step4 from '../../src/components/molecules/steps/step4';
import Step5 from '../../src/components/molecules/steps/step5';

const Steps = () => {
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [step5, setStep5] = useState(false);

  const { userData } = useSelector((state) => state?.userData);

  console.log(userData);

  return (
    <Container>
      <Flex
        flexFlow='row wrap'
        justifyContent='center'
        alignContent='center'
        textAlign='center'
        h='100%'
      >
        {!step1 && <Step1 setStep1={setStep1} />}
        {step1 && !step2 && <Step2 setStep2={setStep2} />}
        {step2 && !step3 && <Step3 setStep3={setStep3} />}
        {step3 && !step4 && <Step4 setStep4={setStep4} />}
        {step4 && !step5 && <Step5 setStep5={setStep5} />}
        {step5 && <LoadingData />}
      </Flex>
    </Container>
  );
};

export default Steps;
