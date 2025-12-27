const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
    res.json({message: 'hello world'});
})

const PORT = 5001;
server = app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
})