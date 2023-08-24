import React from 'react';

const MovieCard = ({ movie }) => {
    return (
        <div className='movie'>
            <div>
                <p>{movie.Year}</p>
            </div>
            <div>
                {/* 영화 사진이 없으면 https://via.placeholder.com/400여기 사진 즉 empty image를 보여주고 아니면 그 영화
                포스터를 보여준다 */}
                <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} alt={movie.title}/>
            </div>

            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div>
        </div>
    );
}

export default MovieCard;