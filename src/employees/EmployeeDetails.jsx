import classnames from "classnames";
import { lowerCase, find } from "lodash";
import React from "react";
import { withRouter } from "react-router-dom";

import {
	Badge,
	Row,
	CardHeader,
	Alert,
	Col,
	Card,
	Table,
	CardFooter,
	CardTitle,
	CardBody,
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
} from "reactstrap";
import PercentageCard from "../common/PercentageCard";
import GraphWidget from "../common/GraphWidget";

import employeeList from "./__mocks__/employeeList.json";

/**
 * red: #f5365c
 * warning: #ffd600
 * success: #2dce89
 */
class EmployeeDetails extends React.Component {

	constructor(props) {
		super(props);
		const { id } = this.props.match.params;

		const employee = find(employeeList, { "guid": id });
		const experienceScore = ((employee.belongingScore + employee.purposeScore
			+ employee.achievementScore + employee.happinessScore
			+ employee.vigorScore) / 5);
		this.state = {
			activeTab: "Belonging",
			employeeAnalysis: [],
			experienceIndicators: [
				"Belonging",
				"Purpose",
				"Achievement",
				"Happiness",
				"Vigor",
			],
			employee,
			experienceScore,
		};

		this.factorDefs = {
			"Organizational Trust": {
				name: "Organizational Trust",
				type: "Workplace Practices",
			},
			"Coworker relations": {
				name: "Coworker relations",
				type: "Workplace Practices",
			} ,
			"Culture": {
				name: "Culture",
				type: "Workplace Practices",
			},
			"Alignment": {
				name: "Alignment",
				type: "Workplace Practices",
			},
			"Social Connection": {
				name: "Social Connection",
				type: "Workplace Practices",
			},
			"Benefits": {
				name: "Benefits",
				type: "Factual",
			},

			"Meaningful Work": {
				name: "Meaningful Work",
				type: "Workplace Practices",
			},
			"Empowerment": {
				name: "Empowerment",
				type: "Workplace Practices",
			},
			"Recognition": {
				name: "Recognition",
				type: "Workplace Practices",
			},
			"Feedback": {
				name: "Feedback",
				type: "Workplace Practices",
			},
			"Growth": {
				name: "Growth",
				type: "Workplace Practices",
			},

			"Salary": {
				name: "Salary",
				type: "Factual",
			},
			"Promotions": {
				name: "Promotions",
				type: "Factual",
			},
			"Past Reviews": {
				name: "Past Reviews",
				type: "Factual",
			},

			"Optimism": {
				name: "Optimism",
				type: "Workplace Practices",
			},
			"Work Life Balance": {
				name: "Work Life Balance",
				type: "Workplace Practices",
			},
			"Sick Time": {
				name: "Sick Time",
				type: "Factual",
			},
			"Commute Time": {
				name: "Commute Time",
				type: "Factual",
			},
		};
		this.experienceIndicatorDetails = [
			{
				// belonging
				factors: [
					this.factorDefs["Organizational Trust"],
					this.factorDefs["Coworker relations"],
					this.factorDefs["Culture"],
					this.factorDefs["Alignment"],
					this.factorDefs["Social Connection"],
					this.factorDefs["Benefits"],
				],
				description: "Feeling part of a team, group or organization",
				icon: "fas fa-heart",
			},
			{
				// purpose
				factors: [
					this.factorDefs["Organizational Trust"],
					this.factorDefs["Meaningful Work"],
					this.factorDefs["Empowerment"],
					this.factorDefs["Recognition"],
					this.factorDefs["Growth"],
				],
				description: "Understanding why one's work matters",
				icon: "fas fa-brain",
			},
			{
				// achievement
				factors: [
					this.factorDefs["Recognition"],
					this.factorDefs["Salary"],
					this.factorDefs["Promotions"],
					this.factorDefs["Past Reviews"],
					this.factorDefs["Feedback"],
				],
				description: "A sense of accomplishment in the work that is done",
				icon: "fas fa-bullseye",
			},
			{
				// happiness
				factors: [
					this.factorDefs["Coworker relations"],
					this.factorDefs["Optimism"],
					this.factorDefs["Work Life Balance"],
					this.factorDefs["Sick Time"],
					this.factorDefs["Commute Time"],
				],
				description: "The pleasant feeling arising in and around work",
				icon: "fas fa-laugh-beam",
			},
			{
				// vigor
				factors: [
					this.factorDefs["Organizational Trust"],
					this.factorDefs["Coworker relations"],
					this.factorDefs["Social Connection"],
					this.factorDefs["Optimism"],
				],
				description: "The presence of energy, enthusiasm and excitement at work",
				icon: "fas fa-fire-alt",
			},
		];
	}

