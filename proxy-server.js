const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

const app = express();
app.use(cors());

app.get('/api/figures/search', async (req, res) => {
    try {
        const { q } = req.query;
        const response = await axios.get(`https://myfigurecollection.net/api.php?mode=search&root=0&name=${encodeURIComponent(q)}`);
        const parser = new XMLParser();
        const jsonObj = parser.parse(response.data);

        // Extração segura dependendo do formato do XML do MFC
        let items = [];
        if (jsonObj.root && jsonObj.root.item) {
            items = Array.isArray(jsonObj.root.item) ? jsonObj.root.item : [jsonObj.root.item];
        }

        const formattedItems = items.slice(0, 5).map(item => ({
            id: item.id,
            title: item.name,
            company: item.manufacturer || 'Desconhecido',
            image: `https://static.myfigurecollection.net/pics/figure/big/${item.id}.jpg`
        }));

        res.json(formattedItems);
    } catch (error) {
        console.error("Erro no proxy:", error.message);
        res.status(500).json({ error: "Falha ao buscar no MFC" });
    }
});

app.listen(3001, () => console.log('Proxy do MFC rodando na porta 3001!'));
