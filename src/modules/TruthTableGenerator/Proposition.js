'use strict';
import { Operator } from './Util';
const { NOT, IMPLICATION, EQUIVALENCE } = Operator;

class Proposition {
	constructor(notation, value = false) {
		this.notation = notation;
		this.value = value;
	}

	static fromOperator(op, prop1, prop2 = '', value = false, formula) {
		let opNotation = op;
		if (op === IMPLICATION) opNotation = '=>';
		if (op === EQUIVALENCE) opNotation = '<=>';

		let obr1 = '(';
		let cbr1 = ')';
		let obr2 = obr1;
		let cbr2 = cbr1;
		if (!Proposition.needBrackets(prop1, formula)) obr1 = cbr1 = '';
		if (prop2 && !Proposition.needBrackets(prop2, formula)) obr2 = cbr2 = '';

		let notation = null;
		if (op === NOT) notation = `${opNotation}${obr1}${prop1}${cbr1}`;
		else notation = `${obr1}${prop1}${cbr1}${opNotation}${obr2}${prop2}${cbr2}`;

		return new Proposition(notation, value);
	}

	static needBrackets(prop, formula) {
		//if (prop.length === 1) return false; 
		//if (prop[0] === '~' && (prop[1] === '(')) return false;

		const idx = formula.indexOf('(' + prop + ')');
		if (idx > -1) return true;
		return false;
	}
}

export default Proposition;