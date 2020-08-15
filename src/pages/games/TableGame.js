import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './css/TableGame.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

import SearchIcon from '@material-ui/icons/Search';
import AddBoxIcon from '@material-ui/icons/Add';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import { InputLabel } from '@material-ui/core';

const TableGame = () => {
    const [game, setGame] = useState(null);
    const history = useHistory();
    const [click, setClick] = useState({
        release: false,
        singleplayer: false,
        multiplayer: false
    })
    const [input, setInput] = useState({
        genre: "",
        year: "",
        platform: ""
    })
    const [inputsearch, setInputsearch] = useState("")
    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.white,

        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }


    const useStyles = makeStyles({
        table: {
            minWidth: 700,
        },
    });
    document.title = "Table Game"

    useEffect(() => {
        if (game === null) {
            axios.get(`https://backendexample.sanbersy.com/api/games`)
                .then(res => {
                    setGame(res.data.map(el => {
                        return {
                            id: el.id,
                            name: el.name,
                            genre: el.genre,
                            singlePlayer: el.singlePlayer,
                            multiplayer: el.multiplayer,
                            platform: el.platform,
                            release: el.release,
                            image_url: el.image_url
                        }
                    }))
                })
        }
    })

    const Actions = ({ itemsid }) => {

        const handleDelete = () => {
            let filtergame = game.filter(x => x.id !== itemsid)
            console.log(filtergame);
            axios.delete(`https://backendexample.sanbersy.com/api/games/${itemsid}`)
                .then(res => {
                    console.log(res)
                    alert('Data Berhasil Dihapus');


                }).catch(rej => {
                    console.log(rej)
                    alert('gagal menghapus data')
                })
            setGame([...filtergame])

        }
        const handleEdit = () => {
            history.push(`/game/tablegame/edit/${itemsid}`)
        }
        return (
            <>
                <Button
                    variant="contained"
                    onClick={handleEdit}
                    style={{ backgroundColor: "black", color: "gold", fontWeight: 'bolder' }}> <EditIcon />
                </Button>
                <Button
                    variant="contained"
                    onClick={handleDelete}
                    style={{ backgroundColor: "gold", color: "black", fontWeight: 'bolder' }}> <DeleteForeverIcon />
                </Button>
            </>
        )
    }
    const sortbyRelease = (event) => {
        event.preventDefault();
        if (click.release === false) {
            var sortrelease = game.sort((a, z) => parseInt(a.release) - parseInt(z.release));
            setClick({ ...click, release: true })
        } else if (click.release === true) {
            var sortrelease = game.sort((a, z) => parseInt(z.release) - parseInt(a.release));
            setClick({ ...click, release: false })
        }
        setGame([...sortrelease])
    }
    const sortbySinglePlayer = (event) => {
        event.preventDefault();
        if (click.singleplayer === false) {
            var sortsingleplayer = game.sort((a, z) => parseInt(a.singlePlayer) - parseInt(z.singlePlayer));
            console.log(sortsingleplayer)
            setClick({ ...click, singleplayer: true })
        } else if (click.singleplayer === true) {
            var sortsingleplayer = game.sort((a, z) => parseInt(z.singlePlayer) - parseInt(a.singlePlayer));
            setClick({ ...click, singleplayer: false })
        }
        setGame([...sortsingleplayer])
    }
    const sortbyMultiplayer = (event) => {
        event.preventDefault();
        if (click.multiplayer === false) {
            var sortmultiplayer = game.sort((a, z) => parseInt(a.multiplayer) - parseInt(z.multiplayer));
            setClick({ ...click, multiplayer: true })
        } else if (click.multiplayer === true) {
            var sortmultiplayer = game.sort((a, z) => parseInt(z.multiplayer) - parseInt(a.multiplayer));
            setClick({ ...click, multiplayer: false })
        }
        setGame([...sortmultiplayer])
    }

    const handleFilter = (event) => {

        event.preventDefault();
        if (input.platform !== "" && input.year !== "" & input.genre !== "") {
            let filteredgame = game.filter(x => x.release === input.year && x.platform === input.platform && x.genre === input.genre)
            console.log(filteredgame);
            setGame([...filteredgame]);
        } else {
            alert('Mohon maaf kolom filter harus diisi semua')
        }
    }
    const handleChange = (event) => {
        let getName = event.target.name;
        switch (getName) {
            case "genre": setInput({ ...input, genre: event.target.value })
                break;
            case "year": setInput({ ...input, year: event.target.value })
                break;
            case "platform": setInput({ ...input, platform: event.target.value })
                break;
            default: { break; }
        }
    }
    const handleChangeSearch = (event) => {
        setInputsearch(event.target.value)
    }
    const handleSearch = event => {
        if (inputsearch !== "") {
            let search = game.filter(x => x.name === inputsearch)
            setGame([...search])
        } else {
            alert('Maaf Kolom Search kosong, Silahkan isi kolom search')
        }
    }
    return (
        <>
            <h1 style={{ marginTop: "100px", marginLeft: "60px", fontSize: "30px", display: "inline-block" }}>Table Game</h1>


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
                        onChange={handleChange}
                        value={input.genre}

                    />
                    <TextField
                        style={{ width: "100px" }}
                        type="number"
                        id="outlined-secondary"
                        label="Year"
                        variant="outlined"
                        name="year"
                        value={input.year}
                        onChange={handleChange}

                    />
                    <TextField
                        style={{
                            width: "100px"
                        }}
                        type="text"
                        id="outlined-secondary"
                        label="Platform"
                        variant="outlined"
                        name="platform"
                        value={input.platform}
                        onChange={handleChange}

                    />
                    <Button variant="contained" onClick={handleFilter} style={{ color: "gold", backgroundColor: "black", marginLeft: "10px", height: "55px" }}><FilterListIcon />Filter</Button>
                    <TextField
                        style={{
                            width: "150px", float: "right"
                        }}
                        type="text"
                        id="outlined-secondary"
                        label="Search by name"
                        variant="outlined"
                        name="name"
                        value={inputsearch}
                        onChange={handleChangeSearch}

                    />
                    <Button variant="contained" onClick={handleSearch} style={{ float: "right", color: "gold", backgroundColor: "black", marginRight: "10px", height: "55px" }}><SearchIcon />Search</Button>
                    <Button
                        href="/game/tablegame/create"
                        variant="contained"
                        color="primary"
                        style={{ float: "right", marginRight: "5px", height: "55px", fontSize: "15px", width: "150px", backgroundColor: "gold", color: "black", fontWeight: 'bolder' }}
                    > <AddBoxIcon />Add Game
                 </Button>
                </form>
            </div>

            <TableContainer component={Paper} style={{ border: "2px solid rgb(224, 224, 224)", backgroundColor: "white", marginTop: "10px", marginBottom: "50px", width: "90%", marginLeft: "auto", marginRight: "auto" }}>
                <Table className="table" aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Actions</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Genre</StyledTableCell>
                            <StyledTableCell>SinglePlayer
                                {click.singleplayer === false && <ArrowUpwardIcon onClick={sortbySinglePlayer} />}
                                {click.singleplayer === true && <ArrowDownwardIcon onClick={sortbySinglePlayer} />}
                            </StyledTableCell>
                            <StyledTableCell>Multiplayer
                                 {click.multiplayer === false && <ArrowUpwardIcon onClick={sortbyMultiplayer} />}
                                {click.multiplayer === true && <ArrowDownwardIcon onClick={sortbyMultiplayer} />}
                            </StyledTableCell>
                            <StyledTableCell>Platform</StyledTableCell>
                            <StyledTableCell>Release
                                {click.release === false && <ArrowUpwardIcon onClick={sortbyRelease} />}
                                {click.release === true && <ArrowDownwardIcon onClick={sortbyRelease} />}
                            </StyledTableCell>
                            <StyledTableCell>Image_URL</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {game !== null && game.map((item, index) => {
                            return (
                                <>
                                    <TableRow key={index}>
                                        <StyledTableCell align="left">
                                            <Actions itemsid={item.id} />
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{item.name}</StyledTableCell>
                                        <StyledTableCell align="left">{item.genre}</StyledTableCell>
                                        <StyledTableCell align="left">{item.singlePlayer}</StyledTableCell>
                                        <StyledTableCell align="left">{item.multiplayer}</StyledTableCell>
                                        <StyledTableCell align="left">{item.platform}</StyledTableCell>
                                        <StyledTableCell align="left">{item.release}</StyledTableCell>
                                        <StyledTableCell align="left">{item.image_url}</StyledTableCell>
                                    </TableRow>
                                </>
                            )
                        })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default TableGame;