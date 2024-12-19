import React,{useState,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import dataservice from '../appwrite/DatabaseService'
import { Container,PostForm } from '../components'

function EditPost() {
    const [post,setpost] = useState(null)
    const {slug } = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        if(slug){
            dataservice.getPost(slug)
                    .then((post)=>{
                        setpost(post)
                    })
        }else{
            navigate('/')
        }
    },[slug,navigate])

  return post ? (
    <div>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost