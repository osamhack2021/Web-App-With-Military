import { useState, useEffect } from 'react';
import useSwr from 'swr';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';

const fetcher = url =>
  axios
    .get(url, {
      validateStatus(status) {
        return status < 500;
      },
    })
    .then(res => res.data);

const useElapsedTime = () => {
  const history = useHistory();
  const [elapsedTime, setElapsedTime] = useState(0);

  const hour = Math.floor(elapsedTime / 3600);
  const minute = Math.floor((elapsedTime % 3600) / 60);
  const second = elapsedTime % 60;

  const formedTime = { hour, minute, second };
  const formedTimeString = `{hour}:{minute}:{second}`;

  useEffect(() => {
    let intervalId;
    axios
      .get('/timer/status', {
        validateStatus(status) {
          return status < 500;
        },
      })
      .then(res => {
        if (res.error.status === 500) {
          history.push('/error');
        }
        // TODO: exit async task when response comes with error status code
        return res.data;
      })
      .then(({ elapsedTime: currentElapsedTime, isStudyingNow }) => {
        if (isStudyingNow) {
          intervalId = setElapsedTime(currentElapsedTime);
        }
      });

    return function cleanup() {
      if (intervalId) clearInterval(intervalId);
    };
  });

  return { elapsedTime, formedTimeString };
};

export default useElapsedTime;
