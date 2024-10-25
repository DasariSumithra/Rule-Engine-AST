// ruleEngineService.js

import { createRule, evaluateRule as evalRule, combineRules as combineASTRules, parseRule, parseCombinedRule } from './astUtils.js';

class RuleEngineService {
    constructor() {
        this.rules = []; // Store the dynamically created rules here
    }

    /**
     * Add a new rule dynamically.
     * @param {string} condition - The condition for the rule.
     * @param {Function} action - The action to be executed if the rule is satisfied.
     */
    addRule(condition, action) {
        const newRule = createRule(condition, action);
        this.rules.push(newRule);
    }

    /**
     * Evaluate all rules against a given context.
     * @param {Object} context - The context/data on which the rules should be applied.
     * @returns {boolean} - Whether all rules are satisfied.
     */
    evaluateAllRules(context) {
        return combineASTRules(this.rules, context);
    }

    /**
     * Execute actions of all satisfied rules.
     * @param {Object} context - The context/data on which the rules should be applied.
     */
    executeRules(context) {
        this.rules.forEach(rule => {
            if (evalRule(rule, context)) {
                rule.action(context); // Execute action if the rule condition is met
            }
        });
    }

    /**
     * Clear all rules.
     */
    clearRules() {
        this.rules = [];
    }
}

// Create Rule
export function createRuleInService(ruleName, ruleCondition) {
    if (!ruleName || !ruleCondition) {
        throw new Error('Invalid inputs for creating rule');
    }
    // Parse the condition into an AST format using astUtils
    const ast = parseRule(ruleCondition);
    console.log(`Rule ${ruleName} created successfully`);
    return {
        ruleName,
        ruleCondition,
        ast
    };
}

// Combine Rules
export function combineRulesInService(rule1, rule2, operator) {
    if (!rule1 || !rule2 || !operator) {
        throw new Error('Invalid inputs for combining rules');
    }
    const combinedCondition = `(${rule1}) ${operator} (${rule2})`;
    const combinedAST = parseCombinedRule(rule1, rule2, operator);
    console.log('Rules combined successfully');
    return {
        combinedCondition,
        combinedAST
    };
}

// Evaluate Rule
export function evaluateRuleInService(rule, context) {
    try {
        // Create a function based on the rule condition and evaluate it against the context
        const ruleFunction = new Function('context', `return ${rule};`);
        const result = ruleFunction(context);
        return {
            result,
            context
        };
    } catch (error) {
        throw new Error(`Error evaluating rule: ${error.message}`);
    }
}

// Export the RuleEngineService instance as default
export default new RuleEngineService();
