import React, { useState, useEffect } from 'react';
import './css/Home.css';

import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
// import tileData from './tileData';
import Axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const Home = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
            marginTop: "10px",
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,

        },
        gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        title: {
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
            '&:hover': {
                fontWeight: "bold",
                color: "gold"
            }
        },
        titleBar: {
            background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
    }));

    const classes = useStyles();
    const [movies, setMovies] = useState(null)
    const [games, setGames] = useState(null)
    const history = useHistory();

    useEffect(() => {
        if (movies === null) {
            Axios.get(`https://backendexample.sanbersy.com/api/movies`)
                .then(res => {
                    setMovies(res.data)
                })
                .catch(err => {
                    console.log("gagal mengambil data movies, cek koneksi internet anda", err)
                })
        }
    })

    useEffect(() => {
        if (games === null) {
            Axios.get(`https://backendexample.sanbersy.com/api/games`)
                .then(res => {
                    setGames(res.data)
                })
                .catch(err => {
                    console.log("gagal mengambil data games, cek koneksi internet anda", err)
                })
        }
    })
    return (
        <>
            <div id="movies">
                <h1>All Movies</h1>
            </div>
            <div id="moviesdesc">
                <h1>All movies you can choose :</h1>
            </div>
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={2.5}>
                    {movies !== null && movies.map((item, index) => (
                        <GridListTile key={index}>
                            <img src={item.image_url} alt={item.title} onClick={(e) => history.push(`/movie/reviewmovie/${item.id}`)} />
                            <GridListTileBar
                                title={item.title}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                }}
                                onClick={(e) => history.push(`/movie/reviewmovie/${item.id}`)}
                                actionIcon={
                                    <IconButton aria-label={`star ${item.title}`}>
                                        <StarBorderIcon style={{ color: "yellow" }} className={classes.title} />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>

            <div id="games">
                <h1>All Games</h1>
            </div>
            <div id="gamesdesc">
                <h1>All games you can choose :</h1>
            </div>
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={2.5}>
                    {games !== null && games.map((item, index) => (
                        <GridListTile key={index}>
                            <img src={item.image_url} alt={item.name} onClick={(e) => history.push(`/game/detailgame/${item.id}`)} />
                            <GridListTileBar
                                title={item.name}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                }}
                                onClick={(e) => history.push(`/game/detailgame/${item.id}`)}
                                actionIcon={
                                    <IconButton aria-label={`star ${item.name}`}>
                                        <StarBorderIcon style={{ color: "yellow" }} className={classes.title} />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </>
    );
}
export default Home;