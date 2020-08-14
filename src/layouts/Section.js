

import CreateMovie from '../pages/movies/CreateMovie';
import EditMovie from '../pages/movies/EditMovie';
import TableMovie from '../pages/movies/TableMovie';

import React from 'react';
import { Switch, Route } from 'react-router-dom';
const Section = () => {


    return (
        <>
            <section>
                <Switch>
                    <Route exact path="/" />
                    <Route exact path="/movie" />
                    <Route exact path="/movie/reviewmovie" />
                    <Route exact path="/movie/tablemovie/create" component={CreateMovie} />
                    <Route exact path="/movie/tablemovie/edit/:id" component={EditMovie} />
                    <Route exact path="/movie/tablemovie" component={TableMovie} />
                    <Route exact path="/game" />
                    <Route exact path="/game/tablegame" />
                </Switch>
            </section>
        </>

    )
}
export default Section;