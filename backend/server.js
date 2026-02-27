const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
    res.json({ status: "Servidor Node com a estética Persona online!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
