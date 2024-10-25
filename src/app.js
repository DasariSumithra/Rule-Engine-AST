const express = require('express');
const bodyParser = require('body-parser');
// const { createRule, evaluateRule, combineRules } = require('./routes'); 
const cors = require('cors'); // Import the cors package
const { Parser } = require('expr-eval'); // Import the expr-eval library for evaluating expressions

const app = express();

// Use cors middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Store rules in memory (in a real app, consider a database)
let rules = [];

// Route to create a new rule
app.post('/create_rule', (req, res) => {
  try {
      const ast = createRule(req.body.rule_string);
      res.json(ast);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});


// Route to combine rules
app.post('/api/rules/combine', (req, res) => {
  const { rules: inputRules } = req.body;

  // Check for empty rules
  if (!inputRules || inputRules.length === 0) {
    return res.status(400).json({ error: 'At least one rule is required to combine.' });
  }

  let combinedRule = '';

  inputRules.forEach((ruleObj, index) => {
    const { rule, operator } = ruleObj;

    // Validate each rule and operator
    if (!rule) {
      return res.status(400).json({ error: 'Each rule must have a valid condition.' });
    }

    if (index === 0) {
      combinedRule += `(${rule})`; // Start with the first rule
    } else {
      combinedRule += ` ${operator} (${rule})`; // Append with the operator
    }
  });

  res.status(200).json({ combinedRule }); // Return the combined rule
});

// Route to evaluate a rule
app.post('/evaluate_rule', (req, res) => {
  try {
      const result = evaluateRule(req.body.ast, req.body.data);
      res.json({ result });
  } catch (error) {
      res.status(400).json({ error: `Error evaluating rule: ${error.message}` });
  }
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


