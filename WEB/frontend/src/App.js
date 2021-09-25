import {Route} from 'react-router-dom';
import Main from "./pages/Main";
import Timer from "./pages/Timer";

const App = () => {
  return (
    <>
      {/* exact쓰면 경로와 정확히 일치하는 구성 요소를 렌더링한다 */}
      <Route path="/" exact>루트 페이지</Route>
      <Route component={Main} path="/main" />
      <Route component={Timer} path="/timer" />
    </>
  );
}

export default App;
