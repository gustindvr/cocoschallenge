import React, { useEffect, useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { useDispatch } from 'react-redux';

import {
  AspectRatio,
  Button,
  Container,
  Heading,
  Text,
} from '@chakra-ui/react';
import { postVideoDoc } from '../../../store/Slices/dataSlice';

const VideoDoc = ({ setFinish }) => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [url, setUrl] = useState(null);

  const dispatch = useDispatch();

  const handleStartCaptureClick = useCallback(() => {
    setUrl(null);
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const sendVideo = async (url) => {
    const response = await dispatch(postVideoDoc(url));
    if (response.payload) {
      setUrl(null);
      setRecordedChunks([]);
      setFinish(true);
    }
  };

  useEffect(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const url = URL.createObjectURL(blob);
      setUrl(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <Container>
      <div className='message-video'></div>

      {!url ? (
        <>
          <Webcam audio={false} ref={webcamRef} />
          {capturing ? (
            <>
              <Text
                fontSize='sm'
                fontWeight='bold'
                color='var(--color-green-text)'
                p='1rem'
                mt='0.3rem'
                border='0.2rem solid var(--principal-color)'
              >
                Sostenga el dni con su mano, colocando el frente junto a su
                rostro y procurando que logren verse todos los datos. Una vez
                finalizado, confirme que el video se ve correctamente y envielo
              </Text>
              <Button
                color='whiteAlpha.900'
                backgroundColor='var(--principal-color)'
                onClick={handleStopCaptureClick}
                mt='1rem'
                mb='2rem'
              >
                Parar Video
              </Button>
            </>
          ) : (
            <Button
              color='whiteAlpha.900'
              backgroundColor='var(--principal-color)'
              onClick={handleStartCaptureClick}
              mt='1rem'
              mb='2rem'
            >
              Comenzar Video
            </Button>
          )}
        </>
      ) : (
        <>
          <Heading as='h3' fontSize='2xl' fontWeight='bold'>
            Previsualizar
          </Heading>
          <AspectRatio maxW='560px' ratio={1}>
            <iframe title='recor_validation' src={url} />
          </AspectRatio>
          <Button
            variant='outline'
            color='var(--principal-color)'
            m={{ base: '1rem', lg: '1rem 2rem 2rem 0' }}
            onClick={() => {
              setUrl(null);
              window.scrollTo(0, 0);
            }}
          >
            Nuevo video
          </Button>
          <Button
            color='whiteAlpha.900'
            backgroundColor='var(--principal-color)'
            mt='1rem'
            mb={{ base: '1rem', lg: '2rem' }}
            onClick={() => sendVideo(url)}
          >
            Enviar
          </Button>
        </>
      )}
    </Container>
  );
};

export default VideoDoc;
