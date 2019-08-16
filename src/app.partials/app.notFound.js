import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: "center",
		color: theme.palette.text.secondary
	}
});

function NotFound(props) {
	const { classes } = props;

	return (
		<div className={classes.root}>
			<Grid container spacing={24}>
            <h3>Component not found go here</h3>
			</Grid>
		</div>
	);
}

NotFound.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotFound);
