import React, {
    useEffect
} from 'react';
import {
    useState
} from 'react';
import axios from 'axios';
import {
    useHistory,
    useParams
} from 'react-router-dom'


import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Button from '@material-ui/core/Button';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const EditGame = () => {
    const [input, setInput] = useState({
        name: "",
        genre: "",
        singleplayer: 0,
        checkedsingleplayer: false,
        checkedmultiplayer: false,
        multiplayer: 0,
        platform: "",
        release: 0,
        image_url: ""
    });
    const [singlegame, setSingleGame] = useState(null)
    const history = useHistory();
    const { id } = useParams();
    console.log({ id })

    useEffect(() => {
        if (singlegame === null) {
            axios.get(`https://backendexample.sanbersy.com/api/games/${id}`)
                .then(res => {
                    setSingleGame(res.data)
                    setInput({
                        name: res.data.name,
                        genre: res.data.genre,
                        singleplayer: res.data.singlePlayer,
                        checkedmultiplayer: (res.data.multiplayer === 1) ? true : false,
                        checkedsingleplayer: (res.data.singlePlayer === 1) ? true : false,
                        multiplayer: res.data.multiplayer,
                        platform: res.data.platform,
                        release: res.data.release,
                        image_url: res.data.image_url,
                    })
                })

        }

    }

    )

    const handleChange = (event) => {
        let getName = event.target.name;
        let getChecked = event.target.checked;
        switch (getName) {
            case "name":
                setInput({
                    ...input,
                    name: event.target.value
                })
                break;
            case "genre":
                setInput({
                    ...input,
                    genre: event.target.value
                })
                break;
            case "singleplayer":
                setInput({
                    ...input,
                    singleplayer: event.target.checked
                })
                break;
            case "multiplayer":
                break;
            case "platform":
                setInput({
                    ...input,
                    platform: event.target.value
                })
                break;
            case "release":
                setInput({
                    ...input,
                    release: event.target.value
                })
                break;
            case "image_url":
                setInput({
                    ...input,
                    image_url: event.target.value
                })
                break;
            default: {
                break;
            }
        }

    }
    const handleCheckedSinglePlayer = (event) => {
        let getChecked = event.target.checked;
        if (getChecked === true) {
            setInput({
                ...input,
                singleplayer: 1,
                checkedsingleplayer: true
            })
        } else if (getChecked === false) {
            setInput({
                ...input,
                singleplayer: 0,
                checkedsingleplayer: false
            })
        }
    }

    const handleCheckedMultiPlayer = (event) => {
        let getChecked = event.target.checked;
        if (getChecked === true) {
            setInput({
                ...input,
                multiplayer: 1,
                checkedmultiplayer: true
            })
        } else if (getChecked === false) {
            setInput({
                ...input,
                multiplayer: 0,
                checkedmultiplayer: false
            })
        }
    }
    console.log(input)

    const handleUpdate = (event) => {
        event.preventDefault();

        let name = input.name;
        let genre = input.genre;
        let singleplayer = input.singleplayer;
        let multiplayer = input.multiplayer;
        let release = parseInt(input.release);
        let platform = input.platform;
        let image_url = input.image_url;

        if (name.replace(/\s/g, '') !== "" && genre.replace(/\s/g, '') !== "" && release.toString().replace(/\s/g, '') !== "" && platform.toString().replace(/\s/g, '') !== "" && image_url.replace(/\s/g, '') !== "") {
            axios.put(`https://backendexample.sanbersy.com/api/games/${id}`, {
                name: input.name,
                genre: input.genre,
                singlePlayer: input.singleplayer,
                multiplayer: input.multiplayer,
                platform: input.platform,
                release: release,
                image_url: input.image_url
            })
                .then(res => {
                    console.log(res.data);
                    alert('Data berhasil ditambahkan..')
                    setInput({
                        name: "",
                        genre: "",
                        singleplayer: 0,
                        checkedsingleplayer: false,
                        checkedmultiplayer: false,
                        multiplayer: 0,
                        platform: "",
                        release: 0,
                        image_url: ""
                    })
                    history.push("/game/tablegame")
                })
                .catch(er => {
                    console.log(er)
                    setInput({
                        ...input,
                    })
                })

        } else {
            alert('Maaf Kolom ada yang belum diisi, Silahkan cek kembali')
        }
    }
    const handleBack = (event) => {
        event.preventDefault();
        history.push("/game/tablegame")
    }

    return (
        <>
            <div id="contentcreate">
                <h1> <span> Add Movie </span></h1 >
                <form style={{ margin: "20px", padding: "15px" }} onSubmit={handleUpdate}>
                    <div>
                        <InputLabel style={{ float: "right", marginRight: "450px", color: "black", fontSize: "16px", fontWeight: 'bolder' }}> Genre: </InputLabel>
                        <InputLabel style={{ marginLeft: "10px", color: "black", fontSize: "16px", fontWeight: 'bolder' }}> Game Title: </InputLabel>
                        <TextField style={{ width: "400px", marginTop: '10px' }}
                            type="text"
                            id="outlined-secondary"
                            label="Game Title"
                            variant="outlined"
                            name="name"
                            onChange={handleChange}
                            value={input.name} />

                        <TextField style={{ marginLeft: "100px", width: "400px", marginTop: '10px' }}
                            type="text"
                            id="outlined-secondary"
                            label="Genre"
                            variant="outlined"
                            name="genre"
                            onChange={handleChange}
                            value={input.genre}
                        />
                    </div>
                    <div style={{ marginTop: "50px" }} >
                        <InputLabel style={{
                            float: "right",
                            marginRight: "430px",
                            color: "black",
                            fontSize: "16px",
                            fontWeight: 'bolder'
                        }
                        }> Release: </InputLabel>
                        <InputLabel style={{
                            marginLeft: "10px",
                            color: "black",
                            fontSize: "16px",
                            fontWeight: 'bolder'
                        }}> Platform: </InputLabel>
                        <TextField style={{ width: "400px", marginTop: '10px' }}
                            type="text"
                            id="outlined-secondary"
                            label="Platform"
                            variant="outlined"
                            name="platform"
                            onChange={handleChange}
                            value={input.platform}
                        />

                        <TextField style={{
                            marginLeft: "100px",
                            width: "400px",
                            marginTop: '10px'
                        }}
                            type="number"
                            id="outlined-secondary"
                            variant="outlined"
                            name="release"
                            onChange={handleChange}
                            value={input.release}
                            inputProps={{ step: "1" }}
                        />
                    </div>
                    <div style={{ marginTop: "50px" }} >


                        <InputLabel style={{
                            float: "right",
                            marginRight: "430px",
                            color: "black",
                            fontSize: "16px",
                            fontWeight: 'bolder'
                        }}> Mode: </InputLabel>
                        <InputLabel style={{
                            marginLeft: "10px",
                            color: "black",
                            fontSize: "16px",
                            fontWeight: 'bolder'
                        }}> Image URL: </InputLabel>
                        <TextField style={
                            {
                                width: "400px",
                                marginTop: '10px'
                            }
                        }
                            type="text"
                            id="outlined-secondary"
                            label="image URL"
                            variant="outlined"
                            name="image_url"
                            onChange={
                                handleChange
                            }
                            value={
                                input.image_url
                            } />
                        <FormControlLabel control={
                            <Checkbox
                                checked={
                                    input.checkedsingleplayer
                                }
                                onChange={
                                    handleCheckedSinglePlayer
                                }
                                name="singleplayer"
                                color="primary"
                                style={
                                    {
                                        marginLeft: "100px",
                                        marginTop: "10px"
                                    }
                                }
                            />
                        }
                            label="SinglePlayer" /
                        >
                        <FormControlLabel control={
                            <Checkbox
                                checked={
                                    input.checkedmultiplayer
                                }
                                onChange={
                                    handleCheckedMultiPlayer
                                }
                                name="multiplayer"
                                color="primary"
                                style={
                                    {
                                        marginLeft: "100px",
                                        marginTop: "10px"
                                    }
                                }
                            />
                        }
                            label="Multiplayer" />
                    </div>
                    <div style={{ marginTop: "50px" }} >
                        <Button type="Submit"
                            variant="contained"
                            style={
                                {
                                    backgroundColor: "gold",
                                    color: "black",
                                    fontWeight: 'bolder'
                                }
                            }> Submit </Button>
                        <Button variant="contained"
                            onClick={
                                handleBack
                            }
                            color="warning"
                            style={
                                {
                                    float: "right",
                                    backgroundColor: "black",
                                    color: "gold",
                                    fontWeight: 'bolder'
                                }
                            }>Back
                                    </Button> </div >
                </form>
            </div >
        </>
    )
}
export default EditGame;