import React, { Component, useContext, useState, useEffect } from 'react';
import './css/ListGame.css';
import { MoviesContext } from '../../context/MoviesContext'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
const ListGame = () => {
    const [games, setGames] = useState(null);
    const history = useHistory();
    ;


    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 2,
        },
        paper: {
            padding: theme.spacing(2),
            margin: '5px',
            marginTop: '10px',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '1050px',
            border: '5px solid whitesmoke'
        },
        image: {
            width: 150,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
    }));

    useEffect(() => {
        if (games === null) {
            axios.get(`https://backendexample.sanbersy.com/api/games`)
                .then(res => {
                    setGames(res.data)
                })
        }
    }

    )
    console.log(games);
    const Actions = ({ itemid }) => {

        const handleReview = () => {
            history.push(`/game/detailgame/${itemid}`)
        }
        return (
            <>
                <Button color="secondary" onClick={handleReview} variant="outlined"><SportsEsportsIcon />Cek Detail Game</Button>
            </>
        )
    }
    const classes = useStyles()
    return (
        <>  <div id="judul">
            <h1>GAME LIST</h1>
        </div>
            <div id="content">

                {games !== null && games.map((item, index) => {
                    return (
                        <>
                            <div className={classes.root} key={index}>
                                <Paper className={classes.paper}>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <ButtonBase className={classes.image}>
                                                <img className={classes.img} alt="complex" src={item.image_url} />
                                            </ButtonBase>
                                        </Grid>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="subtitle1">
                                                        <span style={{ fontWeight: 'bold', fontSize: "19px", textTransform: "uppercase" }}>{item.name}</span>
                                                        <span> ({item.release})</span>
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        <span style={{ fontWeight: "bold" }}>Singleplayer :</span>{item.singlePlayer === 1 ? 'Yes' : 'No'} | <span style={{ fontWeight: "bold" }}>Multiplayer :</span>{item.multiplayer === 1 ? "Yes" : "No"}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        <span style={{ fontWeight: "bold" }}>{item.genre}</span>

                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                                        <Actions itemid={item.id} />
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </div>
                        </>
                    )
                }
                )}


            </div>
        </>
    )
}
export default ListGame;