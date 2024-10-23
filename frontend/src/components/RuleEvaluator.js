import React, { useState } from 'react';
import { evaluateRule } from '../api/ruleApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RuleEvaluator = () => {
  const [conditions, setConditions] = useState([{ attribute: 'age', operator: '>', value: '' }]);
  const [userData, setUserData] = useState([
    { attribute: 'age', value: '' },
    { attribute: 'department', value: '' },
    { attribute: 'salary', value: '' },
    { attribute: 'experience', value: '' }
  ]);

  const handleConditionChange = (index, field, value) => {
    const newConditions = [...conditions];
    newConditions[index][field] = value;
    setConditions(newConditions);
  };

  const addCondition = () => {
    setConditions([...conditions, { attribute: 'age', operator: '>', value: '' }]);
  };

  const removeCondition = (index) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    setConditions(newConditions);
  };

  const handleUserDataChange = (index, value) => {
    const newUserData = [...userData];
    newUserData[index].value = value;
    setUserData(newUserData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const combinedAST = conditions.reduce((acc, condition) => {
        const ast = {
          type: 'BinaryExpression',
          operator: condition.operator,
          left: { name: condition.attribute },
          right: {
            value: condition.attribute === 'department' ? condition.value : Number(condition.value),
          },
        };
  
        // Modify the AST for the department attribute to ensure it's treated correctly
        if (condition.attribute === 'department') {
          ast.operator = '=='; // Use equality operator for string comparison
        }
  
        if (!acc) return ast;
  
        return {
          type: 'LogicalExpression',
          operator: '&&',
          left: acc,
          right: ast,
        };
      }, null);
  
      const data = userData.reduce((obj, item) => {
        obj[item.attribute] = item.attribute === 'department' ? item.value : Number(item.value);
        return obj;
      }, {});
  
      const response = await evaluateRule(combinedAST, data);
      if (response.result) {
        toast.success('The rule passed!');
      } else {
        toast.error('The rule failed!');
      }
    } catch (err) {
      toast.error('Invalid data format. Please ensure valid inputs.');
    }
  };
  

  return (
    <div className="container">
      <h1>Rule Engine Evaluator</h1>
      <form onSubmit={handleSubmit}>
        <h3>Conditions</h3>
        {conditions.map((condition, index) => (
          <div key={index} className="row mb-3 align-items-end">
            <div className="col">
              <select
                className="form-control"
                value={condition.attribute}
                onChange={(e) => handleConditionChange(index, 'attribute', e.target.value)}
              >
                <option value="age">Age</option>
                <option value="salary">Salary</option>
                <option value="experience">Experience</option>
                <option value="department">Department</option>
              </select>
            </div>
            <div className="col">
              <select
                className="form-control"
                value={condition.operator}
                onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
                disabled={condition.attribute === 'department'} // Disable for department
              >
                {condition.attribute === 'department' ? (
                  <option value="=="> = </option>
                ) : (
                  <>
                  <option value=">">&gt;</option>
                <option value=">="> ≥ </option>
                <option value="<">&lt;</option>
                <option value="<="> ≤ </option>
                <option value="=="> = </option>
                <option value="!="> ≠ </option>
                  </>
                )}
              </select>
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                value={condition.value}
                onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                placeholder='Enter a value'
                required
              />
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeCondition(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <button type="button" className="btn btn-secondary mb-3" onClick={addCondition}>
          Add Condition
        </button>

        <h3>User Data</h3>
        {userData.map((dataItem, index) => (
          <div key={index} className="row mb-3">
            <div className="col">
              <label>{dataItem.attribute.charAt(0).toUpperCase() + dataItem.attribute.slice(1)}</label>
              <input
                type={dataItem.attribute === 'department' ? 'text' : 'number'}
                className="form-control"
                value={dataItem.value}
                onChange={(e) => handleUserDataChange(index, e.target.value)}
                placeholder={`Enter ${dataItem.attribute}`}
                required
              />
            </div>
          </div>
        ))}

        <button type="submit" className="btn btn-primary mt-3">Evaluate Rule</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default RuleEvaluator;
