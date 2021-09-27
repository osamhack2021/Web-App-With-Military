import * as React from 'react';
import {Route} from 'react-router-dom';
import Main from "./pages/Main";
import Timer from "./pages/Timer";
import Upload from "./pages/Upload";


import theme from "./styles/palette";
import { createTheme, ThemeProvider } from '@mui/material/styles';

{/* CssBaseline - 브라우저에 상관없이 일괄적인 스타일을 적용 */}

const App = () => {
  return (
    <>
      {/* exact쓰면 경로와 정확히 일치하는 구성 요소를 렌더링한다 */}
      <Route path="/" exact>루트페이지</Route>
      <Route component={Main} path="/main" />
      <Route component={Timer} path="/timer" />
      <Route component={Upload} path="/upload" />
    </>
  );
}

export default App;
