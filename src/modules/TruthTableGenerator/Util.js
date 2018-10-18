'use strict';

export const Operator = {
	OPEN_BRACKET: '(',
	NOT: '~',
	AND: '^',
	OR: 'V',
	IMPLICATION: '>',
	EQUIVALENCE: '=',
	CLOSE_BRACKET: ')'
};

/* Operators' Priority */
export const OpPriority = {};
let pr = Object.keys(Operator).length;
for (const op in Operator) OpPriority[Operator[op]] = pr--;

/* Determines which symbols are operands */
export function isOperand(c) {
	return (c >= 'a' && c <= 'z');
}

/*  Removes all whitespace from string */
export function removeWhitespace(formula) {
	let s = '';
	for (const c of formula) {
		if (c !== ' ') s += c;
	}
	return s;
}

/* Set array prototype to return the last element */
Array.prototype.top = function() {
	if (this.length == 0) return null;
	return this[this.length - 1];
}

/* Set array prototype to return if the array is empty */
Array.prototype.empty = function() {
	return (this.length === 0);
}

Array.prototype.includes = function(el) {
	return (this.indexOf(el) !== -1);
}