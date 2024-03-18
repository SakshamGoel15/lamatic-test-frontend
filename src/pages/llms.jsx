import { Helmet } from 'react-helmet-async';

import { LLMsView } from 'src/sections/llms/view';

// ----------------------------------------------------------------------

export default function LLMsPage() {
  return (
    <>
      <Helmet>
        <title> LLMs | Lamatic AI </title>
      </Helmet>

      <LLMsView />
    </>
  );
}