	componentDidMount() {
		const { employee, experienceIndicators } = this.state;
		// * red: #f5365c
		// * warning: #ff8d72
		// * success: #2bffc6
		const {
			belongingScore,
			purposeScore,
			achievementScore,
			happinessScore,
			vigorScore,
		} = employee;

		let employeeAnalysis = [];
		experienceIndicators.map((indicator, index) => {
			const details = this.experienceIndicatorDetails[index];
			let updatedFactors = [];
			// Default value to "Vigor"
			let currScore = vigorScore;
			if ( indicator === "Belonging" ) {
				currScore = belongingScore;
			} else if ( indicator === "Purpose" ) {
				currScore = purposeScore;
			} else if ( indicator === "Achievement" ) {
				currScore = achievementScore;
			} else if ( indicator === "Happiness" ) {
				currScore = happinessScore;
			}

			details.factors.map((factor) => {
				// // Default value to "Vigor"
				// let currScore = vigorScore;
				// if ( indicator === "Belonging" ) {
				// 	currScore = belongingScore;
				// } else if ( indicator === "Purpose" ) {
				// 	currScore = purposeScore;
				// } else if ( indicator === "Achievement" ) {
				// 	currScore = achievementScore;
				// } else if ( indicator === "Happiness" ) {
				// 	currScore = happinessScore;
				// }

				// Based on the score coming from the data generate a realistic
				// amount invalid factor
				let icon = "fas fa-check";
				let color = "#2dce89";
				const lowScore = currScore < 75;
				const percentage = lowScore ? 2 : 10;
				const random = Math.floor(Math.random() * percentage);

				if ( random === 0 ) {
					icon = "fas fa-exclamation-triangle";
					color = "#ffd600";
				} else if ( random === 1 ) {
					icon = "fas fa-times-circle";
					color = "#f5365c";
				}
				updatedFactors.push({
					...factor,
					icon,
					color,
					// description: this.factorDefs["Culture"],
				})
			});

			employeeAnalysis.push({
				name: indicator,
				factors: updatedFactors,
				description: details.description,
				icon: details.icon,
				score: currScore,
			});
		});
		this.setState({
			employeeAnalysis,
		});
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
		const { employee, experienceIndicators } = this.state;
		// * red: #f5365c
		// * warning: #ff8d72
		// * success: #2bffc6
		const {
			belongingScore,
			purposeScore,
			achievementScore,
			happinessScore,
			vigorScore,
		} = employee;

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
		return data;
	}

	// showExperienceSectionDetails(e, chartElement) {
	// 	window.console.log(chartElement[0]._chart);
	// }

	toggleTab(tab) {
		this.setState({
			activeTab: tab,
		});
	}

