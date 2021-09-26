const app = require('../app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`(${PORT}포트 연결 성공) Engine On 우주로 ~`);
});
