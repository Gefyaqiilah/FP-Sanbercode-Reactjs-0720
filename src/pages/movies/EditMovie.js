import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { MoviesContext } from '../../context/MoviesContext';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
const EditMovie = () => {
    const [movies, setMovies] = useContext(MoviesContext);
    const history = useHistory();
    const [singlemovie, setSinglemovie] = useState(null)
    const [statusform, setStatusform] = useState(null)
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

    let { id } = useParams();
    console.log(movies);

    useEffect(() => {
        if (singlemovie === null) {
            axios.get(`https://backendexample.sanbersy.com/api/movies/${id}`)
                .then(res => {
                    setSinglemovie(res.data)
                    setInput({
                        title: res.data.title,
                        description: res.data.description,
                        year: res.data.year,
                        duration: res.data.duration,
                        genre: res.data.genre,
                        rating: res.data.rating,
                        review: res.data.review,
                        image_url: res.data.image_url
                    })
                }
                )

        }

    })



    console.log(input)
    console.log(singlemovie)

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
    const handleUpdate = (event) => {
        event.preventDefault();
        let title = input.title;
        let description = input.description;
        let year = input.year;
        let duration = input.duration;
        let genre = input.genre;
        let rating = input.rating;
        let review = input.review;
        let image_url = input.image_url;


        if (title.replace(/\s/g, '') !== "" && description.replace(/\s/g, '') !== "" && duration.toString().replace(/\s/g, '') !== "" && genre.replace(/\s/g, '') !== "" && rating.toString().replace(/\s/g, '') !== "" && review.replace(/\s/g, '') !== "" && image_url.replace(/\s/g, '') !== "" && year.toString().replace(/\s/g, '') !== "") {
            axios.put(`https://backendexample.sanbersy.com/api/movies/${id}`, {
                title: input.title, description: input.description, year: input.year,
                duration: input.duration, genre: input.genre, rating: input.rating,
                review: input.review, image_url: input.image_url
            })
            history.push("/movie/tablemovie")
        }
    }
    const handleBack = event => {
        event.preventDefault();
        history.push("/movie/tablemovie")
    }

    return (
        <>
            <div id="contentcreate">
                <h1><span>Add Movie</span></h1 >
                <form style={{ margin: "20px", padding: "15px" }} onSubmit={handleUpdate}>
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
                            min={0}
                            max={10}
                            inputProps={{ inputProps: { min: 0, max: 10 } }}
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

                            inputProps={{ inputProps: { min: 0, max: 10 } }}
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
                            Edit
                    </Button>
                    &nbsp;
                    <Button variant="contained" onClick={handleBack} color="warning" style={{ float: "right", backgroundColor: "gold", color: "black", fontWeight: 'bolder' }}>
                            Back
                        </Button>
                    </div>
                </form >
            </div >
        </>
    )
}
export default EditMovie;