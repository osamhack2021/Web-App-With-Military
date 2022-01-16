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
  const [intervalId, setIntervalId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const hour = Math.floor(elapsedTime / 3600);
  const minute = Math.floor((elapsedTime % 3600) / 60);
  const second = elapsedTime % 60;

  const formedTime = { hour, minute, second };
  const formedTimeString = `${hour}:${minute}:${second}`;

  useEffect(() => {
    axios
      .get('/studying/', {
        validateStatus(status) {
          return status < 500;
        },
      })
      .catch(error => history.push('/error'))
      .then(
        res =>
          // TODO: exit async task when response comes with error status code
          res.data,
      )
      .then(
        ({
          isStudyingNow,
          isPaused: updatedIsPaused,
          elapsedTime: estimatedElapsedTime,
        }) => {
          if (isStudyingNow) {
            setElapsedTime(estimatedElapsedTime);
            setIsStarted(true);
            setIsPaused(updatedIsPaused);
            if (!updatedIsPaused) {
              setIntervalId(
                setInterval(
                  () => setElapsedTime(elapsedTime => elapsedTime + 1),
                  1000,
                ),
              );
            }
          }
        },
      );

    return function cleanup() {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const start = () => {
    axios
      .post('/studying/start', { userName: '12345', groupName: '12345' })
      .then(res => res.data)
      .then(({ isStudyingNow, elapsedTime: updatedElapsedTime }) => {
        setElapsedTime(updatedElapsedTime);
        setIsStarted(true);
        setIntervalId(
          setInterval(
            () => setElapsedTime(elapsedTime => elapsedTime + 1),
            1000,
          ),
        );
      });
  };

  const stop = () => {
    if (isStarted) {
      axios
        .get('/studying/end')
        .then(res => res.data)
        .then(({ isSuccessful }) => {
          if (isSuccessful) {
            alert('종료하였습니다.');
            if (intervalId) clearInterval(intervalId);
            setIsPaused(false);
            setIsStarted(false);
            setElapsedTime(0);
          }
        });
    } else {
      alert('아직 시작하지 않았습니다.');
    }
  };

  const pause = () => {
    axios
      .get('/studying/pause')
      .then(res => res.data)
      .then(({ isSuccessful, isStudyingNow, message }) => {
        if (!isSuccessful) {
          if (isStudyingNow === false) {
            alert('공부를 시작하지 않았습니다.');
            return;
          }
          alert('이미 쉬는 중 입니다!');
        }
        if (intervalId) clearInterval(intervalId);
        setIsPaused(true);
      });
  };

  const resume = () => {
    axios
      .get('/studying/resume')
      .then(res => res.data)
      .then(
        ({
          isSuccessful,
          isStudyingNow,
          message,
          elapsedTime: updatedElapsedTime,
        }) => {
          if (!isSuccessful) {
            alert(message);
            return;
          }
          setIsPaused(false);
          setElapsedTime(updatedElapsedTime);
          setIntervalId(
            setInterval(
              () => setElapsedTime(elapsedTime => elapsedTime + 1),
              1000,
            ),
          );
        },
      );
  };

  return {
    elapsedTime,
    formedTimeString,
    resume,
    pause,
    isPaused,
    isStarted,
    stop,
    start,
  };
};

export default useElapsedTime;
