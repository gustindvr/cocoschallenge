import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { useDispatch } from 'react-redux';

import { obtainDocsPhotos } from '../../../store/Slices/dataSlice';

import { Box, Button, Container, Image, Input, Text } from '@chakra-ui/react';

const PhotoDoc = ({ setFrontCard, setBackCard, isFront, isBack }) => {
  const [front, setFront] = useState(undefined);

  const dispatch = useDispatch();

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };

  const sendFrontCard = async () => {
    if (isFront) {
      const response = await dispatch(obtainDocsPhotos(front));

      if (response.payload) {
        setFrontCard(true);
      }
    }
    if (isBack) {
      const response = await dispatch(obtainDocsPhotos(front));

      if (response.payload) {
        setBackCard(true);
      }
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <Container>
      {front ? (
        <>
          <Text fontSize='lg' fontWeight='semibold' mb='2rem'>
            Por favor verifica que la imagen no se vea borrosa o con manchas y
            que toda la información se vea correctamente
          </Text>
          <Image src={front} alt='frontCard' />
          <Box mb='2rem'>
            <Button
              backgroundColor='var(--principal-color)'
              color='whiteAlpha.900'
              mt='2rem'
              mr='2rem'
              onClick={() => setFront(undefined)}
            >
              Volver a sacar
            </Button>
            <Button
              backgroundColor='var(--principal-color)'
              color='whiteAlpha.900'
              mt='2rem'
              onClick={sendFrontCard}
            >
              Enviar
            </Button>
          </Box>
        </>
      ) : (
        <>
          <div className='box-card'></div>
          <Webcam
            audio={false}
            height={720}
            screenshotFormat='image/jpeg'
            width={1280}
            videoConstraints={videoConstraints}
          >
            {({ getScreenshot }) => (
              <>
                <Button
                  backgroundColor='var(--principal-color)'
                  color='whiteAlpha.900'
                  mt='2rem'
                  onClick={() => {
                    const imageSrc = getScreenshot();
                    setFront(imageSrc);
                  }}
                >
                  Tomar Foto
                </Button>
                <Box mt='2rem'>
                  <label htmlFor='file_upload' className='upload-image-doc '>
                    Subir foto
                  </label>
                  <input
                    id='file_upload'
                    type='file'
                    onChange={(e) => {
                      const [file] = file_upload.files;
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setFront(url);
                      }
                    }}
                  />
                </Box>
              </>
            )}
          </Webcam>
        </>
      )}
    </Container>
  );
};

export default PhotoDoc;
