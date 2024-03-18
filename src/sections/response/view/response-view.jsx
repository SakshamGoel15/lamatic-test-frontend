import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { AI_STAGES } from 'src/store/slices/llms';

import Loading from '../loading';
import LLMResponse from '../LLMResponse';

export default function ResponseView() {
  const { stage } = useSelector((state) => state.llms);
  const router = useRouter();

  useEffect(() => {
    if (stage === AI_STAGES.ASKING) {
      router.push('/');
    }
  }, [stage, router]);

  if (stage === AI_STAGES.ANSWERING) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }
  if (stage === AI_STAGES.ANSWERED) {
    return (
      <Container>
        <LLMResponse />
      </Container>
    );
  }
  return null;
}
