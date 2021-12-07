import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MenuItem } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import { FormGroup } from '@material-ui/core';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUsers, adduser } from '../redux/actions';
import CircularProgress from '@mui/material/CircularProgress';

const genderlist = [
    {
        value: 'male',
        label: 'Male',
    },
    {
        value: 'female',
        label: 'Femal',
    }
];

const theme = createTheme();
const UserForm = () => {
    let history = useHistory();
    let dispatch = useDispatch();
    const [colleges, setColleges] = useState()
    const [isChecked, setIsChecked] = useState(false)
    const [error, setError] = useState()
    const { id } = useParams();
    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        dob: "",
        gender: "",
        college: "",
        address: "",
        hobbies: [],
        isLoaded: false,
    })
    const { users } = useSelector(state => state.data)

    useEffect(() => {
        dispatch(loadUsers())
    }, [])

    useEffect(() => {
        if (id !== undefined && users.length !== 0) {
            const userDetail = users.find(x => x.id === parseInt(id));
            if (userDetail) {
                setState(
                    {
                        firstname: userDetail.firstname,
                        lastname: userDetail.lastname,
                        dob: userDetail.dob,
                        gender: userDetail.gender,
                        college: userDetail.college,
                        address: userDetail.address,
                        hobbies: userDetail.hobbies,
                        isLoaded: true,
                    }
                )
            }
        }
    }, [users, id])

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    };
    const handleCheckboxChange = (e) => {
        if (e.target.value === "other") {
            setIsChecked(!isChecked)
        } else {
            const hobbieArray = [...state.hobbies, e.target.value];
            setState({ ...state, [e.target.name]: hobbieArray })
        }
    };
    const { firstname,
        lastname,
        dob,
        gender,
        college,
        address,
        hobbies } = state
    const handleSubmit = (e) => {
        if (!firstname || !lastname || !dob || !gender || !college || !address || !hobbies) {
            setError("Please Fill all the fields")
        } else {
            e.preventDefault();
            dispatch(adduser(state));
            history.push("/");
        }
    }

    useEffect(() => {
        async function getCollges() {
            await axios.get('http://universities.hipolabs.com/search?name=middle')
                .then((response) => {
                    setColleges(response.data)
                }).catch(console.error("error"))
        }
        getCollges()
    }, [])
    
    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Add User
                        </Typography>
                        {error && <h2>{error}</h2>}
                        {
                            (id !== undefined && state.isLoaded !== true) ? (
                                <CircularProgress />
                            ) : (
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="given-name"
                                                required
                                                fullWidth
                                                id="firstName"
                                                name="firstname"
                                                label="First Name"
                                                autoFocus
                                                defaultValue={state.firstname}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="lastName"
                                                label="Last Name"
                                                name="lastname"
                                                autoComplete="family-name"
                                                defaultValue={state.lastname}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="Date Of Birth"
                                                id="dob"
                                                label="Date Of Birth"
                                                name="dob"
                                                InputLabelProps={{ shrink: true, required: true }}
                                                type="date"
                                                defaultValue={state.dob}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="address"
                                                id="adress"
                                                label="Address"
                                                name="address"
                                                type="textarea"
                                                defaultValue={state.address}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="gender"
                                                select
                                                label="Gender"
                                                name="gender"
                                                defaultValue={state.gender}
                                                onChange={handleChange}>
                                                {genderlist.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="college"
                                                select
                                                label="College"
                                                name="college"
                                                defaultValue={state.college}
                                                onChange={handleChange}
                                            >
                                                {colleges?.map((college, index) => (
                                                    <MenuItem key={`key_${index}`} value={college.name}>
                                                        {college.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormLabel component="legend">Hobbies</FormLabel>
                                            <FormGroup aria-label="position" row>
                                                <FormControlLabel
                                                    value="writing"
                                                    control={<Checkbox />}
                                                    label="Writing"
                                                    labelPlacement="end"
                                                    id="hobbie_writing"
                                                    name="hobbies"
                                                    onChange={handleCheckboxChange}
                                                />
                                                <FormControlLabel
                                                    value="reading"
                                                    control={<Checkbox />}
                                                    label="Reading"
                                                    labelPlacement="end"
                                                    id="hobbie_reading"
                                                    name="hobbies"
                                                    onChange={handleCheckboxChange}
                                                /><FormControlLabel
                                                    value="swimming"
                                                    control={<Checkbox />}
                                                    label="Swimming"
                                                    labelPlacement="end"
                                                    id="hobbie_swimming"
                                                    name="hobbies"
                                                    onChange={handleCheckboxChange}
                                                /><FormControlLabel
                                                    name="hobbies"
                                                    value="other"
                                                    control={<Checkbox />}
                                                    label="other"
                                                    labelPlacement="end"
                                                    id="hobbie_other"
                                                    onChange={handleCheckboxChange}
                                                    checked={isChecked}
                                                />
                                            </FormGroup>
                                        </Grid>
                                        {isChecked ? <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="otherhobbies"
                                                label="Other hobbies"
                                                name="otherhobbies"
                                            />
                                        </Grid> : null}

                                    </Grid>
                                    <Grid container spacing={2} alignItems={"center"}>
                                        <Grid item xs={12} sm={6}>

                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Submit
                                            </Button>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>

                                            <Button
                                                type="cancel"
                                                fullWidth
                                                variant="contained"
                                                color="error"
                                                sx={{ mt: 3, mb: 2 }}
                                                onClick={() => history.push('/')}
                                            >
                                                Cancel
                                            </Button>

                                        </Grid>
                                    </Grid>
                                </Box>
                            )
                        }
                    </Box>
                </Container>
            </ThemeProvider>

        </>
    )
}

export default UserForm
