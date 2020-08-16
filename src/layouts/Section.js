import { UserContext } from '../context/UserContext';


import CreateMovie from '../pages/movies/CreateMovie';
import EditMovie from '../pages/movies/EditMovie';
import TableMovie from '../pages/movies/TableMovie';

import TableGame from '../pages/games/TableGame';
import CreateGame from '../pages/games/CreateGame';
import EditGame from '../pages/games/EditGame';
import ListMovie from '../pages/movies/ListMovie';
import ReviewMovie from '../pages/movies/ReviewMovie';
import ListGame from '../pages/games/ListGame';
import DetailGame from '../pages/games/DetailGame';
import Login from '../pages/login/Login';
import Register from '../pages/login/Register';
import Home from '../pages/home/Home';

import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const Section = () => {
    const [user] = useContext(UserContext);

    const PrivateRoute = ({ user, ...props }) => {
        if (user) {
            return <Route {...props} />
        } else {
            return <Redirect to="/login" />
        }
    }

    const LoginRoute = ({ user, ...props }) =>
        localStorage.getItem("login") !== null ? <Redirect to="/" /> : <Route {...props} />;

    return (
        <>
            <section>
                <Switch>
                    <Route exact path="/" user={user} component={Home} />
                    {/*.............MOVIE...........................*/}
                    <Route exact path="/movie" user={user} component={ListMovie} />
                    <Route exact path="/movie/reviewmovie/:id" user={user} component={ReviewMovie} />
                    <PrivateRoute exact path="/movie/tablemovie/create" user={user} component={CreateMovie} />
                    <PrivateRoute exact path="/movie/tablemovie/edit/:id" user={user} component={EditMovie} />
                    <PrivateRoute exact path="/movie/tablemovie" user={user} component={TableMovie} />

                    {/*.............GAME........................... */}
                    <Route exact path="/game" user={user} component={ListGame} />
                    <Route exact path="/game/detailgame/:id" user={user} component={DetailGame} />
                    <PrivateRoute exact path="/game/tablegame" user={user} component={TableGame} />
                    <PrivateRoute exact path="/game/tablegame/create" user={user} component={CreateGame} />
                    <PrivateRoute exact path="/game/tablegame/edit/:id" user={user} component={EditGame} />

                    {/*............LOGIN............................*/}
                    <LoginRoute exact path="/login" user={user} component={Login} />
                    <LoginRoute exact path="/register" user={user} component={Register} />



                </Switch>
            </section>
        </>

    )
}
export default Section;