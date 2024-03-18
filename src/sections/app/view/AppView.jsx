import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Grid, Stack, Button } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

// import { useResponsive } from 'src/hooks/use-responsive';

import { actions } from 'src/store/slices/llms';

import QuestionInput from '../question-input';

// ----------------------------------------------------------------------

export default function AppView() {
  const router = useRouter();
  const dispatch = useDispatch();
  // const isMobile = useResponsive('down', 'sm');

  const handleChooseLLMs = () => {
    router.push('/llms');
  };

  useEffect(() => {
    dispatch(actions.resetAIstate());
  }, [dispatch]);

  return (
    <Container
      className="animate__animated animate__fadeIn"
      sx={{
        position: 'relative',
      }}
    >
      <Stack spacing={2} direction="column" alignItems="center" sx={{}}>
        <Box
          component="img"
          src="/assets/lamatic.png"
          className="animate__animated animate__lightSpeedInRight"
          sx={{
            top: 0,
            width: 1,
            height: 1,
            objectFit: 'cover',
            maxHeight: '300px',
            maxWidth: '300px',
          }}
        />

        <QuestionInput />
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleChooseLLMs}>
          Click here to choose your LLMs!
        </Button>
      </Stack>

      <Stack direction="column" alignItems="center" mt={2}>
        <Typography align="center" variant="h4" sx={{ mb: 1 }}>
          Example questions
        </Typography>
        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              onClick={() =>
                dispatch(
                  actions.setQuestion(
                    'What are the benefits of no code backend development for quick AI apps?'
                  )
                )
              }
              variant="contained"
              color="primary"
              sx={{ mr: 2, maxWidth: '300px' }}
            >
              &quot;What are the benefits of no code backend development for quick AI apps?&quot;
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              onClick={() => dispatch(actions.setQuestion('Write code for DFS in javascript'))}
              variant="contained"
              color="primary"
              sx={{ mr: 2, maxWidth: '300px' }}
            >
              &quot;Write code for DFS in javascript&quot;
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              onClick={() => dispatch(actions.setQuestion('Do you know what lamatic.ai does?'))}
              variant="contained"
              color="primary"
              sx={{ mr: 2, maxWidth: '300px' }}
            >
              &quot;Do you know what lamatic.ai does?&quot;
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              onClick={() =>
                dispatch(
                  actions.setQuestion('How can LLMs help me with creating a no code backend?')
                )
              }
              variant="contained"
              color="primary"
              sx={{ mr: 2, maxWidth: '300px' }}
            >
              &quot;How can LLMs help me with creating a no code backend?&quot;
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
