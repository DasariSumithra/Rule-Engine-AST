// astUtils.js

// Utility function to create a simple rule
export function createRule(condition, action) {
    return {
        condition: new Function('context', `return ${condition}`), // context refers to the data on which the rule is applied
        action: action
    };
}

// Utility function to evaluate a rule
export function evaluateRule(rule, context) {
    try {
        return rule.condition(context);
    } catch (err) {
        console.error('Error evaluating rule:', err);
        return false;
    }
}

// Utility function to combine multiple rules using logical AND
export function combineRules(rules, context) {
    return rules.every(rule => evaluateRule(rule, context));
}

// Function to parse a rule into an AST
export function parseRule(ruleCondition) {
    // A simplified AST parser for basic conditions
    const ast = {
        type: 'Rule',
        condition: ruleCondition,
        operators: extractOperators(ruleCondition)
    };
    return ast;
}

// Function to parse two rules and combine them into an AST
export function parseCombinedRule(rule1, rule2, operator) {
    return {
        type: 'CombinedRule',
        left: parseRule(rule1),
        right: parseRule(rule2),
        operator: operator
    };
}

// Extract operators from a condition (example)
function extractOperators(condition) {
    // Example function to extract operators, expand this based on your rule's complexity
    return condition.match(/AND|OR|&&|\|\|/g) || [];
}
