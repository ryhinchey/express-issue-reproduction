const express = require('express');

const app = express();

app.use((req, res) => {
  res.append('Set-Cookie', 'foo=bar');
  res.append('Set-Cookie', 'bar=foo');
  res.send('hi')
})

app.listen(3001, () => console.log('Server Running...'))