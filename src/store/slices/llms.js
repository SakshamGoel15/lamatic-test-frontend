import { gql } from '@apollo/client';
import { createSlice } from '@reduxjs/toolkit';

import { llms as llmNames } from 'src/utils/llms';

import client from 'src/components/apollo/ApolloClient';

const GET_RESPONSE = gql`
  query GetResponse($prompt: String!) {
    getResponse(prompt: $prompt)
  }
`;

export const AI_STAGES = {
  ASKING: 'ASKING',
  ANSWERING: 'ANSWERING',
  ANSWERED: 'ANSWERED',
};

const STORED_LLMs = localStorage.getItem('llms')
  ? JSON.parse(localStorage.getItem('llms'))
  : llmNames.slice(0, 1);

const initialState = {
  llms: STORED_LLMs,
  questions: [],
  isLoading: false,
  error: null,
  question: '',
  stage: AI_STAGES.ASKING,
  firstModalOpen: true,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.error = false;
    },
    addConversationToLLM(state, action) {
      const { id, response, messageUUID } = action.payload;
      if (!response) return;
      const newLLMs = state.llms.map((llm) => {
        if (llm.id === id) {
          const conversation = llm.conversation.find((conv) => {
            if (conv.messageUUID === messageUUID) {
              conv.content += response;
              return true;
            }
            return false;
          });

          if (!conversation) {
            llm.conversation.push({ role: 'assistant', content: response, messageUUID });
          }
        }
        return llm;
      });
      state.llms = newLLMs;
    },
    // STOP LOADING
    stopLoading(state) {
      state.isLoading = false;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // ADD QUESTION
    addQuestion(state, action) {
      state.questions.push(action.payload);
    },
    addQuestionToLLMs(state, action) {
      state.llms = state.llms.map((llm) => {
        llm.conversation.push({ role: 'user', content: action.payload });
        return llm;
      });
    },
    setLLMs(state, action) {
      state.llms = action.payload;
    },
    // SET QUESTION
    setQuestion(state, action) {
      state.question = action.payload;
    },
    // SET STAGE
    setStage(state, action) {
      state.stage = action.payload;
    },
    addLLM(state, action) {
      if (state.llms.length === 4) {
        alert('You can only add 4 LLMs. Please remove one to add another.');
      } else {
        state.llms.push(action.payload);
      }
      localStorage.setItem('llms', JSON.stringify(state.llms));
    },
    removeLLM(state, action) {
      state.llms = state.llms.filter((llm) => llm.id !== action.payload.id);
      localStorage.setItem('llms', JSON.stringify(state.llms));
    },
    resetAIstate(state) {
      state.questions = [];
      state.llms = state.llms.map((llm) => {
        llm.conversation = [];
        return llm;
      });
    },
    // set sentiment
    setSentiment(state, action) {
      state.sentiment = action.payload;
    },
    // set first modal open
    setFirstModalOpen(state, action) {
      state.firstModalOpen = action.payload;
    },
    // open first modal
    openFirstModal(state) {
      state.firstModalOpen = true;
    },
    // close first modal
    closeFirstModal(state) {
      state.firstModalOpen = false;
    },
  },
});

// Actions
export function addQuestionToState(question) {
  return (dispatch) => {
    const lsQuestions = localStorage.getItem('questions')
      ? JSON.parse(localStorage.getItem('questions'))
      : [];
    lsQuestions.push(question);
    localStorage.setItem('questions', JSON.stringify(lsQuestions));
    dispatch(actions.addQuestion(question));
    dispatch(actions.addQuestionToLLMs(question));
    dispatch(askLLMs());
  };
}

export function askLLMs() {
  return async (dispatch, getState) => {
    const { llms, questions } = getState().llms;
    try {
      const batchedLLMs = llms.map(async (llm) => {
        await client.query({
          query: GET_RESPONSE,
          variables: { prompt: questions[questions.length - 1] },
        });
      });
      await Promise.all(batchedLLMs);
      dispatch(actions.setStage(AI_STAGES.ANSWERED));
    } catch (error) {
      dispatch(actions.hasError(error));
    }
  };
}

// Reducer
export default slice.reducer;
export const { actions } = slice;
