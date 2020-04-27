import React from "react";
import {
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Col,
	Row,
	Badge,
} from "reactstrap";
// import classNames from "classnames";
import { Line, HorizontalBar } from "react-chartjs-2";


class GraphWidget extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	getGraphColor(score) {
		let color = "#2bffc6";
		if ( score < 74 && score > 64 ) {
			color = "#ff8d72";
		} else if ( score <= 64) {
			color = "#f5365c";
		}
		return color;
	}

	renderHorizontalBarChart() {
		const { data, options, chartType } = this.props;
		if ( chartType === "line" ) {
			return (
				<Line
					data={ data }
					options={ options }
				/>
			)
		}
		return (
			<HorizontalBar
				data={ data }
				options={ options }
			/>
		);
	}

	render() {
		const {
			chartType,
			data,
			options,
			title,
			titleNumber,
			subTitle,
			icon
		} = this.props;
		return (
			<Card className="card-chart">
				<CardHeader>
					<CardTitle tag="h3">
						<Row>
							<Col>
								<i className={ icon } />{" "}
								{ title }
							</Col>
							{ titleNumber && (
								<Col md={ 2 } className="text-right">
									<Badge color="danger"
										style={{
											fontSize: "20px",
											background: this.getGraphColor(titleNumber),
											color: "#212529",
										}}>
										{ titleNumber.toFixed(1) }%
									</Badge>
								</Col>
							)}
						</Row>
					</CardTitle>
				</CardHeader>
				<CardBody>
					{/* <div className="chart-area"> */}
					<div>
						{ this.renderHorizontalBarChart() }
						{/* { chartType === "line" &&
							<Line
								data={ data }
								options={ options }
							/>
						} */}
					</div>
				</CardBody>
			</Card>
		);
	}
}

export default GraphWidget;
