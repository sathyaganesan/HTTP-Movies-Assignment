import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

export const UpdateMovie = (props) => {

    console.log("Update Movie PROPS", props);

    const {push} = useHistory();
    const params = useParams();

    console.log(params);
    console.log(useParams());

    const [editMovie, setEditMovie] = useState({
        title: "",
        director: "",
        metascore: "",
        stars: [],
    });

    const updateMovie = () => {
        axios
        .get(`http://localhost:5000/api/movies/${params.id}`)
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
        updateMovie();
    }, [params.id]);

    const changeHandler = (e) => {
        e.persist();
        if (e.target.name === "metascore") {
            e.target.value = parseInt(e.target.value, 10)
        };
        setEditMovie({ ...editMovie, [e.target.name]: e.target.value })
    };

    const sumbitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${params.id}`, editMovie)
            .then((res) => {
                setEditMovie(res.data);
                // setMovieList(res.data);
                push(`/`);
                console.log("PUT REQUEST", res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
        <div className = "update_maindiv">
            <h2> Update Movie Details </h2>
            <div>
                <form onSubmit = {sumbitHandler}>
                    <div>
                        <label>Title: </label>
                            <input
                                type="text"
                                name="title"
                                value={editMovie.title}
                                onChange = {changeHandler}
                            />
                    </div>
                    <div>
                        <label> Director: </label>
                            <input
                                type="text"
                                name="director"
                                value={editMovie.director}
                                onChange = {changeHandler}
                            />
                    </div>
                    <div>
                        <label>Metascore:</label>
                            <input
                                type="text"
                                name="metascore"
                                value={editMovie.metascore}
                                onChange = {changeHandler}
                            />
                    </div>
                    <div>
                        <button type = "submit">
                            Submit Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}