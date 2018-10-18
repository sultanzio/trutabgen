import React from 'react';
import Proposition from './Proposition';

class TruthTable extends React.Component {
	renderError() {
		if (!this.props.error) return null;

		return (
			<div className='alert container-small card'>
				{this.props.error}
			</div>
		);
	}

	renderTruthTable() {
		if (!this.props.truthTable) return null;
		if (this.props.truthTable.size === 0) return null;
		
		const table = [];
		for (const [prop, propValues] of this.props.truthTable) {
			table.push(<Proposition key={prop} prop={prop} propValues={propValues} />);
		}

		return (
			<div className="truth-table card">
				{table}
			</div>
		);
	}

	render() {
		if (!this.props.truthTable && !this.props.error) return null;

		return (
			<section id="truth-table-section">
				{this.renderError()}
				{this.renderTruthTable()}
			</section>
		);
	}
}

export default TruthTable;