import React, { useState, useEffect } from 'react';
import { MoviesContext } from '../../context/MoviesContext'
import { Redirect, Link, useHistory } from 'react-router-dom';
import './css/TableMovie.css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import { Link as Linkto } from 'react';


import axios from 'axios';

// import MaterialTable from 'material-table';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const TableMovie = () => {
    const classes = useStyles();
    const history = useHistory();
    const [movies, setMovies] = useState(null);
    const [click, setClick] = useState({
        year: true,
        genre: true,
        rating: true,
        duration: true
    })
    useEffect(() => {
        if (movies === null) {
            axios.get(`https://backendexample.sanbersy.com/api/movies`)
                .then(res => {

                    setMovies(res.data.map(el => {
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

                    }))
                })
        }
    })
    console.log(movies)

    const Actions = ({ itemsid }) => {

        const handleDelete = () => {
            console.log(itemsid)
            let newMovies = movies.filter(el => el.id !== itemsid);

            axios.delete(`https://backendexample.sanbersy.com/api/movies/${itemsid}`)
                .then(res => {
                    console.log(res);
                })
            setMovies([...newMovies])


        }

        const handleEdit = () => {
            history.push(`/movie/tablemovie/edit/${itemsid}`)

        }

        return (
            <>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleDelete}
                    style={{ backgroundColor: "gold", color: "black", fontWeight: 'bolder' }}> <DeleteForeverIcon />
                </Button>
                                                &nbsp;
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleEdit}
                    style={{ backgroundColor: "gold", color: "black", fontWeight: 'bolder' }}> <EditIcon />
                </Button>
                {/* <Link to={`/movie/tablemovie/edit/${itemsid}`}>Edit</Link> */}
            </>
        )
    }

    const sortbyYear = (event) => {
        event.preventDefault();

        if (click.year === true) {
            var year = movies.sort((x1, x2) => parseInt(x1.year) - parseInt(x2.year))
            console.log(click);
            setClick({ ...click, year: false });

        } else if (click.year === false) {
            var year = movies.sort((x1, x2) => parseInt(x2.year) - parseInt(x1.year))
            console.log(click);
            setClick({ ...click, year: true });
        }
        console.log(click.year)
        setMovies([...year]);
    }
    const sortbyRating = (event) => {
        event.preventDefault();
        if (click.rating === true) {
            var rating = movies.sort((x1, x2) => parseFloat(x1.rating) - parseFloat(x2.rating))
            setClick({ ...click, rating: false })
        } else if (click.rating === false) {
            var rating = movies.sort((x1, x2) => parseFloat(x2.rating) - parseFloat(x1.rating))
            setClick({ ...click, rating: true })
        }
        setMovies([...rating])
    }
    const sortbyDuration = (event) => {
        event.preventDefault();
        if (click.duration === true) {
            var duration = movies.sort((x1, x2) => parseInt(x1.duration) - parseInt(x2.duration))
            setClick({ ...click, duration: false })
        } else if (click.duration === false) {
            var duration = movies.sort((x1, x2) => parseInt(x2.duration) - parseInt(x1.duration))
            setClick({ ...click, duration: true })
        }
        setMovies([...duration]);
    }
    return (
        <>

            <div id="content">
                <h1><span>Movies Lists</span></h1>
                {/* <h4><span style={{ color: "white", fontWeight: "700", marginTop: "5px", backgroundColor: "black", padding: "5px", borderRadius: "4px" }}>Daftar berbagai macam film dalam satu tabel</span></h4> */}


                {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}


                <Button
                    href="/movie/tablemovie/create"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{ marginTop: "0px", marginLeft: "85%", fontSize: "19px", width: "150px", backgroundColor: "gold", color: "black", fontWeight: 'bolder' }}
                > Add Movie
                 </Button>
                <br />

                {/* ...................................table.............................. */}
                <TableContainer style={{ width: "90%", backgroundColor: "rgb(245, 245, 245)" }} id="table">
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead >
                            <TableRow >
                                <TableCell style={{ color: "black", fontSize: "17px" }} align="right">Actions</TableCell>
                                <TableCell style={{ color: "black", fontSize: "17px" }}>No</TableCell>
                                <TableCell style={{ color: "black", fontSize: "17px" }} align="right">Title</TableCell>
                                <TableCell style={{ color: "black", fontSize: "17px" }} align="right">Description</TableCell>
                                <TableCell style={{ color: "black", fontSize: "17px", width: "150px" }} align="left">Year
                                    {click.year === true && <ArrowUpwardIcon style={{ float: "left" }} onClick={sortbyYear} />}
                                    {click.year === false && <ArrowDownwardIcon style={{ float: "right" }} onClick={sortbyYear} />}

                                </TableCell>
                                <TableCell style={{ color: "black", fontSize: "17px" }} align="right">Duration
                                    {click.duration === true && <ArrowUpwardIcon style={{ float: "left" }} onClick={sortbyDuration} />}
                                    {click.duration === false && <ArrowDownwardIcon style={{ float: "right" }} onClick={sortbyDuration} />}
                                </TableCell>
                                <TableCell style={{ color: "black", fontSize: "17px" }} align="center">Genre</TableCell>
                                <TableCell style={{ color: "black", fontSize: "17px" }} align="center">Rating
                                    {click.rating === true && <ArrowUpwardIcon style={{ float: "left" }} onClick={sortbyRating} />}
                                    {click.rating === false && <ArrowDownwardIcon style={{ float: "right" }} onClick={sortbyRating} />}
                                </TableCell>
                                <TableCell style={{ color: "black", fontSize: "17px" }} align="right">Review</TableCell>
                                <TableCell style={{ color: "black", fontSize: "17px" }} align="center">Image URL</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {movies != null && movies.map((item, index) => {
                                return (
                                    <>
                                        <TableRow key={index}>
                                            <TableCell align="center">
                                                <Actions itemsid={item.id} />
                                            </TableCell>
                                            <TableCell component="th" scope="row">{index + 1}</TableCell>
                                            <TableCell align="center">{item.title}</TableCell>
                                            <TableCell align="center">{item.description}</TableCell>
                                            <TableCell align="center">{item.year}</TableCell>
                                            <TableCell align="center">{item.duration}</TableCell>
                                            <TableCell align="center">{item.genre}</TableCell>
                                            <TableCell align="center">{item.rating}</TableCell>
                                            <TableCell align="center">{item.review}</TableCell>
                                            <TableCell align="center">{item.image_url}</TableCell>
                                        </TableRow>
                                    </>
                                )
                            })
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
                {/* ...............akhir table................... */}



            </div>
        </>
    );
}
export default TableMovie;