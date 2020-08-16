import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { UserContext } from '../../context/UserContext';

const Login = () => {
    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            alignItems: "center",
            width: "500px",
            padding: "50px",
            marginTop: "100px",
            marginLeft: "auto",
            marginRight: "auto",
            border: "5px solid whitesmoke",
            borderRadius: "10px"
        },
        avatar: {
            alignItems: "center",
            margin: theme.spacing(1),
            backgroundColor: "black",
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
            color: "black",
            fontSize: "20px",
            backgroundColor: "gold"
        },
        label: {
            color: "black"
        }
    }));


    const classes = useStyles();
    const [users, setUsers] = useContext(UserContext)
    const [input, setInput] = useState({
        username: "",
        password: ""
    })
    const history = useHistory();

    const handleChange = (e) => {
        let getName = e.target.name;
        switch (getName) {
            case "username": setInput({ ...input, username: e.target.value })
                break;
            case "password": setInput({ ...input, password: e.target.value })
                break;
            default: { break; }
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`https://backendexample.sanbersy.com/api/login`, { username: input.username, password: input.password })
            .then(hasil => {
                console.log('berhasilmenambahkandata', hasil)
                localStorage.setItem("login", JSON.stringify({ username: input.username, password: input.password }))

            }).catch(gagal => {
                console.log("gagal", gagal)
            })
    }
    console.log(users)
    const handleBack = (e) => {
        history.push("/");
    }
    const ToRegister = (e) => {
        history.push("/register")
    }
    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>

                    <Typography style={{ fontSize: "30px" }} variant="h5">
                        Login
        </Typography>
                    <form className={classes.form} Validate onSubmit={handleSubmit}>
                        <InputLabel className={classes.label}>Username :</InputLabel>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            type="text"
                            autoFocus
                            className={classes.input}
                            onChange={handleChange}
                            value={input.username}
                        />
                        <InputLabel className={classes.label}>Password :</InputLabel>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            className={classes.input}
                            onChange={handleChange}
                            value={input.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                        >
                            <ExitToAppOutlinedIcon /> Sign In
          </Button>
                        <Grid container>
                            <Grid item xs>
                                <h4 onClick={ToRegister} style={{ cursor: "pointer" }}>Belum punya akun? Registrasi disini </h4>
                            </Grid>
                            <Grid item  >
                                <h3 onClick={handleBack} style={{ cursor: "pointer", color: "red" }}>Back</h3>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                </Box>
            </Container>
        </>
    )
}
export default Login;