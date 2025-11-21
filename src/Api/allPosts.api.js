import axios from "axios"
const token = localStorage.getItem('token');

export async function getallPosts(){

    const {data} = await axios.get('https://linked-posts.routemisr.com/posts?limit=100',
        {
            headers:{
                token:token
            }
        }
    )

    return data
}