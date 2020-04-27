import { filter } from "lodash";
import React from "react";
import {
	Row,
	Col,
	Card,
	CardTitle,
	CardHeader,
	CardBody,
	Table,
	Label,
	Input,
	FormGroup,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import GraphWidget from "../common/GraphWidget";

import atRiskEmployees from "./__mocks__/atRiskEmployees.json";
import PercentageCard from "../common/PercentageCard";

import employeeList from "../employees/__mocks__/employeeList.json";
class Dashboard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			department: "all",
			gender: "all",
			ageRange: "all",
			experienceIndicators: [
				"Belonging",
				"Purpose",
				"Achievement",
				"Happiness",
				"Vigor",
			],
			topAtRiskEmployees: filter(employeeList, (o) => {
				const experienceScore = ((o.belongingScore + o.purposeScore
					+ o.achievementScore + o.happinessScore
					+ o.vigorScore) / 5);
				return experienceScore < 78;
			}),
			employeeExperienceList: employeeList,
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

	createEmployeeExperienceData() {
		const {
			// department,
			// gender,
			// ageRange,
			employeeExperienceList,
			experienceIndicators,
		} = this.state;
		// * red: #f5365c
		// * warning: #ff8d72
		// * success: #2bffc6
		// const {
		// 	belongingScore,
		// 	purposeScore,
		// 	achievementScore,
		// 	happinessScore,
		// 	vigorScore,
		// } = employee;
		const totalEmployees = employeeExperienceList.length;
		let belongingScore = 0;
		let purposeScore = 0;
		let achievementScore = 0;
		let happinessScore = 0;
		let vigorScore = 0;
		employeeExperienceList.map((employee) => {
			belongingScore += employee.belongingScore;
			purposeScore += employee.purposeScore;
			achievementScore += employee.achievementScore;
			happinessScore += employee.happinessScore;
			vigorScore += employee.vigorScore;
		});

		// Next calculate the average for each of the scores above
		belongingScore = (belongingScore / totalEmployees);
		purposeScore = (purposeScore / totalEmployees);
		achievementScore = (achievementScore / totalEmployees);
		happinessScore = (happinessScore / totalEmployees);
		vigorScore = (vigorScore / totalEmployees);

		// Finally, calculate the average experience index score for this subset of employees
		const averageExperienceScore = ((belongingScore + purposeScore
			+ achievementScore + happinessScore + vigorScore) / 5);

		const data = {
			labels: experienceIndicators,
			datasets: [
			  	{
					// label: 'Employee Experience',
					// backgroundColor: 'rgba(255,99,132,0.2)',
					backgroundColor: [
						this.getGraphColor(belongingScore),
						this.getGraphColor(purposeScore),
						this.getGraphColor(achievementScore),
						this.getGraphColor(happinessScore),
						this.getGraphColor(vigorScore),
					],
					// borderColor: 'rgba(255,99,132,1)',
					// borderWidth: 2,
					// hoverBackgroundColor: 'rgba(255,99,132,0.4)',
					// hoverBorderColor: 'rgba(255,99,132,1)',
					data: [
						belongingScore,
						purposeScore,
						achievementScore,
						happinessScore,
						vigorScore,
					],
			  	}
			]
		};
		return { data, averageExperienceScore };
	}

	handleSelectOnChange(e, key) {
		const {
			department,
			gender,
			ageRange,
			employeeExperienceList,
		} = this.state;
		const { value } = e.target;
		window.console.log(value, key);
		const filteredEmployees = filter(employeeList, (employee) => {
			if ( value === "all" ) {
				return true;
			}

			if ( key === "ageRange" ) {
				window.console.log(value);
				let ageLimit = 45;
				if ( value === "0" ) {
					ageLimit = 24;
				} else if ( value === "1" ) {
					ageLimit = 34;
				} else if ( value === "2" ) {
					ageLimit = 44;
				}
				// Calculate based on age
				return employee.age <= ageLimit;
			}

			return employee[key] === value;
		});

		// window.console.log(filteredEmployees);
		this.setState({
			[key]: value,
			employeeExperienceList: filteredEmployees,
		})
	}

	render() {
		const {
			department,
			gender,
			ageRange,
			topAtRiskEmployees,
		} = this.state;

		const { data, averageExperienceScore } = this.createEmployeeExperienceData();
		const companyData = {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			datasets: [
			  	{
					// label: 'Employee Experience',
					// backgroundColor: 'rgba(255,99,132,0.2)',
					// backgroundColor: [
					// 	this.getGraphColor(belongingScore),
					// 	this.getGraphColor(purposeScore),
					// 	this.getGraphColor(achievementScore),
					// 	this.getGraphColor(happinessScore),
					// 	this.getGraphColor(vigorScore),
					// ],
					borderColor: 'rgba(255,99,132,1)',
					// borderWidth: 2,
					// hoverBackgroundColor: 'rgba(255,99,132,0.4)',
					// hoverBorderColor: 'rgba(255,99,132,1)',
					data: [
						70.2,
						75.8,
						65.3,
						70.5,
						71.0,
						75.6,
						76.9,
						80.7,
						79.0,
						82.3,
						82.3,
						82.3,
					],
			  	}
			]
		}
		const options = {
			// title: {
			// 	display: true,
			// 	text: ""
			// },
			// onClick: (e, c) => this.showExperienceSectionDetails(e, c),
			legend: {
				display: false,
				// labels: {
				// 	fontColor: "white",
				// }
			},
			scales: {
				xAxes: [
					{
						display: true,
						ticks: {
							fontColor: "white",
							suggestedMin: 0,
							suggestedMax: 100,
						},
					},
				],
				yAxes: [
					{
						ticks: {
							fontColor: "white",
						},
					},
				],
			},
		};
		return (
			<>
				<Row>
					<Col lg="3">
						<PercentageCard
							title="Retention Rate"
							percentage="92"
							color="#2bffc6"
						/>
						{/* <Card className="card-chart">
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
						</Card> */}
					</Col>
					<Col lg="9">
						{/* This is going to be a line graph showing the history of the overall score for the company per month */}
						{/* Add a subtitle component to GraphWidget */}
						<GraphWidget
							title="Monthly Employee Index Score"
							chartType="line"
							options={ options }
							data={ companyData }
						/>
						{/* This is going to be a line graph per month of employees vs employees hired vs employees left for that month (so 3 lines) */}
					</Col>
				</Row>
				{/* <Row>
					<Col>
						<GraphWidget title="At Risk Employees" />
						This is going to be a PIE chart with normal employees vs at risk employees (with different risk levels)
					</Col>
					<Col>
						<GraphWidget title="Survey Responses" />
						Another PIE chart showing percentage of users that have responded the current survey
					</Col>
					<Col>
						<GraphWidget title="Employee" />
					</Col>
				</Row> */}

				<Row>
					<Col>
						<Card body>
							<Row>
									<Col>
										<FormGroup>
											<Label>Department</Label>
											<Input
												type="select"
												value={ department }
												onChange={ (e) => this.handleSelectOnChange(e, "department")}
											>
												<option value="all">All</option>
												<option value="R&D">R&D</option>
												<option value="HR">HR</option>
												<option value="Marketing">Marketing</option>
												<option value="IT">IT</option>
											</Input>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Label>Gender</Label>
											<Input
												type="select"
												value={ gender }
												onChange={ (e) => this.handleSelectOnChange(e, "gender")}
											>
												<option value="all">All</option>
												<option value="male">Male</option>
												<option value="female">Female</option>
											</Input>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Label>Age Range</Label>
											<Input
												type="select"
												value={ ageRange }
												onChange={ (e) => this.handleSelectOnChange(e, "ageRange")}
											>
												<option value="all">All</option>
												<option value="0">18 - 24</option>
												<option value="1">25 - 34</option>
												<option value="2">35 - 44</option>
												<option value="3">45+</option>
											</Input>
										</FormGroup>
									</Col>
								</Row>
								<p style={{ paddingTop: "20px" }}>
									The graph below shows the average employee experience index scores for the
									entire company.
								</p>
						</Card>
					</Col>
				</Row>
				<Row>
					<Col>
						<GraphWidget
							title="Employee Experience"
							titleNumber={ averageExperienceScore }
							chartType="horizontalBar"
							options={ options }
							data={ data }
						/>
					</Col>
				</Row>

				{/* <Row>
					<Col>
						<GraphWidget title="Employee Experience Index" />
					</Col>
					<Col>
						<GraphWidget title="Belonging" />
					</Col>
					<Col>
						<GraphWidget title="Purpose" />
					</Col>
				</Row>
				<Row>
					<Col>
						<GraphWidget title="Achievement" />
					</Col>
					<Col>
						<GraphWidget title="Happiness" />
					</Col>
					<Col>
						<GraphWidget title="Vigor" />
					</Col>
				</Row> */}
				{/*
					Employee experience index: 69%
					Belonging: 70%
					Purpose: 70%
					Achievement: 69%
					Happiness: 74%
					Vigor: 62%
				*/}
				<Row>
					{/* Add Top 5 at risk employees */}
					<Col>
						<Card>
							<CardHeader>
								<CardTitle tag="h4">Top At-Risk Employees</CardTitle>
							</CardHeader>
							<CardBody>
								<Table className="tablesorter" responsive>
									<thead className="text-primary">
										<tr>
											<th>First Name</th>
											<th>Last Name</th>
											<th>Department</th>
											<th className="text-center">Employee Experience Score</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{ topAtRiskEmployees.map((employee) => {
											const experienceScore = ((employee.belongingScore + employee.purposeScore
												+ employee.achievementScore + employee.happinessScore
												+ employee.vigorScore) / 5);
											return (
												<tr key={ employee._id }>
													<td>{ employee.firstName }</td>
													<td>{ employee.lastName }</td>
													<td>{ employee.department }</td>
													<td className="text-center">
														{ experienceScore.toFixed(1) }%
													</td>
													<td>
														<NavLink to={`employee/${ employee.guid }` }>View Details</NavLink>
													</td>
												</tr>
											);
										})}
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
