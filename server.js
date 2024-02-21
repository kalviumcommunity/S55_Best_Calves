const express = require('express');
const app = express();
const port = '3000';

app.get('/ping', function(req, res){
  res.send('Hello')
})

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
  });
}

module.exports = app;