	buildTabs() {
		const {
			employee,
			activeTab,
			employeeAnalysis,
		} = this.state;
		if ( employeeAnalysis.length === 0 ) {
			return <Alert color="info">Loading..</Alert>
		}
		return (
			<>
				<Nav tabs>
					{ employeeAnalysis.map((indicator) => (
						<NavItem key={ indicator.name }>
							<NavLink
								className={ classnames({ active: activeTab === `${ indicator.name }` })}
								onClick={() => this.toggleTab(`${ indicator.name }`) }
							>
								{ indicator.name }
							</NavLink>
						</NavItem>
					))}
				</Nav>
				<TabContent activeTab={ activeTab }>
					{ employeeAnalysis.map((indicator) => (
						<TabPane tabId={ indicator.name } key={ indicator.name }>
							<Row style={{ padding: "20px" }}>
								<Col>
									<Row>
										<Col>
											<p>
												<i className={ indicator.icon } style={{ fontSize: "20px", paddingRight: "5px" }} />
												{" "}
												{ indicator.description }
											</p>
										</Col>
										<Col className="text-right">
											<Badge color="danger"
												style={{
													fontSize: "20px",
													background: this.getGraphColor(indicator.score),
													color: "#212529",
												}}>
												{ indicator.score.toFixed(1) }%
											</Badge>
										</Col>
									</Row>
									<Table responsive>
										<thead className="text-primary">
											<tr>
												<th>Status</th>
												<th>Factor</th>
												<th>Type</th>
												{/* <th>Description</th> */}
											</tr>
										</thead>
										<tbody>
											{ indicator.factors.map((factor) => (
												<tr key={ factor.name }>
													<td><i style={{ color: factor.color }} className={ factor.icon } /></td>
													<td><strong>{ factor.name }</strong></td>
													<td>{ factor.type }</td>
													{/* <td>{ factor.description }</td> */}
												</tr>
											))}
										</tbody>
									</Table>
								</Col>
							</Row>
						</TabPane>
					))}
				</TabContent>
			</>
		);
	}

