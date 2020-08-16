import React, { Component, useContext, useState, useEffect } from 'react';
import './css/ListMovie.css';
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

const ListMovie = () => {
    const [movies, setMovies] = useContext(MoviesContext);
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
        if (movies.lists === null) {
            axios.get(`https://backendexample.sanbersy.com/api/movies`)
                .then(res => {
                    setMovies({
                        ...movies, lists: res.data.map(el => {
                            return {
                                id: el.id,
                                created_at: el.created_at,
                                updated_at: el.updated_at,
                                title: el.title,
                                description: el.description,
                                year: el.year,
                                duration: el.duration,
                                genre: el.genre,
                                rating: el.rating,
                                review: el.review,
                                image_url: el.image_url
                            }
                        })
                    })
                })
        }
    })
    const Actions = ({ itemid }) => {

        const handleReview = () => {
            history.push(`/movie/reviewmovie/${itemid}`)
        }
        return (
            <>
                <Button color="secondary" onClick={handleReview} variant="outlined">Cek Detail & Review</Button>
            </>
        )
    }
    const classes = useStyles()
    return (
        <>  <div id="judul">
            <h1>MOVIE LIST</h1>
        </div>
            <div id="content">

                {movies.lists !== null && movies.lists.map((item, index) => {
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
                                                        <span style={{ fontWeight: 'bold', fontSize: "19px", textTransform: "uppercase" }}>{item.title}</span>
                                                        <span> ({item.year})</span>
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {item.duration} min | {item.genre}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        <StarIcon style={{ color: "orange" }} /> <span style={{ fontWeight: "bold" }}>{item.rating}</span>
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        {item.description}
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
export default ListMovie;