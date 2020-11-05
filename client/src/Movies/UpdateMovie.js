import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

export const UpdateMovie = (props) => {

    console.log("Update Movie PROPS", props);

    const history = useHistory();
    const params = useParams();

    console.log(params);
    console.log(useParams());

    const [editMovie, setEditMovie] = useState({
        title: "",
        director: "",
        metascore: "",
        stars: [],
    });

    const updateMovie = (id) => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {
            setEditMovie(res.data);
            console.log("RESPONSE FROM UPDATE COMPONENT", res);
            console.log(editMovie);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        updateMovie(params.id);
    }, [params.id]);

    const changeHandler = (e) => {
        e.persist();
        if (e.target.name === "metascore") {
            e.target.value = parseInt(e.target.value, 10)
        };
        setEditMovie({...editMovie, [e.target.name]: e.target.value})
    }

    const sumbitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies`, editMovie)
            .then((res) => {
                props.setMovieList(res.data);
                history.push("/movie/${id}");
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <div className = "update_maindiv">
            <h2> Update Movie Details </h2>
            <div>
                <form onClick = {sumbitHandler}>
                    <div>
                        <label>Title: 
                            <input
                                type="text"
                                name="title"
                                value={editMovie.title}
                                onChange = {changeHandler}
                            />
                        </label>
                    </div>
                    <div>
                        <label> Director:
                            <input
                                type="text"
                                name="director"
                                value={editMovie.director}
                                onChange = {changeHandler}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Metascore:
                            <input
                                type="text"
                                name="director"
                                value={editMovie.metascore}
                                onChange = {changeHandler}
                            />
                        </label>
                    </div>
                    <div>
                        <button>
                            Submit Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}