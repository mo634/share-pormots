"use client";
import Profile from "@/components/profile/Profile";
import {useSession} from "next-auth/react";
import { useRouter } from "next/router";
import React, {useEffect, useState} from "react";

const MyProfile = () => {
    //states

    const router = useRouter()
    
    const [posts, setPosts] = useState([]);

    const {data: session} = useSession();

    //func
    const getPosts = async () => {
        const userId = session?.user.id;
        const result = await fetch(`/api/prompt/${userId}/userPosts`);

        const data = await result.json();

        setPosts(data);
    };

    const handleEdit = (postID) => {
        router.push(`/update-prompot?id=${postID}`)
    };
    
    const handleDelete =async (postID) => {
        const isConfirmed = confirm("are you sure to delete the post")
        if (isConfirmed) {
            try {
                await fetch(`/api/prompt/${postID.toString()}/ModifyuserPost`
                ,{method:"DELETE"}
            )
            getPosts()
            } catch (error) {
                console.log(error)
            }
        }
    };



    useEffect(() => {
        if (session) {
            getPosts();
        }
    }, [session]);
    

    return (
        <div className="w-full">
            <Profile
                name={"my"}
                desc={"thsi is my profile "}
                data={posts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default MyProfile;
