// A express server, which will handle api requests coming in and respond back with a json object, it will use body parser as well as cross

const OpenAI = require('openai');
const  { Configuration, OpenAIApi } = OpenAI;
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

const configuration = new Configuration({
    organisation: 'org-9X1jX5H0QX2X5X1X1X1X1X1',
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);


app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const {message} = req.body; 
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: 'I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".\n\nQ: What are Active Companies?\nA: An active company has one or more depots containing atleast one commissioned charger (from which Ford Pro systems have received a heartbeat or metervalue).\n\nQ: What are Requests?\nA: Request is the process of adding a new depot to the database. To add a new depot all the details should be added to the backend.\n\nQ: Which customers are Billable?\nA: A billable customer has one or more billable depots/chargers on either prepaid or monthly billing.\n\nQ: What are Billable Charge Ports??\nA: A billable charger has sent atleast one heartbeat/meter value and has been added to a billable (prepaid or monthly) site where atleast one of the chargers has dispensed 100 kWh+ of energy.\n\nQ: What are Active Depots?\nA: An active depot contains one or more commissioned chargers (from which FordPro central server have received heartbeat or meter value).\n\nQ: What is a Depot?\nA: A depot is a collection of chargers that are used to provide power to Ford Pro systems.\n\nQ: ' + message+'?\nA:',
        max_tokens: 100,
        temperature: 0,
    });
    console.log(response.data)
    if(response.data){
        if(response.data.choices[0].text){
            res.json({
                message: response.data.choices[0].text
            });
        }
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });