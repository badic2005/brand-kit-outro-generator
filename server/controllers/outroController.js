const outroService = require('../services/outroService');

exports.generateOutro = (req, res) => {
    const data = req.body
    outroService.createOutroLayer(data)
        .then(() => res.json({ message: 'Outro generated successfully!' }))
        .catch(err => res.status(500).json({ message: 'Error generating outro', error: err.message }));
};