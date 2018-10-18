import React from 'react';
import Legend from './Legend';

class Header extends React.Component {
	state = {
		formula: '',
		legendOpen: true
	};

	hideLegend = () => {
		if (!this.state.legendOpen) return;
		this.setState({ legendOpen: false });
	}

	openLegend = () => {
		this.setState({ legendOpen: true });
	}

	updateFormula = (e) => {
		const formula = e.target.value;
		this.setState(() => ({ formula }));
	}

	onKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.generateTable();
		}
	}

	generateTable = () => {
		this.hideLegend();
		this.props.generateTable('');

		setTimeout(() => {
			this.props.generateTable(this.state.formula);
		}, 100);
	}

	render() {
		return (
			<div>
				<section id="header-section">
					<div id="header" className="container-small flex-row">
						<input 
							className="formula-field" 
							type="text" 
							placeholder="Type your formula..."
							defaultValue={this.state.formula} 
							onChange={this.updateFormula}
							onKeyPress={this.onKeyPress}
						/>
						<button className="generate-button" onClick={this.generateTable}>
							Generate
						</button>
					</div>
				</section>
				<Legend isOpen={this.state.legendOpen} openLegend={this.openLegend} />
			</div>
		);
	}
}

export default Header;