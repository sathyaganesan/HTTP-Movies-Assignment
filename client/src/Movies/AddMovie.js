import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const initialMovieItem = {
    title: "",
    director: "",
    metascore: "",
    stars: [],
}

export const AddMovie = (props) => {

    const [addNewMovie, setNewMovie] = useState(initialMovieItem);
    const history = useHistory();

    const changeHandler =(e)=> {
        e.persist();
        let value = e.target.value;

        if (e.target.name === "metascore") {
            value = parseInt(value, 10)
        }

        if (e.target.name === 'stars') {
            value = value.split(',');
        }

        setNewMovie({ ...addNewMovie, [e.target.name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:5000/api/movies/`, addNewMovie)
        .then(res => {
            console.log(res);
            // props.setMovieList(res.data);
            history.push(`/`);
        })
        .catch((err) => console.log(err))
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="title"
                        onChange={changeHandler}
                        placeholder="title"
                        value={addNewMovie.title}
                    />
                </div>
           
                <div>
                    <input
                        type="text"
                        name="director"
                        onChange={changeHandler}
                        placeholder="director"
                        value={addNewMovie.director}
                    />
                </div>

                <div>
                    <input 
                        type="text"
                        name="metascore"
                        onChange={changeHandler}
                        placeholder="metascore"
                        value={addNewMovie.metascore}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="stars"
                        onChange={changeHandler}
                        placeholder="stars"
                        value={addNewMovie.stars}
                    />
                </div>

                <button type="submit">Submit here</button>
            </form>
        </div>
    )
}
