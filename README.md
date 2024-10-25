
---

### Rule Engine AST Overview

This project implements a Node.js-based rule engine that allows users to create rules, combine them, and evaluate them based on provided context. The system is designed to manage business logic dynamically through user-defined rules.

### Key Features
- **Create Rule:** Users can define conditions for rules based on various attributes (e.g., age, department).
- **Combine Rules:** Users can combine multiple rules using logical operators (AND, OR).
- **Evaluate Rules:** Users can evaluate the defined rules against a given context to see if they are satisfied.

### Design Approach
- **Modular Architecture:** The system maintains a clear separation of logic for creating, combining, and evaluating rules.
- **Node.js and Express:** The backend is built using Node.js with Express to handle incoming requests.
- **Frontend:** A simple HTML/CSS/JavaScript interface for users to input rules and evaluate them.

### Sample Inputs and Outputs

#### 1. Create Rule
- **Input:**
  - Rule Name: `Rule1`
  - Condition: `age > 30 && department === 'Sales'`
  
- **Output:**
```json
{
  "type": "Rule",
  "condition": "age > 30 && department === 'Sales'",
  "operators": [
    "&&"
  ]
}
```

#### 2. Combine Rules
- **Input:**
  - Left Rule Condition: `salary > 500000 && department === "Marketing"`
  - Right Rule Condition: `salary > 50000`
  - Operator: `OR`
  
- **Output:**
```json
{
  "type": "CombinedRule",
  "left": {
    "type": "Rule",
    "condition": "salary > 500000 && department === 'Marketing'",
    "operators": [
      "&&"
    ]
  },
  "right": {
    "type": "Rule",
    "condition": "salary > 50000",
    "operators": []
  },
  "operator": "OR"
}
```

#### 3. Evaluate Rule
- **Input:**
  - Condition: `age > 18`
  - Value: `19`
  - Context: `{"country": "India"}`
  
- **Output:**
```json
{
  "result": true,
  "context": {
    "age": 19,
    "country": "India"
  }
}
```

### Prerequisites
To run the Rule Engine application, ensure you have the following:

- **Node.js** (v14.0.0 or newer)
- **NPM** (Node Package Manager)

### Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/YourUsername/RuleEngine.git
   cd RuleEngine
   ```

2. **Install Dependencies:**
   After cloning, install the necessary Node.js packages by running:
   ```bash
   npm install
   ```

3. **Start the Application:**
   To start the application, run the following command:
   ```bash
   npm start
   ```
   Access it in the browser at `http://localhost:3000`.

### Frontend
The frontend consists of a simple form where users can:
- Create rules by entering conditions.
- Combine existing rules using logical operators.
- Evaluate rules against a provided context.

### Troubleshooting
- Ensure all input conditions are correctly formatted.
- If no output is received, check server logs for any errors.
- Validate that the Node.js server is running correctly.

### Extending the System
- **Additional Operators:** Implement more complex logical operators (e.g., NOT).
- **User Authentication:** Allow users to save their rules and evaluations.
- **UI Improvements:** Enhance the frontend using frameworks like React or Vue.js for a better user experience.

---

