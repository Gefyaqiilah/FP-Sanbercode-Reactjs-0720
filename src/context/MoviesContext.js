import React, {
    createContext,
    useState
} from 'react';

export const MoviesContext = createContext();

export const MoviesProvider = (props) => {
    const [movies, setMovies] = useState({
        lists: null,
        SelectedId: 0,
        statusForm: "create"
    })
    return (
        <MoviesContext.Provider value={[movies, setMovies]}>
            {props.children}
        </MoviesContext.Provider>
    )
}

