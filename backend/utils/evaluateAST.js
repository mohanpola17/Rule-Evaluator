// Function to evaluate AST nodes
const evaluateAST = (node, data) => {
    if (node.type === 'BinaryExpression') {
      const { left, right, operator } = node;
      const leftValue = data[left.name] || left.value;
      const rightValue = right.value;
  
      switch (operator) {
        case '>':
          return leftValue > rightValue;
        case '<':
          return leftValue < rightValue;
        case '==':
          return leftValue == rightValue;
        case '!=':
          return leftValue != rightValue;
        default:
          return false;
      }
    } else if (node.type === 'LogicalExpression') {
      const left = evaluateAST(node.left, data);
      const right = evaluateAST(node.right, data);
      return node.operator === '&&' ? left && right : left || right;
    }
    return false;
  };
  
  module.exports = { evaluateAST };
  