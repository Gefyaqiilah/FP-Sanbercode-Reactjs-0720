import React, { useEffect, useState, useContext } from 'react';
import './css/DetailGame.css';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { MoviesContext } from '../../context/MoviesContext';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

import StarIcon from '@material-ui/icons/Star';
import GamesIcon from '@material-ui/icons/Games';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Button from '@material-ui/core/Button';
const DetailGame = () => {
    const [games, setGames] = useState(null)
    const history = useHistory();
    const { id } = useParams();
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));
    useEffect(() => {
        if (games === null) {
            axios.get(`https://backendexample.sanbersy.com/api/games/${id}`)
                .then(res => {
                    setGames(res.data)
                })
        }
    })
    const HandleBack = (event) => {
        event.preventDefault()
        history.push("/game");
    }
    console.log(games)
    const classes = useStyles();
    return (
        <>
            {games !== null &&
                <div id="contentreview">
                    <div id="bagianatas">
                        <div id="kotakitem">
                            <>
                                <div id="itemjudul">{games.name}{games.release}</div>
                                <div id="itemrating"><GamesIcon style={{ color: "yellow", fontSize: "60px" }} /></div>
                                <div id="itemkecil">{games.platform} | {games.genre} </div>
                            </>

                            <Grid container spacing={3} style={{ marginTop: "5px" }}>
                                <Grid item xs={4}>
                                    <img src={games.image_url} style={{ width: "237px", border: "2px solid rgb(14, 14, 14)", borderRadius: "5px    " }} />
                                </Grid>
                                <Grid item xs={8}>
                                    <br />
                                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>Game Name  :</span><span style={{ fontSize: "15px" }}> {games.name}</span>
                                    <br /><br />
                                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>Platform  :</span><span style={{ fontSize: "15px" }}> {games.platform}</span>
                                    <br /><br />
                                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>Genre  :</span><span style={{ fontSize: "15px" }}> {games.genre}</span>
                                    <br /><br />
                                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>SinglePlayer :</span><span style={{ fontSize: "15px" }}>  {games.singlePlayer === 1 ? "Yes" : "No"} </span>
                                    <br /><br />
                                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>MultiPlayer :</span><span style={{ fontSize: "15px" }}> {games.multiplayer === 1 ? "Yes" : "No"}</span>
                                    <br /><br />
                                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>Year Release  :</span><span style={{ fontSize: "15px" }}> {games.release}</span>
                                    <br /><br />
                                    <Button color="secondary" onClick={HandleBack} variant="outlined"><ArrowBackIcon />Back</Button>
                                </Grid>
                            </Grid>
                        </div>

                    </div>

                </div>
            }
        </>
    )
}
export default DetailGame;