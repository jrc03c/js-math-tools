npx jest --testTimeout 60000 &&
npx madge --circular src/index.js &&
npx eslint src &&
echo 'Remember to test coverage as well!'