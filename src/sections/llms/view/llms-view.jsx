import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { llms } from 'src/utils/llms';

import LLMCard from '../llm-card';

// ----------------------------------------------------------------------

export default function LLMsView() {
  return (
    <Container>
      <Typography align="center" variant="h4" sx={{ mb: 5 }}>
        Choose your LLMs
      </Typography>

      <Grid container spacing={3}>
        {llms.map((llm) => (
          <Grid key={llm.id} xs={6} sm={6} md={3}>
            <LLMCard llm={llm} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
