import React from 'react';

class Legend extends React.Component {
	renderOperators() {
		return (
			<div id="operands" className="flex-row space-between">
				<div className="operand flex-column text-center">
					<div className="operand__original">Conjunction(&and;)</div>
					<div className="operand__code">^</div>
				</div>
				<div className="operand flex-column text-center">
					<div className="operand__original">Disjunction(&or;)</div>
					<div className="operand__code">V</div>
				</div>
				<div className="operand flex-column text-center">
					<div className="operand__original">Negation(&not;)</div>
					<div className="operand__code">~</div>
				</div>
				<div className="operand flex-column text-center">
					<div className="operand__original">Implication(&rArr;)</div>
					<div className="operand__code">=></div>
				</div>
				<div className="operand flex-column text-center">
					<div className="operand__original">Equivalence(&hArr;)</div>
					<div className="operand__code">&lt;=&gt;</div>
				</div>
			</div>
		);
	}

	renderDetails() {
		return (
			<div id="details">
				<p>Use the above characters to replace the logical connectives. Identifiers should only be lower case letters (p, q, r...). You can use T and F for true and false.</p>
				<p className="example"> Example: ~(p^q) &lt;=&gt; ~pV~q </p>
			</div>
		);
	}

	render() {
		let legendClass = 'container-small';
		if (!this.props.isOpen) legendClass += ' closed';

		return (
			<section id="legend-section">
				<div id="legend" className={legendClass}>
					<div className="legend__content container-small card">
						{this.renderOperators()}
						<hr/>
						<h3> How to type </h3>
						{this.renderDetails()}
					</div>
					<div className="legend__closed container-small card">
						<h3> How to type </h3>
						<button className="openBtn" onClick={this.props.openLegend}>Open</button>
					</div>
				</div>
			</section>
		);
	}
};

export default Legend;