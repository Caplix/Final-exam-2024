export const API_OPTIONS = {
    headers:{
        Authorization: `Bearer ${localStorage.getItem(`userToken`)}`,

        "Content-Type": `application/json`,

        "X-Noroff-API-Key": `${process.env.NOROFF_API_KEY}`,

   }
}

