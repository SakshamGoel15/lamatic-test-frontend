import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function MessageSubscription({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SUBSCRIBE_TO_STREAM' });
  }, [dispatch]);

  return children;
}
