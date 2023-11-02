import Form from '@/components/from/Form'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const CreatePrompot = () => {
    //states 
    const router = useRouter();
    const { data: session } = useSession();
    const [isSubmit, setIsSubmit] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag:""
    })

    //func 
    const createPrompot = async (e) => {
        e.preventDefault()
        //send post obj to api end  point 
            try {
                const res = await fetch("/api/prompt/pormpotApi",
                {
                    method: "POST",
                    body:JSON.stringify({
                        prompt: post.prompt,
                        tag: post.tag,
                        userId:session?.user.id
                    })
                }
        )
        
        if (res.ok) {
            router.push("/")
                }
                else if (!res.ok) {
                    const errorData = await res.json();
                    console.error("Error from API:", errorData);
                    // Handle the error further, maybe show a message to the user
                }
                

            } catch (error) {
                console.log("error wiht post data ", error)
        }
        
            finally {
                setIsSubmit(false)
        }

    }
    
return (
    <div className='my_container'><Form
    type="create"
        post={post}
        setPost={setPost}
        isSubmit={isSubmit}
        handleSubmit={createPrompot}
    
    /></div>
)
}

export default CreatePrompot