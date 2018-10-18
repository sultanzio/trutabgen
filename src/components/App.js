import React from 'react';
import Generator from '../modules/TruthTableGenerator/Generator';
import Header from './Header';
import TruthTable from './TruthTable';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.generator = new Generator();

		this.state = {
			truthTable: null,
			error: ''
		};
	}

	generateTable = (formula) => {
		let truthTable = null;
		let error = null;

		try {
			truthTable = this.generator.generateTruthTable(formula);
		} catch (err) {
			console.log(err);

			let parseErr = null;
			try {
				err = JSON.parse(err.message);
			} catch (parseErr) {
				console.log(parseErr);
				error = 'Unexpected error.';
			}

			if (!parseErr) {
				switch (err.type) {
					case 'UNKNOWN_OPERATOR': error = `Unknown operator ${err.char}.`; break;
					case 'UNKNOWN_POLI_OPERATOR': error = `Unexpected error.`; break;
				}
			}

			error += ' Please ensure your formula is well-formed.';
		}

		this.setState(() => ({ truthTable, error }));
	}

	render() {
		return (
			<main>
				<div id="title">Truth Table Generator</div>
				<Header generateTable={this.generateTable} />
				<TruthTable error={this.state.error} truthTable={this.state.truthTable} />
			</main>
		);
	}
}

export default App;