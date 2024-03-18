import React from 'react';
import { useSelector } from 'react-redux';

import { Box, Grid, Paper, Stack, Avatar, Typography } from '@mui/material';

import ResponseCard from './ResponseCard';
import QuestionInput from './QuestionInput';

export default function LLMResponse() {
  const { llms, questions, firstModalOpen } = useSelector((state) => state.llms);
  return (
    <Stack direction="column" spacing={3}>
      <QuestionInput />
      <Stack direction="column">
        <Stack mb={2} direction="row" spacing={2} alignContent="center" justifyContent="center">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              alignItems: 'center',
            }}
          >
            <Avatar src="/assets/images/avatar_1.jpg" sx={{ mr: 1, ml: 1 }} />
            <Paper
              sx={{
                p: 1,
                position: 'relative',
                bgcolor: 'primary.lighter',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: 0,
                  height: 0,
                  borderTop: '10px solid transparent',
                  borderBottom: '10px solid transparent',
                  right: -10,
                  borderLeft: `10px solid #D0ECFE`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
              <Typography variant="body2">{questions[questions.length - 1]}</Typography>
            </Paper>
          </Box>
        </Stack>
        <Grid container justifyContent="center" spacing={2}>
          {llms.map((llm, index) => (
            <Grid xs={6} sm={6} md={3} item key={llm.id}>
              <ResponseCard isOpen={firstModalOpen && index === 0} key={index} llm={llm} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}
