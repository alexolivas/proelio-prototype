import React from "react";
import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
} from "reactstrap";

class PercentageCard extends React.Component {
	render() {
		const { title, color, percentage } = this.props;
		return (
			<Card className="card-chart">
				<CardHeader>
					<CardTitle tag="h3">
						{ title }
					</CardTitle>
				</CardHeader>
				<CardBody className="text-center">
					<div className="chart-area pt-4">
						<span
							style={{
								fontSize: "80px",
								color: `${ color }`,
							}}
						>
							{ percentage }%
						</span>
					</div>
				</CardBody>
			</Card>
		);
	}
}

export default PercentageCard;