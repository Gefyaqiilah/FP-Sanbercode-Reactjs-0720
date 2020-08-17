import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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


const Register = () => {

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
        e.preventDefault()
        let username = input.username;
        let password = input.password;
        if (username.replace(/\s/g, '') !== "" && password.replace(/\s/g, '') !== "") {
            axios.post(`https://backendexample.sanbersy.com/api/users`, { username: input.username, password: input.password })
                .then(res => {
                    alert('Akun anda berhasil dibuat!')
                    localStorage.setItem("login", JSON.stringify({ id: res.data.id, username: input.username, password: input.password }))
                    setInput({
                        username: "",
                        password: ""
                    })
                    history.push("/");
                })
                .catch(err => {
                    console.log("Error", err)
                })
        } else {
            alert('Maaf Kolom registrasi masih kosong,silahkan cek kembali!')
        }
    }
    const handleBack = (e) => {
        history.push("/");
    }
    console.log(input)
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography style={{ fontSize: "30px" }} variant="h5">
                    Register
        </Typography>
                <form className={classes.form} Validate onSubmit={handleSubmit}>
                    <InputLabel className={classes.label}>Masukan Username :</InputLabel>
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
                    <InputLabel className={classes.label}>Masukan Password :</InputLabel>
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
                        <ExitToAppOutlinedIcon /> Sign Up
          </Button>
                    <Grid container>
                        <Grid item xs >
                            <h4 onClick={() => history.push("/login")} style={{ cursor: "pointer" }}>Udah punya akun? Login disini</h4>
                        </Grid>
                        <Grid item >
                            <h4 onClick={handleBack} style={{ cursor: "pointer", color: "red" }}>Back</h4>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
            </Box>
        </Container>
    );
}
export default Register;