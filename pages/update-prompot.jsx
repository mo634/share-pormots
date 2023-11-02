"use client"
import Form from "@/components/from/Form";
import {useSession} from "next-auth/react";
import { useSearchParams } from "next/navigation";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";

const EditPrompot = () => {
    //states
    const searchParams = useSearchParams() 
    const prompotId=searchParams.get("id")
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    //func
    useEffect(() => {
        const getOldPrompot=async () => {
            const res = await fetch(`/api/prompt/${prompotId}/ModifyuserPost`)

            const data = await res.json() 
            

            setPost({
                prompt:data.prompt,
                tag: data.tag,
            })
        }

        if (prompotId) {
            getOldPrompot() 
        }

    },[prompotId])


    const editPrompot = async (e) => {
        e.preventDefault();

        if(!prompotId){
            alert(" id of pormopt lossed ")
        }

        //send post obj to api end  point
        try {
            const res = await fetch(`/api/prompt/${prompotId}/ModifyuserPost`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if (res.ok) {
                router.push("/");
            } else if (!res.ok) {
                const errorData = await res.json();
                console.error("Error from API:", errorData);
                // Handle the error further, maybe show a message to the user
            }
        } catch (error) {
            console.log("error wiht post data ", error);
        } finally {
            setIsSubmit(false);
        }
    };

    return (
        <div className="my_container">
            <Form type="Edit" post={post} setPost={setPost} isSubmit={isSubmit} handleSubmit={editPrompot} />
        </div>
    );
};

export default EditPrompot;
