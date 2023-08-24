import React from 'react';
import { useEffect, useState } from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';
import API_URL from './api';



const App = () => {
    // useState에서는 movies랑 searchTerm이 value이고 그 values들을 바꿀 수 있는 방법이
    // setter function즉 밑에서는 setMovies랑 setSearchTerm을 쓰는 것.
    // setMovies will give us an access to setMovies setter function.
    const [movies, setMovies] = useState([]);

    // '' because our search term start with empty str
    const [searchTerm, setSearchTerm] = useState('');
    
    //API call을 통해서 movie info를 가져온다.
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        // it give us an access to movies.
        setMovies(data.Search);
    }

    // second parameter of useEffect is empty array meaning that we will make this useEffect to be run 
    // when we initially load
    // 그래서 searchMovies('Spiderman'); 얘를 적음으로써 사이트로 들어가면 제일 처음으로 나오는 movie items들을
    // Spiderman으로 설정한다는 말.
    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    return (
        <div className='app'>
            <h1>MovieLand</h1>
            <div className='search'>
                <input 
                placeholder='Search for movies' 
                value={searchTerm}
                // event.target: gives you the element that triggered the event
                // event.target.value: retrieves(탐색,검색) the value of that element(e)
                onChange={(e) => setSearchTerm(e.target.value)}/>
                <img 
                src={SearchIcon}
                alt='search'
                // When you call the setter function with a new value, it updates 
                // the state variable with that value and triggers a re-render 
                // of the component. The setter function itself does not return anything. 
                // It simply updates the state and triggers a re-render of the component.
                onClick={() => searchMovies(searchTerm)}/>
            </div>
            {
                // ?. is an example of optional chaining in JS
                // it allows us to access the properties of an object like null or undefined without an error.
                // if value before .? is null or undefined, it will return null or undefined without an error.
                // so in that case movies?.length > 0 will return always false.
                movies?.length > 0
                ? (
                    <div className='container'>
                        {/* mapping over movies (movies는 array이니까 array.map을 해준다는 말) 
                        즉 각 iteration마다 callback function으로부터 나온 각각의 movie들을
                        새로운 array에 넣어준다는 말
                        in JS, map() works by creating a new array that consists of outcomes from calling a function on the iterms in your array.*/}
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ) : (
                    // 영화를 못 찾았으면 나올 것
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    )
}

// 대충 이걸 해줘야 다른 파일에서 이 App.js를 import할 수 있게 된다.
export default App;