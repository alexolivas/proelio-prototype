import React from "react";
import {
	Row,
	Col,
	Card,
	CardTitle,
	CardHeader,
	CardBody,
	Table,
} from "reactstrap";
import GraphWidget from "./GraphWidget";

class Dashboard extends React.Component {
	render() {
		return (
			<>
				<Row>
					<Col lg="3">
						<Card className="card-chart">
							<CardHeader>
								<CardTitle tag="h3">
									Retention Rate
								</CardTitle>
							</CardHeader>
							<CardBody className="text-center">
								<div className="chart-area pt-4">
									<span
										style={{
											fontSize: "80px",
											color: "#2bffc6",
										}}
									>
										92%
									</span>
								</div>
							</CardBody>
						</Card>
					</Col>
					<Col lg="9">
						<GraphWidget title="Company Overview" />
						{/* This is going to be a line graph per month of employees vs employees hired vs employees left for that month (so 3 lines) */}
					</Col>
				</Row>
				<Row>
					<Col>
						<GraphWidget title="At Risk Employees" />
						{/* This is going to be a PIE chart with normal employees vs at risk employees (with different risk levels) */}
					</Col>
					<Col>
						<GraphWidget title="Survey Responses" />
						{/* Another PIE chart showing percentage of users that have responded the current survey */}
					</Col>
					<Col>
						<GraphWidget title="Employee" />
					</Col>
				</Row>
				<Row>
					{/* Add Top 5 at risk employees */}
					<Col>
						<Card>
							<CardHeader>
								<CardTitle tag="h4">Simple Table</CardTitle>
							</CardHeader>
							<CardBody>
								<Table className="tablesorter" responsive>
									<thead className="text-primary">
										<tr>
											<th>Name</th>
											<th>Country</th>
											<th>City</th>
											<th className="text-center">Salary</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Dakota Rice</td>
											<td>Niger</td>
											<td>Oud-Turnhout</td>
											<td className="text-center">$36,738</td>
										</tr>
										<tr>
											<td>Minerva Hooper</td>
											<td>Curaçao</td>
											<td>Sinaai-Waas</td>
											<td className="text-center">$23,789</td>
										</tr>
										<tr>
											<td>Sage Rodriguez</td>
											<td>Netherlands</td>
											<td>Baileux</td>
											<td className="text-center">$56,142</td>
										</tr>
										<tr>
											<td>Philip Chaney</td>
											<td>Korea, South</td>
											<td>Overland Park</td>
											<td className="text-center">$38,735</td>
										</tr>
										<tr>
											<td>Doris Greene</td>
											<td>Malawi</td>
											<td>Feldkirchen in Kärnten</td>
											<td className="text-center">$63,542</td>
										</tr>
										<tr>
											<td>Mason Porter</td>
											<td>Chile</td>
											<td>Gloucester</td>
											<td className="text-center">$78,615</td>
										</tr>
										<tr>
											<td>Jon Porter</td>
											<td>Portugal</td>
											<td>Gloucester</td>
											<td className="text-center">$98,615</td>
										</tr>
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</>
		)
	}
}

export default Dashboard;
