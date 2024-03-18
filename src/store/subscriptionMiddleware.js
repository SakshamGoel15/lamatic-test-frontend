import { gql } from '@apollo/client';

import { llms } from 'src/utils/llms';

import client from 'src/components/apollo/ApolloClient';

import { actions } from './slices/llms';

const RESPONSE_SUBSCRIPTION = gql`
  subscription StreamResult {
    streamResult
  }
`;

export const subscriptionMiddleware = (store) => {
  let subscription = null;

  return (next) => (action) => {
    if (action.type === 'SUBSCRIBE_TO_STREAM') {
      if (subscription) {
        subscription.unsubscribe(); // Ensure we don't create multiple subscriptions
      }

      subscription = client.subscribe({ query: RESPONSE_SUBSCRIPTION }).subscribe({
        next({ data }) {
          if (data) {
            const { streamResult } = data;
            const parsedResult = JSON.parse(streamResult);
            const { agent, response, messageUUID } = parsedResult;
            const llmId = llms.find((llm) => llm.name === agent).id;
            store.dispatch(actions.addConversationToLLM({ id: llmId, response, messageUUID }));
          }
        },
        error(err) {
          console.error('Subscription error:', err);
        },
      });
    }

    return next(action);
  };
};
