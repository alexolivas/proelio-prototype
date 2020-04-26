import React from "react";
import {
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Col,
} from "reactstrap";
// import classNames from "classnames";
import { Line, Bar } from "react-chartjs-2";


class GraphWidget extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		const {
			chartType,
			data,
			options,
			title,
			subTitle,
			icon
		} = this.props;
		return (
			<Card className="card-chart">
				<CardHeader>
					<CardTitle tag="h3">
						<i className={ icon } />{" "}
						{ title }
					</CardTitle>
				</CardHeader>
				<CardBody>
					<div className="chart-area">
						{ chartType === "line" &&
							<Line
								data={ data }
								options={ options }
							/>
						}
					</div>
				</CardBody>
			</Card>
		);
	}
}

export default GraphWidget;
