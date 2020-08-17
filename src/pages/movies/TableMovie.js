import React, { useState, useEffect } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import './css/TableMovie.css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

import SearchIcon from '@material-ui/icons/Search';
import AddBoxIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';



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
    const [inputfilter, setInputfilter] = useState({
        genre: "",
        rating: "",
        year: ""
    })
    const [inputsearch, setInputsearch] = useState("")
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

    const Actions = ({ itemsid }) => {

        const handleDelete = () => {
            console.log(itemsid)
            let newMovies = movies.filter(el => el.id !== itemsid);

            axios.delete(`https://backendexample.sanbersy.com/api/movies/${itemsid}`)
                .then(res => {
                    alert('Berhasil Menghapus Data')
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
                    style={{ backgroundColor: "black", color: "gold", fontWeight: 'bolder' }}> <EditIcon />
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

    const handleChangeFilter = (event) => {
        let getfilter = event.target.name;
        switch (getfilter) {
            case "genre": setInputfilter({ ...inputfilter, genre: event.target.value })
                break;
            case "year": setInputfilter({ ...inputfilter, year: event.target.value })
                break;
            case "rating": setInputfilter({ ...inputfilter, rating: event.target.value })
                break;
            default: { break; }
        }

    }
    console.log(inputfilter)
    const handleFilter = (event) => {
        event.preventDefault();
        if (inputfilter.year !== "" && inputfilter.rating !== "" && inputfilter.genre !== "") {
            let filteredmovie = movies.filter(x => x.year == inputfilter.year && x.rating == inputfilter.rating && x.genre === inputfilter.genre)
            setMovies([...filteredmovie]);
        } else {
            alert('Mohon maaf kolom filter harus diisi semua, silahkan cek kembali !')
        }
    }

    const handleChangeSearch = (event) => {
        setInputsearch(event.target.value);
    }
    const handleSearch = (event) => {
        if (inputsearch !== "") {
            let search = movies.filter(x => x.title === inputsearch)
            setMovies([...search])
        } else {
            alert('Kolom search belum diisi')
        }
    }
    return (
        <>
            <h1 style={{ marginTop: "100px", marginLeft: "60px", fontSize: "30px", color: "gold", display: "inline-block" }}>Movies Lists</h1>

            <div id="filter">
                <form >
                    <InputLabel style={{ color: "black" }}>Filter by:</InputLabel>
                    <TextField
                        style={{ width: "100px" }}
                        type="text"
                        id="outlined-secondary"
                        label="Genre"
                        variant="outlined"
                        name="genre"
                        value={inputfilter.genre}
                        onChange={handleChangeFilter}

                    />
                    <TextField
                        style={{ width: "100px" }}
                        type="number"
                        id="outlined-secondary"
                        label="Year"
                        variant="outlined"
                        name="year"
                        value={inputfilter.year}
                        onChange={handleChangeFilter}

                    />
                    <TextField
                        style={{
                            width: "100px"
                        }}
                        type="number"
                        id="outlined-secondary"
                        label="Rating"
                        variant="outlined"
                        name="rating"
                        value={inputfilter.rating}
                        onChange={handleChangeFilter}

                    />
                    <Button variant="contained" onClick={handleFilter} style={{ color: "gold", backgroundColor: "black", marginLeft: "10px", height: "55px" }}><FilterListIcon />Filter</Button>
                    <TextField
                        style={{
                            width: "150px", float: "right"
                        }}
                        type="text"
                        id="outlined-secondary"
                        label="Search by title"
                        variant="outlined"
                        name="title"
                        value={inputsearch}
                        onChange={handleChangeSearch}

                    />
                    <Button variant="contained" onClick={handleSearch} style={{ float: "right", color: "gold", backgroundColor: "black", marginRight: "10px", height: "55px" }}><SearchIcon />Search</Button>
                    <Button
                        onClick={() => history.push("/movie/tablemovie/create")}
                        variant="contained"
                        color="primary"
                        style={{ float: "right", marginRight: "5px", height: "55px", fontSize: "15px", width: "150px", backgroundColor: "gold", color: "black", fontWeight: 'bolder' }}
                    > <AddBoxIcon />Add Movie
                 </Button>
                </form>
            </div>
            <br />

            {/* ...................................table.............................. */}
            <TableContainer style={{ border: "2px solid rgb(224, 224, 224)", backgroundColor: "white", marginTop: "10px", marginBottom: "50px", width: "90%", marginLeft: "auto", marginRight: "auto" }} id="table">
                <Table className={classes.table} aria-label="customized table">
                    <TableHead >
                        <TableRow >
                            <TableCell >Actions</TableCell>
                            <TableCell >No</TableCell>
                            <TableCell >Title</TableCell>
                            <TableCell >Description</TableCell>
                            <TableCell >Year
                                    {click.year === true && <ArrowUpwardIcon style={{ float: "left" }} onClick={sortbyYear} />}
                                {click.year === false && <ArrowDownwardIcon style={{ float: "right" }} onClick={sortbyYear} />}
                            </TableCell>
                            <TableCell >Duration
                                    {click.duration === true && <ArrowUpwardIcon style={{ float: "left" }} onClick={sortbyDuration} />}
                                {click.duration === false && <ArrowDownwardIcon style={{ float: "right" }} onClick={sortbyDuration} />}
                            </TableCell>
                            <TableCell >Genre</TableCell>
                            <TableCell >Rating
                                    {click.rating === true && <ArrowUpwardIcon style={{ float: "left" }} onClick={sortbyRating} />}
                                {click.rating === false && <ArrowDownwardIcon style={{ float: "right" }} onClick={sortbyRating} />}
                            </TableCell>
                            <TableCell >Review</TableCell>
                            <TableCell >Image URL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movies != null && movies.map((item, index) => {
                            return (
                                <>
                                    <TableRow key={index}>
                                        <TableCell align="left">
                                            <Actions itemsid={item.id} />
                                        </TableCell>
                                        <TableCell component="th" scope="row">{index + 1}</TableCell>
                                        <TableCell align="left">{item.title}</TableCell>
                                        <TableCell align="left">{item.description}</TableCell>
                                        <TableCell align="left">{item.year}</TableCell>
                                        <TableCell align="left">{item.duration}</TableCell>
                                        <TableCell align="left">{item.genre}</TableCell>
                                        <TableCell align="left">{item.rating}</TableCell>
                                        <TableCell align="left">{item.review}</TableCell>
                                        <TableCell align="left">{item.image_url}</TableCell>
                                    </TableRow>
                                </>
                            )
                        })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
            {/* ...............akhir table................... */}
        </>
    );
}
export default TableMovie;