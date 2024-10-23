const Rule = require('../models/Rule');
const jsep = require('jsep'); // For parsing rule strings into AST
const { evaluateAST } = require('../utils/evaluateAST');

// Create a new rule and save to database
const createRule = async (req, res) => {
  try {
    console.log(req.body);
    const { ruleString } = req.body;
    const ast = jsep(ruleString); // Convert rule string to AST
    const rule = new Rule({ ruleString, ast });
    await rule.save();
    res.status(201).json({ message: 'Rule created', rule });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Combine multiple rules into one AST
const combineRules = (req, res) => {
  const { rules } = req.body;
  try {
    let combinedAST = rules.reduce((acc, rule) => {
      const ast = jsep(rule);
      if (!acc) return ast;
      return {
        type: 'LogicalExpression',
        operator: '&&', // Can optimize to combine using OR or AND based on requirements
        left: acc,
        right: ast
      };
    }, null);
    
    res.status(200).json({ message: 'Rules combined', combinedAST });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Evaluate a rule using user data
const evaluateRule = (req, res) => {
  const { ast, data } = req.body;
  try {
    const result = evaluateAST(ast, data);
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createRule,
  combineRules,
  evaluateRule
};
