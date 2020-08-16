import React, { useEffect, useState, useContext } from 'react';
import './css/ReviewMovie.css';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { MoviesContext } from '../../context/MoviesContext';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

import StarIcon from '@material-ui/icons/Star';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
const ReviewMovie = () => {
    const [movies, setMovies] = useState(null)
    const { id } = useParams();
    const history = useHistory()
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
        if (movies === null) {
            axios.get(`https://backendexample.sanbersy.com/api/movies/${id}`)
                .then(res => {
                    setMovies(res.data)
                })
        }
    })
    console.log(movies)
    const classes = useStyles();
    const HandleBack = (event) => {
        event.preventDefault()
        history.push("/movie");
    }
    return (
        <>
            {movies !== null &&
                <div id="contentreview">
                    <div id="bagianatas">
                        <div id="kotakitem">
                            <>
                                <div id="itemjudul">{movies.title}{movies.year}</div>
                                <div id="itemrating"><StarIcon style={{ color: "yellow", fontSize: "40px" }} /> {movies.rating}<sub>/10</sub></div>
                                <div id="itemkecil">{movies.duration} min | {movies.genre} | {movies.year}</div>

                            </>

                            <Grid container spacing={3} style={{ marginTop: "5px" }}>
                                <Grid item xs={4}>
                                    <img src={movies.image_url} style={{ width: "237px", border: "2px solid rgb(14, 14, 14)", borderRadius: "5px    " }} />
                                </Grid>
                                <Grid item xs={8}>
                                    <br />
                                    <span style={{ fontSize: "15px", fontWeight: "bold" }}>Movie Name  :</span><span style={{ fontSize: "15px" }}> {movies.title}</span>
                                    <br /><br />
                                    <span style={{ fontSize: "15px", fontWeight: "bold" }}>Rating  :</span><span style={{ fontSize: "15px" }}><StarIcon style={{ fontSize: "15px", color: "yellow" }} /> {movies.rating}</span>
                                    <br /><br />
                                    <span style={{ fontSize: "15px", fontWeight: "bold" }}>Duration  :</span><span style={{ fontSize: "15px" }}> {movies.duration} min</span>
                                    <br /><br />
                                    <span style={{ fontSize: "15px", fontWeight: "bold" }}>Genre  :</span><span style={{ fontSize: "15px" }}> {movies.genre}</span>
                                    <br /><br />
                                    <span style={{ fontSize: "15px", fontWeight: "bold" }}>Year Release  :</span><span style={{ fontSize: "15px" }}> {movies.year}</span>
                                    <br /><br />
                                    <span style={{ fontSize: "15px", fontWeight: "bold" }}>Description  :</span><span style={{ fontSize: "15px" }}> {movies.description}</span>
                                    <br /><br />
                                    <Button color="secondary" onClick={HandleBack} variant="outlined"><ArrowBackIcon />Back</Button>

                                </Grid>
                                <Grid item xs={8}>
                                    <span style={{ marginTop: "300px" }}><span style={{ fontSize: "19px", fontWeight: "bold" }}>Review  :</span>
                                        <span><p style={{ textAlign: "justify", border: "2px solid rgb(14, 14, 14)", padding: "5px", width: "900px", borderRadius: "5px" }}>{movies.review}</p></span> </span>
                                </Grid>
                            </Grid>
                        </div>

                    </div>

                </div>
            }
        </>
    )
}
export default ReviewMovie;