import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import red from "@material-ui/core/colors/red";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import { Paper } from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";
import Hidden from "@material-ui/core/Hidden";
import SimpleSelect from "./../product.listing.views/product.listing.sidebar";

const styles = theme => ({
	// '@media only screen and (min-width: 600px)': { // apply only width bigger than 600
	//     span: {
	//       display: 'none',
	//     },
	//     card: {
	//         maxWidth: "48%",
	//         marginRight:10,
	//         marginTop:15,
	//     },
	// },
	// '@media only screen and (min-width: 1200px)': {
	//     span: {
	//       display: 'none',
	//     },
	//     card: {
	//         maxWidth: "20%",
	//         marginRight:30,
	//         marginLeft:25,
	//         marginTop:25,
	//         marginBottom:10,
	//     },
	// },
	// '@media only screen and (max-width: 600px)': {
	//     card: {
	//         maxWidth: "95.5%",
	//         marginRight:10,
	//         marginTop:15,
	//     },
	//     sidebar: {
	//         display:'none'
	//     }
	// },
    [theme.breakpoints.down('sm')]: {
        //backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.only('md')]: {
        // backgroundColor: 'red',
    },
	media: {
		height: 0,
		paddingTop: "100%", // 16:9
	},
	actions: {
		display: "flex",
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	avatar: {
		backgroundColor: red[500],
	},
	root: {
		flexGrow: 1,
	},
	paper: {
		marginTop: theme.spacing(2),
		// textAlign: "center",
		color: theme.palette.text.secondary,
	},
	typography: {
		padding: 10,
	},
});

class ProductListingContainer extends React.Component {
	state = { expanded: false };

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};
	handleclick = () => {
		this.props.dispatcher("dispatch-call", { l: "something" });
	};

	render() {
		const { classes, history } = this.props;
		const queryStringObject = queryString.parse(this.props.location.search);
		const { categories } = this.props.productListingReducer;
		const { departmentId } = this.props.appReducer;
		return (
			<React.Fragment>
				<Grid container spacing={2}>
					<Hidden smUp>
						<Grid
							className={`${classes.paper} ${classes.sidebar}`}
							item
							md={3}
							lg={2}
						>
							<SimpleSelect {...{ categories, history, departmentId }} />
						</Grid>
					</Hidden>
				</Grid>
				<Grid container spacing={2}>
					<Hidden only={["xs", "sm"]}>
						<Grid
							className={`${classes.paper} ${classes.sidebar}`}
							item
							md={3}
							lg={2}
						>
							<Paper>
								{this.props.appReducer.navState !== false
									? this.props.productListingReducer.categories.map(
											(val, ind) => {
												return (
													<Link
														component={RouterLink}
														to={{
															pathname: "/items",
															search: `?department_id=${
																val.department_id
															}&category_id=${val.category_id}`,
														}}
														variant="inherit"
														key={ind}
													>
														<MenuItem
															selected={
																parseInt(queryStringObject.category_id) ===
																val.category_id
															}
														>
															{val.name}
														</MenuItem>
													</Link>
												);
											}
									  )
									: this.props.productListingReducer.categories.map(
											(val, ind) => {
												return (
													<Link
														component={RouterLink}
														to={{
															pathname: "/items",
															search: `?category_id=${val.category_id}`,
														}}
														variant="inherit"
														key={ind}
													>
														<MenuItem
															selected={
																parseInt(queryStringObject.category_id) ===
																val.category_id
															}
														>
															{val.name}
														</MenuItem>
													</Link>
												);
											}
									  )}
							</Paper>
						</Grid>
					</Hidden>
					<Grid item xs={12} sm={12} md={9} lg={10}>
						<Grid container spacing={7}>
							{this.props.productListingReducer.productsByCategory.map(
								(val, ind) => {
									return (
										<Grid
											className={classes.paper}
											item
											xs={6}
											sm={4}
											md={4}
											lg={3}
											key={ind}
										>
											<Card className={classes.card}>
												<CardMedia
													className={classes.media}
													image={`https://backendapi.turing.com/images/products/${
														val.thumbnail
													}`}
													title="Paella dish"
												/>
												<Typography
													className={classes.typography}
													gutterBottom
													variant="h6"
													component="h2"
												>
													{val.name}
												</Typography>

												<Typography
													className={classes.typography}
													variant="body2"
													color="textSecondary"
													component="p"
												>
													{val.description}
												</Typography>
											</Card>
										</Grid>
									);
								}
							)}
						</Grid>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

ProductListingContainer.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = props => {
	// props here pass to component and redux map not higher order component
	// HOC's props can be acess inside componentDid/WillMount
	//    console.log(props)
	return {
		...props, // this is my preference keep original name of props.
	};
};

const mapDispatchToProps = dispatch => {
	return {
		dispatcher: (type, payload) => {
			return dispatch({ type: type, payload: payload });
		},
		...bindActionCreators({}, dispatch),
	};
};

export default withStyles(styles)(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(withRouter(withWidth()(ProductListingContainer)))
);
