import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

const TableGame = () => {
    const [game, setGame] = useState(null);
    const history = useHistory();
    const [click, setClick] = useState({
        release: false,
        singleplayer: false,
        multiplayer: false
    })
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
            var sortsingleplayer = game.sort((a, z) => parseInt(a.singleplayer) - parseInt(z.singleplayer));
            setClick({ ...click, singleplayer: true })
        } else if (click.singleplayer === true) {
            var sortsingleplayer = game.sort((a, z) => parseInt(z.singleplayer) - parseInt(a.singleplayer));
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

    return (
        <>
            <h1 style={{ marginTop: "100px", marginLeft: "60px", fontSize: "30px", display: "inline-block" }}>Table Game</h1>
            <Button
                href="/game/tablegame/create"
                variant="contained"
                color="primary"
                style={{ marginTop: "0", marginLeft: "80%", fontSize: "15px", width: "150px", backgroundColor: "gold", color: "black", fontWeight: 'bolder' }}
            > Add Game
                 </Button>
            <TableContainer component={Paper} style={{ backgroundColor: "white", marginTop: "20px", marginBottom: "50px", width: "90%", marginLeft: "auto", marginRight: "auto" }}>
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