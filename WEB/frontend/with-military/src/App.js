import {Route} from 'react-router-dom';
import MainPage from "./pages/MainPage";
import TimerPage from "./pages/TimerPage";

const App = () => {
  return (
    <>
      {/* exact쓰면 경로와 정확히 일치하는 구성 요소를 렌더링한다 */}
      <Route path="/" exact>루트 페이지</Route>
      <Route component={MainPage} path="/main" />
      <Route component={TimerPage} path="/timer" />
    </>
  );
}

export default App;
