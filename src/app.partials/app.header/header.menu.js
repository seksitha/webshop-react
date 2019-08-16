import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import clsx from "clsx";
import { Link } from 'react-router-dom'
// import {useTheme} from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		maxWidth: 500,
		hight: 200,
		// backgroundColor: "white",
    //   marginBottom: "-15px",
      // color: 'yellow',
      // '& :hover':{
      //    backgroundColor: 'red',
      // },
      // '& button' : { // space is require
      //    backgroundColor: 'blue'
      // }
      '& .MuiTab-textColorInherit':{
         opacity : 1,
      }
   },
   bar: {
      // backgroundColor:'green'
   }
}));

export default function MenuTabs(props) {
	const classes = useStyles();
    // console.log(props)
	return (
		<Tabs
            className={clsx([classes.root])}
            // value is used to set hightligh under nav
            value={props.navstate} 
         // variant="fullWidth"
         // indicatorColor = "white"
         // textColor = "white"
		>
			
            <Tab className={clsx( props.navstate === 0 && classes.bar)} component={Link} to={{pathname: "/items", search:"?department_id=1"}} label="Original" />
			<Tab className={clsx( props.navstate === 1 && classes.bar)} component={Link} to={{pathname: "/items", search:"?department_id=2"}}  label="Nature" />
			<Tab className={clsx( props.navstate === 2 && classes.bar)} component={Link} to={{pathname: "/items", search:"?department_id=3"}}  label="Seasonal" />
		</Tabs>
	);
}
