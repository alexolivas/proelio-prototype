// import axios from "axios";
import { BasePage, showErrorNotice } from "8bit-ghost-ui";
import React from "react";
import { Alert } from "reactstrap";

import Header from "./Header";

class ProelioPage extends React.Component {

	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		environment: process.env.NODE_ENV,
	// 	};
	// }

	/**
	 * Once the component loads verify that this web app can communicate with the API configured
	 */
	// componentDidMount() {
	// 	const url = "/api/status";
	// 	axios.get(url)
	// 		.then()
	// 		.catch(() => {
	// 			showErrorNotice("Iris service is unreachable.");
	// 		});
	// }

	render() {
		// const { environment } = this.state;
		// const apiUrl = process.env.REACT_APP_IRIS_API_URL;
		// const appEnvironment = process.env.REACT_APP_ENVIRONMENT;
		// const bannerStyle = {
		// 	position: "fixed",
		// 	right: "15px",
		// 	bottom: "15px",
		// 	margin: 0,
		// 	padding: 0,
		// 	zIndex: 1,
		// 	fontSize: "12px",
		// };
		return (
			<BasePage
				activeColor="green"
				sidebarLogo={{
					innerLink: "/",
					text: "Proelio",
					imgSrc: "fas fa-atom fa-2x",
					logoType: "icon",
				}}
				routes={ this.props.routes }
				renderNavbar={ () => <Header /> }
			>
				<div className="content">
					{/* TODO: use React.children */}
					{ this.props.children }
					{/* { environment !== "production" && (
						<div id="environment-banner" style={ bannerStyle }>
							<Alert color="default">
								<strong>API:</strong>
								{ apiUrl }
								<br />
								<strong>Environment: </strong>
								{ appEnvironment }
							</Alert>
						</div>
					)} */}
				</div>
			</BasePage>
		);
	}

}

export default ProelioPage;
