import axios from "axios"

const token = localStorage.getItem('token');


export async function getUserPost(userId){
    const {data} = await axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts?limit=20`,
        {
            headers:{
                token:token
            }
        }
    )

    return data
}