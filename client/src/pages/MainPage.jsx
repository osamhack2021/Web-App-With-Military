import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';


const MainPage = () => {
	const user = useSelector(state => state.userAuth);

  useEffect(()=>{
    console.log(user);
  })

  return(
    <>
      어서오세요 {user.user.userName}님
    </>
  );
};

export default MainPage;