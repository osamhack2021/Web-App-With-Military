// .eslintrc.js

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'airbnb', 'plugin:prettier/recommended'],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    // mongodb에서 _id로 데이터 불러올때 설정
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
  },
  // 위처럼 플러그인 이름 + / + rule 이름을 키로 하고 뒤는 공식문서에 나온 설명대로 원하는 규칙으로 설정해줍니다.
};
