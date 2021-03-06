import React from 'react';
import logo from './logo.svg';
import './App.css';

// import axios from "axios";
// import React from "react";
import { Route, Switch } from "react-router-dom";

// import Config from "./configuration";
// import Health from "./health";
// import Hosts from "./entities/Hosts";
// import { ProelioPage } from "./common";
// import SearchPage from "./search";
// import Users from "./entities/Users";
// import Welcome from "./common/Welcome";
// import EntityDetails from "./entities/EntityDetails";
import Dashboard from './dashboard/Dashboard';
import ProelioPage from './common/ProelioPage';
// import NotFound from "./common/NotFound";

class App extends React.Component {

	/**
	 * This method is responsible for building out route components for all the
	 * routes defined in the system, including nested routes.
	 * @param {*} routes
	 */
	static getRoutes(routes) {
		return routes.map((route, key) => (
			<Route
				exact
				path={ route.path }
				component={ route.component }
				key={ key }
			/>
		));
	}

	constructor(props) {
		super(props);
		const sideNavRoutes = [
			{
				name: "Dashboard",
				icon: "fas fa-tachometer-alt",
				path: "/",
				component: Dashboard,
				layout: "",
			},
			{
				name: "Employee Directory",
				icon: "fas fa-user",
				path: "/employees",
				component: Dashboard,
				layout: "",
			},
		];
		this.state = {
			sideNavRoutes,
		};
	}

	render() {
		const { sideNavRoutes } = this.state;
		return (
			<ProelioPage routes={ sideNavRoutes }>
				<Switch>
					{ App.getRoutes(sideNavRoutes) }
					<Route path="*" component={ Dashboard } />
				</Switch>
			</ProelioPage>
		);
	}

}

export default App;
