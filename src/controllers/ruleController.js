// controllers/ruleController.js

exports.createRule = (req, res) => {
    const { ruleString } = req.body;

    // Simulating AST from the rule string
    const ast = {
        type: "LogicalExpression",
        operator: "AND",
        left: {
            type: "BinaryExpression",
            operator: ">",
            left: { type: "Identifier", name: "age" },
            right: { type: "Literal", value: 30, raw: "30" }
        },
        right: {
            type: "BinaryExpression",
            operator: "=",
            left: { type: "Identifier", name: "department" },
            right: { type: "Literal", value: "Sales", raw: "'Sales'" }
        }
    };

    res.status(201).json({ message: 'Rule created successfully', ast });
};

exports.evaluateRule = (req, res) => {
    const { ast, data } = req.body;

    // Simple rule evaluation logic
    const ageMatches = data.age > 30;
    const departmentMatches = data.department === "Sales";

    if (ageMatches && departmentMatches) {
        res.status(200).json({ result: 'Evaluation successful', data });
    } else {
        res.status(400).json({ result: 'Evaluation failed', data });
    }
};

// src/controllers/ruleController.js
exports.combineRules = (req, res) => {
    const rulesArray = req.body.rules;

    // Validate the input
    if (!Array.isArray(rulesArray)) {
        return res.status(400).json({ error: "Invalid input: rules should be an array." });
    }

    if (rulesArray.length === 0) {
        return res.status(400).json({ error: "No rules provided to combine." });
    }

    // Combine the rules
    try {
        const combinedRules = rulesArray.map(rule => {
            // Check if each rule has a valid structure
            if (!rule.rule || !rule.operator) {
                throw new Error("Each rule must have a 'rule' and 'operator'.");
            }
            return `${rule.rule} ${rule.operator}`; // Modify as per your combining logic
        }).join(' ');

        res.status(200).json({ combinedRules });
    } catch (error) {
        console.error("Error combining rules:", error);
        res.status(500).json({ error: "Failed to combine rules: Internal Server Error" });
    }
};
const evaluationData = {
    ast: rule,  // Send rule as a string for now
    data: { age, country }
  };