import React from 'react'
import Star from './Star';



function VenueRating({rating}) {

    let ratingArray = [0,0,0,0,0]

    let stars = Math.min(Math.floor(rating), 5);

    let halfStar = 0;

    if (rating % 1 !== 0){

        halfStar = 1;
        stars --
    }

    for (let i = 0; i<stars; i++){
        ratingArray[i] =1;
    }

    for (let i = 0; i<halfStar; i++){
        ratingArray[stars + i] =2;
    }



    return (
        <div className='flex items-center'>
            <div className="flex bg-slate-200 rounded px-2 mr-1">{rating}</div>
            <div className="flex bg-slate-200 w-28">
                {ratingArray.map((starType, index) => (
                    <Star key={index} starType={starType} />
                ))}
            </div>
        </div>
    );
}



export default VenueRating;
