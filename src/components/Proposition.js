import React from 'react';

const Proposition = ({ prop, propValues }) => {
	return (
		<div className="proposition">
			<div className="proposition__header">{prop}</div>
			{propValues.map((value, idx) => (
				<div key={idx} className="proposition__value">
					{value ? 'T' : 'F'}
				</div>
			))}
		</div>
	);
}

export default Proposition;