// utils/ruleUtils.js

function createRuleAST(ruleName, rule) {
    // Example parsing of the rule (assuming a simple case)
    const parts = rule.split(' '); // Split the rule on spaces
    const left = parts[0]; // e.g., "country"
    const operator = parts[1]; // e.g., "=="
    const right = parts[2].replace(/'/g, ""); // e.g., "US"

    return {
        type: "LogicalExpression",
        operator: "AND",
        left: {
            type: "BinaryExpression",
            operator: operator,
            left: {
                type: "Identifier",
                name: left,
            },
            right: {
                type: "Literal",
                value: right,
                raw: `'${right}'`,
            },
        },
        right: null // Or add more rules if needed
    };
}

module.exports = { createRuleAST };
