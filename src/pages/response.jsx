import { Helmet } from 'react-helmet-async';

import { ResponseView } from 'src/sections/response/view';

// ----------------------------------------------------------------------

export default function ResponsePage() {
  return (
    <>
      <Helmet>
        <title> Responses | Lamatic AI </title>
      </Helmet>

      <ResponseView />
    </>
  );
}
