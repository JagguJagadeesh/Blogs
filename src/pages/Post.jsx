import React,{useState,useEffect} from 'react'
import { Container,Button } from '../components'
import { useNavigate,Link,useParams } from 'react-router-dom'
import dataservice from '../appwrite/DatabaseService'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";



function Post() {
    const [post,setpost] = useState()
    const userData = useSelector((state)=>state.auth.userData)
    const {slug} = useParams()
    const navigate = useNavigate()
    
    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(()=>{
        if(slug){
            dataservice.getPost(slug).then((post)=>{
                if(post) setpost(post);
                else navigate('/')
                }
            )
        }else{
            navigate('/')
        }
    },[slug,navigate])
    const deletePost = ()=>{
        dataservice.deletePost(post.$id).then((status)=>{
            if(status) dataservice.deleteFile(post.featuredImage);
            navigate('/')
        })
    }
  return post ? (
    <div className="py-8">
        <Container>
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                    src={dataservice.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-xl"
                />

                {isAuthor && (
                    <div className="absolute  right-6 top-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button 
                            bgColor="bg-green-500" 
                            className="mr-4 border-2 text-2xl px-6 hover:scale-105 "
                            text={<MdEdit/>}></Button>
                            
                        </Link>
                        <Button 
                        bgColor="bg-red-500" 
                        className='border-2 text-2xl px-6 hover:scale-105 '
                        onClick={deletePost}
                        text={<MdDelete/>}/>
                    </div>
                )}
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">
                {parse(post.content)}
                </div>
        </Container>
    </div>
) : null;
}

export default Post