import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import run from './run.js';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/save-drawing', async(req, res) => {
    const { image } = req.body;
    if (!image) {
        return res.status(400).send({ error: 'No image data provided.' });
    }

    // Remove the 'data:image/png;base64,' prefix
    const base64Data = image.replace(/^data:image\/png;base64,/, '');

    // Save the image to the server
    await fs.writeFile('whiteboard-drawing.png', base64Data, 'base64', async (err) => {
        if (err) {
            console.error('Error saving image:', err);
            return res.status(500).send({ error: 'Failed to save image.' });
        }

        let result = await run();
        res.send({ result });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
