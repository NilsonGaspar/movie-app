import React from 'react';

const getTrailer = ({ trailer_key }) => {
    return (
        <iframe
            title="youtube-trailer"
            src={`https://www.youtube.com/embed/${trailer_key}`}
            width="860"
            height="515"
            frameBorder="0"
            allowFullScreen={true}>
        </iframe>
    );
};

export default getTrailer;