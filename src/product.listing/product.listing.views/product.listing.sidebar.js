import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { styled } from '@material-ui/styles';


const MyMenuItem = styled(MenuItem)({
    fontSize: 12,
    minHeight: 30,
});

const useStyles = makeStyles(theme => ({
    [theme.breakpoints.down('sm')]: {
        //backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.only('md')]: {
        // backgroundColor: 'red',
    },
	root: {
		display: "flex",
        flexWrap: "wrap",
        fontSize: 10
	},
	formControl: {
		margin: theme.spacing(1),
        minWidth: 95,
        fontSize: 10
    },
    input : {
        padding:3,
        fontSize: 10
    },
	selectEmpty: {
		marginTop: theme.spacing(2),
    },
    label:{
        transform: "translate(8px, 8px) scale(1)",
        fontSize: 10
    }
}));

export default function SimpleSelect(props) {
	console.log(props);
	const classes = useStyles();
	const [categories, setCategories] = React.useState({
        id:'',
        name:'franch'
	});
	const [deparments, setDepartments] = React.useState({
        id:'',
        name:''
	});

	const inputLabel = React.useRef(null);
	const inputLabelDep = React.useRef(null);
	const [LabelCategoryWidth, setLabelCategoryWidth] = React.useState(0);
	React.useEffect(() => {
		setLabelCategoryWidth(inputLabel.current.offsetWidth);
	}, []);
    const [labelDepartmentWidth, setLabelDepartmentWidth] = React.useState(0);
	React.useEffect(() => {
		setLabelDepartmentWidth(inputLabelDep.current.offsetWidth);
	}, []);
	function handleChangeCategory(event) {
		setCategories(oldValues => ({
			...oldValues,
			[event.target.name]: event.target.value,
		}));
		if (props.departmentId) {
			return props.history.push(
				`/items?department_id=${props.departmentId}&category_id=${
					event.target.value
				}`
			);
		}
		props.history.push(`/items?category_id=${event.target.value}`);
    }
    function handleChangeDeparment(event) {
		setDepartments(oldValues => ({
			...oldValues,
			[event.target.name]: event.target.value,
		}));
		props.history.push(`/items?department_id=${event.target.value}`);
	}

	return (
		<form className={classes.root} autoComplete="off">
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel className={classes.label} ref={inputLabelDep} htmlFor="outlined-age-simple">
					Departments
				</InputLabel>
				<Select
					value={deparments.id}
					onChange={handleChangeDeparment}
					input={
						<OutlinedInput
							labelWidth={labelDepartmentWidth}
							name="id"
                            id="outlined-age-simple"
                            classes={{ input: classes.input }}
						/>
                    }
				>
					<MyMenuItem value={1}>
						Original
					</MyMenuItem>
                    <MyMenuItem value={2}>
						Nature
					</MyMenuItem>
                    <MyMenuItem value={3}>
						Seasonal
					</MyMenuItem>
				</Select>
			</FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
				<InputLabel className={classes.label} ref={inputLabelDep} htmlFor="outlined-age-simple">
					Departments
				</InputLabel>
				<Select
					value={deparments.id}
					onChange={handleChangeDeparment}
					input={
						<OutlinedInput
							labelWidth={labelDepartmentWidth}
							name="id"
                            id="outlined-age-simple"
                            classes={{ input: classes.input }}
						/>
                    }
				>
					<MyMenuItem value={1}>
						Original
					</MyMenuItem>
                    <MyMenuItem value={2}>
						Nature
					</MyMenuItem>
                    <MyMenuItem value={3}>
						Seasonal
					</MyMenuItem>
				</Select>
			</FormControl>

			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel className={classes.label} ref={inputLabel} htmlFor="outlined-age-simple">
					Categories
				</InputLabel>
				<Select
					value={categories.id}
					onChange={handleChangeCategory}
					input={
						<OutlinedInput
                            labelWidth={LabelCategoryWidth}
                            className={classes.hii}
							name="id"
                            id="outlined-age-simple"
                            classes={{ input: classes.input }}
						/>
					}
				>
					{props.categories.map((val, ind) => {
						return (
							<MyMenuItem value={val.category_id} key={ind}>
								{val.name}
							</MyMenuItem>
						);
					})}
				</Select>
			</FormControl>
		</form>
	);
}
