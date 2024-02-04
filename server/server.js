const express = require('express');
const cors = require('cors');
const outroController = require('./controllers/outroController');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/generate-outro', outroController.generateOutro);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
