document.getElementById('create-rule-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const ruleName = document.getElementById('rule-name').value;
    const ruleCondition = document.getElementById('rule-condition').value;
  
    // Prepare the payload to send to the server
    const payload = {
      ruleName: ruleName,
      rule_string: ruleCondition,
    };
  
    fetch('http://localhost:3000/create_rule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the result dynamically
        document.getElementById('rule-result').textContent = JSON.stringify(data, null, 2);
      })
      .catch((error) => {
        document.getElementById('create-rule-error').textContent = 'Error: ' + error;
      });
  });
  

// Add event listener for combining rules
document.getElementById('combine-rules-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const rules = []; // Collect the rules dynamically from the form
    document.querySelectorAll('.rule-container').forEach((ruleContainer) => {
      const rule = ruleContainer.querySelector('input[name="rule"]').value;
      const operator = ruleContainer.querySelector('select[name="operator"]').value;
      rules.push({ rule, operator });
    });
  
    const payload = {
      rules: rules, // Send all the rules and operators to the server
    };
  
    fetch('http://localhost:3000/api/rules/combine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById('combine-rules-result').textContent = JSON.stringify(data, null, 2);
      })
      .catch((error) => {
        document.getElementById('combine-rules-error').textContent = 'Error: ' + error;
      });
  });
  
// Add event listener for evaluating a rule
document.getElementById('evaluate-rule-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const rule = document.getElementById('rule-to-evaluate').value;
    const age = document.getElementById('age').value;
    const country = document.getElementById('country').value;

    const evaluationData = {
      rule: rule,
      age: parseInt(age, 10),
      country: country,
    };

    fetch('http://localhost:3000/evaluate_rule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(evaluationData),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById('evaluation-result').textContent = JSON.stringify(data, null, 2);
      })
      .catch((error) => {
        document.getElementById('evaluate-rule-error').textContent = 'Error: ' + error;
      });
});

// Add event listener for adding new rule input
document.getElementById('add-rule').addEventListener('click', function () {
  const newRuleContainer = document.createElement('div');
  newRuleContainer.classList.add('rule-container');

  // Use backticks for multi-line template literals
  newRuleContainer.innerHTML = `
    <label>Rule:</label>
    <input type="text" name="rule" required />
    <label>Operator:</label>
    <select name="operator">
      <option value="AND">AND</option>
      <option value="OR">OR</option>
    </select>
  `;

  document.getElementById('rules-inputs').appendChild(newRuleContainer);
});
