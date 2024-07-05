const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyDzcXqLNCGh4pBhB3CHLkb8x7uoly_oEq4');


router.post('/diagnose', async (req, res, next) => {
    const { age, symptoms } = req.body;
    const prompt = `User age: ${age}. Symptoms: ${symptoms}.`;
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const newtext = await response.text();
      
      // Log the raw response to inspect what's being returned
      console.log("Raw response from Generative AI:", newtext);
  
      // Example of handling response and parsing
      const diseases = JSON.parse(newtext); // Adjust parsing based on actual response format
  
      res.status(200).json({
        age: age,
        possibleDiseases: diseases
      });
    } catch (error) {
      console.error("Error generating medical information:", error);
      next(error); // Pass error to error handling middleware
    }
  });
  