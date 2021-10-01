const app = require('../app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`${PORT}포트 서버 구동 중`);
});
