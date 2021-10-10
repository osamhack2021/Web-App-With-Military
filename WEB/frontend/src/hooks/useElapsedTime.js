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
  const formedTimeString = `${hour}:${minute}:${second}`;

  useEffect(() => {
    let intervalId;
    axios
      .get('studying/start')
      .then(res => res.data)
      .then(({ isStudyingNow, elapsedTime: updatedElapsedTime }) => {
        setElapsedTime(updatedElapsedTime);
      })
      .then(() => {
        intervalId = setInterval(
          () => setElapsedTime(elapsedTime => elapsedTime + 1),
          1000,
        );
      });
    // axios
    //   .get('/studying/status', {
    //     validateStatus(status) {
    //       return status < 500;
    //     },
    //   })
    //   .catch(error => history.push('/error'))
    //   .then(
    //     res =>
    //       // TODO: exit async task when response comes with error status code
    //       res.data,
    //   )
    //   .then(({ isStudyingNow, elapsedTime: measuredElapsedTime }) => {
    //     if (!isStudyingNow) {
    //       axios
    //         .get('/studying/start')
    //         .then(res => res.data)
    //         .then(({ elapsedTime: updatedElapsedTime, isStudyingNow }) => {
    //           if (isStudyingNow) {
    //             setElapsedTime(updatedElapsedTime);
    //           }
    //         });
    //     } else {
    //       setElapsedTime(measuredElapsedTime);
    //     }
    //     intervalId = setInterval(
    //       () => setElapsedTime(elapsedTime => elapsedTime + 1),
    //       1000,
    //     );
    //   });

    return function cleanup() {
      if (intervalId) clearInterval(intervalId);
    };
  }, [elapsedTime, setElapsedTime]);

  return { elapsedTime, formedTimeString };
};

export default useElapsedTime;