	render() {
		const { employee, experienceScore } = this.state;
		let analysisIcon = "fas fa-check";
		let analysisColor = "#2dce89";
		let analysisMessage = "is healthy and indicates a low risk for problems with retention";

		if ( experienceScore < 80 && experienceScore >= 65 ) {
			analysisIcon = "fas fa-exclamation-triangle";
			analysisColor = "#ffd600";
			analysisMessage = "needs attention and indicates a medium risk for problems with retention";
			// retentionColor = "#ffd600";
			// retentionIcon = "fas fa-exclamation-triangle";
		} else if ( experienceScore < 65 ) {
			analysisIcon = "fas fa-times-circle";
			analysisColor = "#f5365c";
			analysisMessage = "needs urgent attention and indicates a high risk for problems with retention";
			// retentionColor = "#2dce89";
			// workPerformanceColor = "#ffd600";
			// discretionaryIcon = "fas fa-exclamation-triangle";
			// retentionIcon = "fas fa-times-circle";
		}

		let workPerformanceColor = "#2dce89";
		let discretionaryColor = "#2dce89";
		let retentionColor = "#2dce89";

		let workPerformanceIcon = "fas fa-check";
		let discretionaryIcon = "fas fa-check";
		let retentionIcon = "fas fa-check";
		if ( experienceScore < 90 && experienceScore >= 80 ) {
			discretionaryColor = "#ffd600";
			discretionaryIcon = "fas fa-exclamation-triangle";
		} else if ( experienceScore < 80 && experienceScore >= 70 ) {
			discretionaryColor = "#ffd600";
			discretionaryIcon = "fas fa-exclamation-triangle";

			retentionColor = "#ffd600";
			retentionIcon = "fas fa-exclamation-triangle";
		} else if ( experienceScore < 70 ) {
			discretionaryColor = "#ffd600";
			discretionaryIcon = "fas fa-exclamation-triangle";

			retentionColor = "#f5365c";
			retentionIcon = "fas fa-times-circle";
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
					<Col md={ 2 }>
						<div className="text-center">
							<img src={ employee.picture } alt="" />
						</div>
					</Col>
					<Col>
						<span
							style={{
								lineHeight: "1.05",
								marginBottom: "30px",
								fontWeight: "400",
								fontSize: "2.0625rem",
								color: "white"
							}}>
							{ employee.firstName } { employee.lastName }
						</span>
						<h4>{ employee.department } | { employee.position }</h4>
						<Badge color="danger"
							style={{
								fontSize: "20px",
								background: this.getGraphColor(experienceScore),
								color: "#212529",
							}}>
							{ experienceScore.toFixed(1) }%
						</Badge>
					</Col>
				</Row>
				<br />
				<Row>
					<Col>
						<Alert color="dark">
							<i className={ analysisIcon } style={{ color: analysisColor }} />
							{" "}
							Our data analysis indicates that <strong>{ employee.firstName }
							{" "}
							{ employee.lastName }</strong>'s employee experience score
							{" "}
							{ analysisMessage }
						</Alert>
					</Col>
				</Row>
				<Row>
					<Col>
						<GraphWidget
							title="Employee Experience"
							chartType="horizontalBar"
							options={ options }
							data={ this.createEmployeeExperienceData() }
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Card>
							<CardHeader>
								<CardTitle tag="h3">
									<Row>
										<Col>
											Employee Experience Details
										</Col>
										<Col md={ 2 } className="text-right">
											<Badge color="danger"
												style={{
													fontSize: "20px",
													background: this.getGraphColor(experienceScore),
													color: "#212529",
												}}>
												{ experienceScore.toFixed(1) }%
											</Badge>
										</Col>
									</Row>
								</CardTitle>
							</CardHeader>
							<CardBody>
								{ this.buildTabs() }
							</CardBody>
							<CardFooter className="text-muted">
								<i className="fas fa-info-circle" />
								{" "}
								Workers with scores in the top quartile are more likely to report high levels of
								work performance that those whose scores are in the bottom quartile.
							</CardFooter>
						</Card>
					</Col>
				</Row>
				<Row>
					<Col>
						<Card>
							<CardHeader>
								<CardTitle tag="h3">
									Outcomes
								</CardTitle>
							</CardHeader>
							<CardBody>
								<Table responsive>
									<tbody>
										<tr>
											<td><i style={{ color: workPerformanceColor }} className={ workPerformanceIcon} /></td>
											<td><strong>Work Performance</strong></td>
											<td>
												Employees with scores in the top quartile are more likely to report
												high levels of work performance than those whose scores are in the
												bottom quartile
											</td>
										</tr>
										{/* ))} */}
										<tr>
											<td><i style={{ color: discretionaryColor }} className={ discretionaryIcon } /></td>
											<td><strong>Discretionary Effort</strong></td>
											<td>
												Employees with more positive experiences at work are much more likely
												to report significantly higher levels of discretionary effort.
											</td>
										</tr>
										<tr>
											<td><i style={{ color: retentionColor }} className={ retentionIcon } /></td>
											<td><strong>Retention</strong></td>
											<td>
												Analysis reveals that employees with lower scores are more than twice
												as likely to say they want to lev compared to those with more positive
												experiences.
											</td>
										</tr>
									</tbody>
								</Table>
								<CardFooter className="text-muted">
									<i className="fas fa-info-circle" />
									{" "}
									The employee experience index score is calculated based on a study done by IBM.
								</CardFooter>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</>
		);
	}
}

/**
 * Employee Experience is the average of the 5 other points
 * Employee Experience compared to the outcomes
 * Each outcome could be a link for more details
 * Use a bar graph to
 */

// _id: '{{objectId()}}',
// index: '{{index()}}',
// guid: '{{guid()}}',
// firstName: '{{firstName()}}',
// lastName: '{{surname()}}',
// picture: 'http://placehold.it/64x64',
// age: '{{integer(20, 50)}}',
// gender: '{{gender()}}',
// about: '{{lorem(1, "paragraphs")}}',
// salary: '{{floating(40000, 120000, 2, "$0,0.00")}}',
// department: '{{random("R&D", "Sales", "Marketing", "HR", "Finance", "IT")}}',
// retentionScore: '{{floating(50, 99)}}',
// email: '{{email()}}',
// phone: '+1 {{phone()}}',
// address:

export default withRouter(EmployeeDetails);
// export default EmployeeDetails;