import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';

import Iconify from './iconify';

function Speaker({ phrase, role, name, sx }) {
  const speak = () => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = phrase;

    // Select a voice from the available list
    const voices = window.speechSynthesis
      .getVoices()
      .filter((voice) => voice.lang.includes('en-US'));
    let llmVoice;

    switch (name) {
      case 'chat-gpt-3.5-turbo-0125':
        llmVoice = voices.find((voice) => voice.name === 'Grandpa (English (United States))');
        break;
      case 'Facebook LAMA':
        llmVoice = voices.find((voice) => voice.name === 'Aaron');
        break;
      default:
        llmVoice = voices[0];
    }

    if (llmVoice) {
      msg.voice = llmVoice;
    }

    window.speechSynthesis.speak(msg);
  };

  useEffect(
    () => () => {
      window.speechSynthesis.cancel();
    },
    []
  );

  if (role === 'assistant') {
    return (
      <Box
        sx={{
          ...sx,
          borderRadius: '50%',
          width: 30,
          height: 30,
          padding: 0,
          bgcolor: 'primary.lighter',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        variant="contained"
        size="small"
        color="primary"
        onClick={speak}
      >
        <Iconify icon="eva:volume-up-fill" />
      </Box>
    );
  }
  return null;
}

Speaker.propTypes = {
  phrase: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default Speaker;
