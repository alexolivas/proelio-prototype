// import classNames from "classnames";
import React from "react";
import {
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	NavLink,
	Nav,
} from "reactstrap";

class Header extends React.PureComponent {

	render() {
		return (
			<Nav className="ml-auto" navbar>
				<UncontrolledDropdown nav>
					<DropdownToggle
						caret
						color="default"
						data-toggle="dropdown"
						nav
					>
						<div className="notification d-none d-lg-block d-xl-block" />
						<i className="tim-icons icon-sound-wave" />
						<p className="d-lg-none">Notifications</p>
					</DropdownToggle>
					<DropdownMenu className="dropdown-navbar" right tag="ul">
						<NavLink tag="li">
							<DropdownItem className="nav-item">
								No new messages (This is the new class)
							</DropdownItem>
						</NavLink>
					</DropdownMenu>
				</UncontrolledDropdown>
				<UncontrolledDropdown nav>
					<DropdownToggle
						caret
						color="default"
						data-toggle="dropdown"
						nav
						onClick={ (e) => e.preventDefault() }
					>
						<div>
							<i className="fas fa-user-ninja" />
						</div>
						<b className="caret d-none d-lg-block d-xl-block" />
						<p className="d-lg-none">Log Out</p>
					</DropdownToggle>
					<DropdownMenu className="dropdown-navbar" right tag="ul">
						<NavLink tag="li">
							<DropdownItem className="nav-item">Settings (TODO: new class)</DropdownItem>
						</NavLink>
						<DropdownItem divider tag="li" />
						<NavLink tag="li">
							<DropdownItem className="nav-item">Log out (TODO: new class)</DropdownItem>
						</NavLink>
					</DropdownMenu>
				</UncontrolledDropdown>
				<li className="separator d-lg-none" />
			</Nav>
		);
	}

}

export default Header;
