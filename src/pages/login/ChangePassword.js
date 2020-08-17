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


const ChangePassword = () => {

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
    const getId = JSON.parse(localStorage.getItem('login')) ? JSON.parse(localStorage.getItem('login')).id : 0;
    const getUsername = JSON.parse(localStorage.getItem('login')) ? JSON.parse(localStorage.getItem('login')).username : null;
    const getPassword = JSON.parse(localStorage.getItem('login')) ? JSON.parse(localStorage.getItem('login')).password : null;
    const [input, setInput] = useState({
        username: getUsername,
        password: "",
        newpassword: ""
    })
    const history = useHistory();

    const handleChange = (e) => {
        let getName = e.target.name;
        switch (getName) {
            case "username": setInput({ ...input, username: e.target.value })
                break;
            case "password": setInput({ ...input, password: e.target.value })
                break;
            case "newpassword": setInput({ ...input, newpassword: e.target.value })
                break;
            default: { break; }
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let username = input.username;
        let password = input.password;
        let newpassword = input.newpassword;
        if (password.replace(/\s/g, '') === getPassword && password.replace(/\s/g, '') !== newpassword) {
            axios.put(`https://backendexample.sanbersy.com/api/users/${getId}`, { username: input.username, password: input.newpassword })
                .then(res => {
                    localStorage.setItem("login", JSON.stringify({ id: getId, username: input.username, password: input.newpassword }))
                    setInput({
                        username: "",
                        password: "",
                        newpassword: ""
                    })
                    console.log("berhasil update", res)
                    alert('Selamat Password berhasil diubah :)')
                    history.push("/");
                })
                .catch(err => {
                    console.log("Error", err)
                })
        } else if (password.replace(/\s/g, '') === newpassword) {
            alert("Maaf New password harus berbeda dengan Old Password")
        }
        else {
            alert('Password salah, Mohon cek kembali')
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
                        InputProps={{
                            readOnly: true,
                            shrink: true
                        }}

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
                    <InputLabel className={classes.label}>New Password :</InputLabel>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="newpassword"
                        label="New Password"
                        type="password"
                        id="password"
                        className={classes.input}
                        onChange={handleChange}
                        value={input.newpassword}
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
                        <Grid item  >
                            <h3 onClick={handleBack} style={{ cursor: "pointer" }}>Back</h3>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
            </Box>
        </Container>
    );
}
export default ChangePassword;