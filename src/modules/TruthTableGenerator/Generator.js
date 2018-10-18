'use strict';
import Proposition from './Proposition';
import { Operator, OpPriority as priority } from './Util';
import { isOperand, isBoolean, removeWhitespace } from './Util';

const {
	AND,
	OR,
	NOT,
	IMPLICATION,
	EQUIVALENCE,
	OPEN_BRACKET,
	CLOSE_BRACKET
} = Operator;

/**
 * Generates the truth table of a given formula
 * @method generateTruthTable(formula: string)
 */
class TruthTableGenerator {
	/**
	 * Generates the truth table of the given formula
	 * @param {String} formula the formula to evaluate
	 * @returns {Map} the truthTable
	 */
	generateTruthTable(formula) {
		/* Init */
		this.formula = removeWhitespace(formula);
		this.poli = ''; // polish notation of the formula
		this.operands = []; // the operands in the formula (p, q, r...)
		this.opValues = {'T': 1, 'F': 0}; // the values of the operands used for evaluation
		this.props = []; // the compound propositions in the formula(p^q, pVq...) and their values
		this.truthTable = new Map();

		/* Parse the formula and store it in polish notation inside poli */
		this.convertFormulaToPostfix();

		// Init operands' values
		for (const operand of this.operands) {
			this.opValues[operand] = false;
		}

		// Add operands as propositions of the truth table
		for (const operand of this.operands) {
			this.truthTable.set(operand, []); // init operand's values with an empty array
		}

		// Build truth table
		this.generateOperandValues();
		return this.truthTable;
	}


	/**
	 * Generates all possible values for the given operands
	 * using recursive backtracking
	 * @param {Number} k the kth operand to generate for
	 */
	generateOperandValues(k = 0) {
		if (k === this.operands.length) {
			this.updateTruthTable();
			return;
		}

		for (let i = 0; i <= 1; ++i) {
			this.opValues[this.operands[k]] = !i;
			this.generateOperandValues(k + 1);
		}
	}


	/**
	 * Evaluates the formula using the given operands' values
	 * Pushes the new values of the propositions in the truth table
	 */
	updateTruthTable() {
		/* Evauate the formula with the new operand values */
		this.evaluateFormula();

		// Push the new value of each operand
		for (const operand of this.operands) {
			this.truthTable.get(operand).push(this.opValues[operand]);
		}

		// Push the new value of each proposition
		for (const prop of this.props) {
			// Init prop key in map if non-existent
			if (!this.truthTable.has(prop.notation)) {
				this.truthTable.set(prop.notation, []);
			}

			// Push value of the proposition in the truth's table prop values array
			const tableProp = this.truthTable.get(prop.notation);
			tableProp.push(prop.value);
		}
	}


	/**
	 * Through the magic of the stacks
	 */
	evaluateFormula() {
		this.props = []; // array of {Proposition} used for truthTable
		const propValues = {}; // map of propositions. used to remove duplicates
		const stack = []; // the stack of {Propositions}

		// op stands for operand of operator, the only possible entities in poli
		for (const op of this.poli) {
			// If operand -> convert to proposition and push to stack
			if (isOperand(op) || isBoolean(op)) { 
				stack.push(new Proposition(op, this.opValues[op]));
			} else { 
				// Else if operator -> apply it and form a new compound proposition
				let newProp = null;

				if (op === NOT) {
					const prop = stack.pop();
					newProp = Proposition.fromOperator(NOT, prop.notation, null, !prop.value, this.formula);
				} else {
					const prop2 = stack.pop();
					const prop1 = stack.pop();
					newProp = Proposition.fromOperator(op, prop1.notation, prop2.notation, null, this.formula);

					// If proposition already evaluated (duplicate)
					if (propValues.hasOwnProperty(newProp.notation)) {
						newProp.value = propValues[newProp.notation];
					} else { 
						// this is a new one, so evaluate it
						const a = prop1.value;
						const b = prop2.value;
						let result = null;

						switch (op) {
							case AND: result = a & b; break;
							case OR: result = a | b; break;
							case IMPLICATION: result = (!a) | b; break;
							case EQUIVALENCE: result = (!a | b) & (!b | a); break;
							default: throw new Error(JSON.stringify({
								type: 'UNKNOWN_POLI_OPERATOR', char: op
							}));
						}

						// don't forget to set prop's value
						newProp.value = result;
					}
				}

				// Push new prop in array (if not already there)
				if (!propValues.hasOwnProperty(newProp.notation)) {
					propValues[newProp.notation] = newProp.value;
					this.props.push(newProp);
				}

				// Push prop into the stack
				stack.push(newProp);
			}
		}

		return stack.top();
	}

	/**
	 * Converts the formula to polish notation
	 * and stores it in this.poli
	 */
	convertFormulaToPostfix() {
		const formula = this.formula;
		const ops = [];	// stack of operators
		this.poli = '';

		for (let i = 0; i < formula.length; ++i) {
			if (formula[i] === ' ') continue;
			const c = formula[i];

			// If operand or boolean -> push to poli
			if (isOperand(c) || isBoolean(c)) { 
				this.poli += c;

				if (isOperand(c) && !this.operands.includes(c)) { // operand not registered
					this.operands.push(c);
				}
			} else { // It should be an operator -> determine which
				let op = null;
		
				switch (formula[i]) {
					case '^': op = AND; break;
					case 'V': op = OR; break;
					case '~': op = NOT; break;
					case '(': op = OPEN_BRACKET; break;
					case ')': op = CLOSE_BRACKET; break;
					case '=':
						if (i + 1 >= formula.length) break;
						if (formula[i + 1] === '>') {
							op = IMPLICATION;
							i++;
						}
					break;
					case '<':
						if (i + 2 >= formula.length) break;
						if (formula[i + 1] === '=' && formula[i + 2] === '>') {
							op = EQUIVALENCE;
							i += 2;
						}
					break;
				}
		
				if (op === null) {
					throw new Error(JSON.stringify({
						type: 'UNKNOWN_OPERATOR', char: formula[i]
					}));
				}
				
				// Push operator to stack and pop higher priority operators over to poli
				while (!ops.empty() && ops.top() !== OPEN_BRACKET && priority[op] < priority[ops.top()]) {
					this.poli += ops.pop();
				}
				
				if (op === CLOSE_BRACKET) ops.pop();
				else ops.push(op);
			}
		}

		while (!ops.empty()) this.poli += ops.pop();
	}
}

export default TruthTableGenerator;