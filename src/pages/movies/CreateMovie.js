import React, { useContext, useState, useEffect } from 'react';
import './css/CreateMovie.css';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import { MoviesContext } from '../../context/MoviesContext';
import axios from 'axios';

import { useHistory, Redirect, Link } from "react-router-dom";





const CreateMovie = () => {
    const [movies, setMovies] = useContext(MoviesContext);
    const [input, setInput] = useState(
        {
            title: "",
            description: "",
            year: "",
            duration: "",
            genre: "",
            rating: "",
            review: "",
            image_url: ""
        }
    )
    const history = useHistory();
    console.log(input)
    console.log(movies);

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
                        }
                        )
                    })
                })
                .catch(() => {
                    alert('Gagal Mengambil data dari server!');
                })
        }
    }, [setMovies])

    const handleChange = (event) => {
        let getName = event.target.name;

        switch (getName) {
            case "title": setInput({ ...input, title: event.target.value })

                break;
            case "description": setInput({ ...input, description: event.target.value })
                break;

            case "duration":
                setInput({ ...input, duration: event.target.value })
                break;
            case "genre": setInput({ ...input, genre: event.target.value })
                break;
            case "rating": setInput({ ...input, rating: event.target.value })
                break;
            case "review": setInput({ ...input, review: event.target.value })
                break;
            case "image_url": setInput({ ...input, image_url: event.target.value })
                break;
            case "year": setInput({ ...input, year: event.target.value })
                break;
            default: { break; }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let title = input.title;
        let year = input.year;
        let description = input.description;
        let duration = input.duration;
        let genre = input.genre;
        let rating = input.rating;
        let review = input.review;
        let image_url = input.image_url;


        console.log(movies.statusForm);
        let timestamp = new Date();
        let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp)
        console.log(date);

        if (title.replace(/\s/g, '') !== "" && description.replace(/\s/g, '') !== "" && duration.toString().replace(/\s/g, '') !== "" && genre.replace(/\s/g, '') !== "" && rating.toString().replace(/\s/g, '') !== "" && review.replace(/\s/g, '') !== "" && image_url.replace(/\s/g, '') !== "" && year.toString().replace(/\s/g, '') !== "") {
            if (movies.statusForm === "create") {
                axios.post(`https://backendexample.sanbersy.com/api/movies`, {
                    created_at: date,
                    title: input.title, description: input.description, year: input.year,
                    duration: input.duration, genre: input.genre, rating: input.rating,
                    review: input.review, image_url: input.image_url
                })
                    .then(res => {
                        setMovies({
                            statusForm: "create", selectedId: 0, lists: [...movies.lists, {
                                ...input
                            }]
                        })
                        setInput({
                            title: "",
                            description: "",
                            year: "",
                            duration: "",
                            genre: "",
                            rating: "",
                            review: "",
                            image_url: ""
                        })
                        alert('Data berhasil ditambahkan');
                    })
            }
        } else {
            alert('Kolom masih ada yang kosong, mohon cek kembali ')
        }
    }
    const handleBack = event => {
        event.preventDefault();
        history.push("/movie/tablemovie")
    }

    return (
        <div id="contentcreate">
            <h1><span>Add Movie</span></h1 >
            <form style={{ margin: "20px", padding: "15px" }} onSubmit={handleSubmit}>
                <div>
                    <InputLabel style={{ float: "right", marginRight: "400px", color: "black", fontSize: "16px", fontWeight: 'bolder' }}>Year Release:</InputLabel>
                    <InputLabel style={{ marginLeft: "10px", color: "black", fontSize: "16px", fontWeight: 'bolder' }} >Movie Title:</InputLabel>
                    <TextField
                        style={{ width: "400px", marginTop: '10px' }}
                        type="text"
                        id="outlined-secondary"
                        label="Movie Title"
                        variant="outlined"
                        name="title"
                        onChange={handleChange}
                        value={input.title}

                    />

                    <TextField
                        style={{
                            marginLeft: "100px",
                            width: "400px", marginTop: '10px'
                        }}
                        type="number"
                        id="outlined-secondary"
                        label="Year"
                        variant="outlined"
                        name="year"
                        onChange={handleChange}
                        value={input.year}
                        inputProps={{ min: "1", step: "1" }}
                    />
                </div>
                <div style={{ marginTop: "50px" }}>
                    <InputLabel style={{ float: "right", marginRight: "430px", color: "black", fontSize: "16px", fontWeight: 'bolder' }}>Duration:</InputLabel>
                    <InputLabel style={{ marginLeft: "10px", color: "black", fontSize: "16px", fontWeight: 'bolder' }} >Description:</InputLabel>
                    <TextField
                        style={{ width: "400px", marginTop: '10px' }}
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        name="description"
                        onChange={handleChange}
                        value={input.description}

                    />

                    <TextField
                        style={{ marginLeft: "100px", width: "400px", marginTop: '10px' }}
                        type="number"
                        id="outlined-secondary"
                        label="Duration"
                        variant="outlined"
                        name="duration"
                        onChange={handleChange}
                        value={input.duration}
                        inputProps={{ min: "1", step: "1" }}
                    />
                </div>
                <div style={{ marginTop: "50px" }}>
                    <InputLabel style={{ float: "right", marginRight: "400px", color: "black", fontSize: "16px", fontWeight: 'bolder' }}>Image (URL):</InputLabel>
                    <InputLabel style={{ marginLeft: "10px", color: "black", fontSize: "16px", fontWeight: 'bolder' }} >Genre:</InputLabel>
                    <TextField
                        style={{ width: "400px", marginTop: '10px' }}
                        type="text"
                        id="outlined-secondary"
                        label="Genre"
                        variant="outlined"
                        name="genre"
                        onChange={handleChange}
                        value={input.genre}
                    />

                    <TextField
                        style={{ marginLeft: "100px", width: "400px", marginTop: '10px' }}
                        type="text"
                        id="outlined-secondary"
                        label="Movie Image (URL):"
                        variant="outlined"
                        name="image_url"
                        onChange={handleChange}
                        value={input.image_url}
                    />
                </div>
                <div style={{ marginTop: "50px" }}>
                    <InputLabel style={{ float: "right", marginRight: "450px", color: "black", fontSize: "16px", fontWeight: 'bolder' }}>Review:</InputLabel>
                    <InputLabel style={{ marginLeft: "10px", color: "black", fontSize: "16px", fontWeight: 'bolder' }} >Rating:</InputLabel>
                    <TextField
                        style={{ width: "400px", marginTop: '10px' }}
                        type="number"
                        id="outlined-secondary"
                        label="Rating"
                        variant="outlined"
                        name="rating"
                        onChange={handleChange}
                        value={input.rating}
                        inputProps={{ min: "1", max: "10", step: "0.5" }}
                    />
                    <TextField
                        style={{ marginLeft: "100px", width: "400px", marginTop: '10px' }}
                        id="outlined-multiline-static"
                        label="Review"
                        multiline
                        rows={4}
                        variant="outlined"
                        name="review"
                        onChange={handleChange}
                        value={input.review}
                    />

                </div>

                <div style={{ marginTop: "50px" }}>
                    <Button type="Submit" variant="contained" color="secondary" style={{ backgroundColor: "black", color: "gold", fontWeight: 'bolder' }}>
                        Submit
                    </Button>
                    &nbsp;
                    <Button variant="contained" onClick={handleBack} color="warning" style={{ float: "right", backgroundColor: "gold", color: "black", fontWeight: 'bolder' }}>
                        Back
                        </Button>
                </div>
            </form >
        </div >
    )
}
export default CreateMovie;