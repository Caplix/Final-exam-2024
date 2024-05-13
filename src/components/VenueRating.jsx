import React from 'react'
import Star from './Star';



function VenueRating({rating}) {
    console.log(rating)

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

    console.log(ratingArray, "rating array")


return (
    <div className='absolute flex mt-2 ml-2'>
            <div className=" flex bg-white/[.9] rounded px-2  ">{rating}</div>

    <div className=" flex justify-between bg-white/[.9] w-28 rounded px-2 ml-1 ">

  
  {ratingArray.map((starType)=>{
    
    {console.log(starType)}
    
            return <Star starType={starType}/>
            


        })} 
                

    </div>
    </div>


  )
}


export default VenueRating;
