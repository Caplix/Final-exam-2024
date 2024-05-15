
import React,{useState, useEffect} from "react";
import axios from "axios";
import VenueRating from "../components/VenueRating";
import { useParams } from 'react-router-dom';



const SpecificVenue = () =>{
    const {venueId} = useParams();
    const [venue, setVenue] = useState(null);
    const [error, setError] = useState(null);

    useEffect(()=>{
        getVenueData()
        async function getVenueData(){
            
        await axios.get(`https://v2.api.noroff.dev/holidaze/venues/${venueId}`)
        .then(res =>{
            
            setVenue(res.data);
            console.log(res.data)
            
            
        })
        .catch(error =>{
            console.error(error)
            setError(error)
        })
    }
    },[venueId])


    return (

        <div>
            {venue ? (
                <div>
                    <div>
                    <img className="" src={venue?.media?.url} alt="" />

                    <h1>{venue.name}</h1>
                    <p>{venue.description}</p>
                    <VenueRating rating={venue.rating} />
                    
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {error && <p>Error fetching data: {error.message}</p>}
        </div>

    )

}

export default SpecificVenue;