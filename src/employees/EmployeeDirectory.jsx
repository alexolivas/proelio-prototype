import React from "react";
import {
	Row,
	Col,
	Card,
	CardTitle,
	CardHeader,
	CardBody,
	Table,
	FormGroup,
	Form,
	Label,
	Input,
} from "reactstrap";
import { NavLink } from "react-router-dom";

import employeeList from "../employees/__mocks__/employeeList.json";

class EmployeeDirectory extends React.Component {
	constructor(props) {
		super(props);
		// const { id } = this.props.match.params;
		// const employee = find(employeeList, { "guid": id });
		// const experienceScore = ((employee.belongingScore + employee.purposeScore
		// 	+ employee.achievementScore + employee.happinessScore
		// 	+ employee.vigorScore) / 5);
		this.state = {
			allEmployees: employeeList,
		};
	}

	runSearch() {

	}

	buildSearchForm() {
		return (
			<Row>
				<Col>
					<Card>
						<CardHeader>
							<CardTitle tag="h3">Search</CardTitle>
						</CardHeader>
						<CardBody>
							<Form>
								<Row>
									<Col>
										<FormGroup>
											<Label for="employeeFirstName">First Name</Label>
											<Input name="employeeFirstName" id="employeeFirstName" />
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Label for="employeeLastName">Last Name</Label>
											<Input name="employeeLastName" id="employeeLastName" />
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col>
										<FormGroup>
											<Label for="employeeDepartment">Department</Label>
											<Input
												type="select"
												name="employeeDepartment"
												id="employeeDepartment"
											>
												<option>All</option>
												<option>R&D</option>
												<option>HR</option>
												<option>Marketing</option>
												<option>IT</option>
											</Input>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Label for="employeeScore">Score</Label>
											<Input type="select" name="employeeScore" id="employeeScore">
												<option>High</option>
												<option>Medium</option>
												<option>Danger</option>
											</Input>
										</FormGroup>
									</Col>
								</Row>
							</Form>
						</CardBody>
					</Card>
				</Col>
			</Row>
		);
	}

	render() {
		const { allEmployees } = this.state;
		return (
			<>
				{ this.buildSearchForm() }
				<Row>
					<Col>
						<Card>
							<CardHeader>
								<CardTitle tag="h3">Employee Directory</CardTitle>
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
										{ allEmployees.map((employee) => {
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
		);
	}
}

export default EmployeeDirectory;