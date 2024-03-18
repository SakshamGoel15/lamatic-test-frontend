import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Stack, Button, TextField, IconButton, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { actions, AI_STAGES, addQuestionToState } from 'src/store/slices/llms';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function QuestionInput() {
  const dispatch = useDispatch();
  const [isListening, setIsListening] = useState(false);
  const { question } = useSelector((state) => state.llms);
  const router = useRouter();

  const handleQuestionChange = (event) => {
    dispatch(actions.setQuestion(event.target.value));
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition.');
      return;
    }

    if (isListening) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.onstart = () => {
      setIsListening(true);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.onresult = (event) => {
      const { transcript } = event.results[0][0];
      dispatch(actions.setQuestion(transcript));
    };
    recognition.start();
  };

  const handleSubmit = () => {
    dispatch(addQuestionToState(question));
    dispatch(actions.setQuestion(''));
    dispatch(actions.setStage(AI_STAGES.ANSWERED));
    dispatch(actions.openFirstModal());
    router.push('/response');
  };

  return (
    <Stack spacing={3} direction="column">
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          label="Continue the conversation..."
          placeholder="What's on your mind?"
          variant="outlined"
          value={question}
          onChange={handleQuestionChange}
        />
        <IconButton onClick={handleVoiceInput}>
          <Iconify icon="eva:mic-fill" />
        </IconButton>
      </Stack>
      {isListening && <Typography variant="caption">Listening...</Typography>}
      <Button onClick={handleSubmit} variant="contained">
        Ask!
      </Button>
    </Stack>
  );
}
