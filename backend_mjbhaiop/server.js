//http://localhost:5000/api/medical/diagnose
//AIzaSyDzcXqLNCGh4pBhB3CHLkb8x7uoly_oEq4

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI('AIzaSyDzcXqLNCGh4pBhB3CHLkb8x7uoly_oEq4');

// Routes
const router = express.Router();

router.post('/diagnose', async (req, res, next) => {
  const { age, symptoms, gender } = req.body;
  const prompt = `User age: ${age}. Symptoms: ${symptoms}. Gender: ${gender}. Analyse the above details and generate an array of 5 most probable diseases, with their probability according to symptom, age and gender. 
    This is just for a practice academic project so be as precise as you can.
    Also provide me the output in the following format: {
      success: true, // only if the prompt was related to healthcare
      possibilities: [
        {
          "disease": "viral-fever",
          "probability": 0.50
        },
        {
          "disease": "dengue",
          "probability": 0.10
        },
        {
          "disease": "Influenza",
          "probability": 0.30
        },
        {
          "disease": "Gastroenteritis",
          "probability": 0.60
        }
      ]
    }
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const newtext = await response.text();
    
    // Log the raw response to inspect what's being returned
    console.log("Raw response from Generative AI:", newtext);

    // Extract JSON from response
    const jsonStartIndex = newtext.indexOf('{');
    const jsonEndIndex = newtext.lastIndexOf('}') + 1;
    const jsonString = newtext.substring(jsonStartIndex, jsonEndIndex);

    const json = JSON.parse(jsonString);
    res.status(200).json(json);
  } catch (error) {
    console.error("Error generating medical information:", error);
    next(error); // Pass error to error handling middleware
  }
});

app.use('/api/medical', router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
