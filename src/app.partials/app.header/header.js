import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import SvgIcon from "@material-ui/core/SvgIcon";
import { useStyles } from "./header.style";

import MenuTabs from "./header.menu";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
export default function Header(props) { // functinal component use react hook to minipulate state
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null); // hook AnchorEl
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null); // hook MobileMoreAnchorEl

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	function handleProfileMenuOpen(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleMobileMenuClose() {
		setMobileMoreAnchorEl(null);
	}

	function handleMenuClose() {
		setAnchorEl(null);
		handleMobileMenuClose();
	}

	function handleMobileMenuOpen(event) {
		setMobileMoreAnchorEl(event.currentTarget);
	}

	const menuId = "primary-search-account-menu";
	const mobileMenuId = "primary-search-account-menu-mobile";
	return (
		<div className={classes.grow}>
			<div>this is top header</div>
			<AppBar className={classes.appBar} position="static">
				{/* <AppBar color="default" position="static"> */}
				<Toolbar>
					<Link
						component={RouterLink}
						to="/"
						color="secondary"
						className={classes.title}
						variant="h6"
						noWrap
					>
						SHOPMATE
					</Link>

					{/* this div take up the free front space */}
					<div className={classes.grow} />


					{/* Search box */}
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ "aria-label": "Search" }}
						/>
					</div>

					{/* desktop icons */}
					<div className={classes.sectionDesktop}>
                    					{/* this is nav button for department */}
					    <MenuTabs navstate={props.navstate} />
						<IconButton
							aria-label="Account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<Badge badgeContent={4} color="secondary">
								<AccountCircle />
							</Badge>
						</IconButton>
						<IconButton aria-label="Show 4 new mails" color="inherit">
							<Badge badgeContent={4} color="secondary">
								<SvgIcon {...props}>
									<path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
								</SvgIcon>
							</Badge>
						</IconButton>
						<IconButton
							edge="end"
							aria-label="Show 17 new notifications"
							color="inherit"
						>
							<Badge badgeContent={17} color="secondary">
								<SvgIcon {...props}>
									<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
								</SvgIcon>
							</Badge>
						</IconButton>
					</div>
					{/* mobile icones */}
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="Show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<Menu
				anchorEl={mobileMoreAnchorEl}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				id={mobileMenuId}
				keepMounted
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				open={isMobileMenuOpen}
				onClose={handleMobileMenuClose}
			>
				<MenuItem>
					<IconButton aria-label="Show 4 new mails" color="inherit">
						<Badge badgeContent={4} color="secondary">
							<MailIcon />
						</Badge>
					</IconButton>
					<p>Messages</p>
				</MenuItem>
				<MenuItem>
					<IconButton aria-label="Show 11 new notifications" color="inherit">
						<Badge badgeContent={11} color="secondary">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<p>Notifications</p>
				</MenuItem>
				<MenuItem onClick={handleProfileMenuOpen}>
					<IconButton
						aria-label="Account of current user"
						aria-controls="primary-search-account-menu"
						aria-haspopup="true"
						color="inherit"
					>
						<AccountCircle />
					</IconButton>
					<p>Profile</p>
				</MenuItem>
			</Menu>

			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				id={menuId}
				keepMounted
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				open={isMenuOpen}
				onClose={handleMenuClose}
			>
				<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
				<MenuItem onClick={handleMenuClose}>My account</MenuItem>
			</Menu>
		</div>
	);
}
