import React, {useEffect, useState} from "react";
import PromptCard from "../cardprompot/PromptCard";
import { useSession } from "next-auth/react";

export const PromptCardList = ({ data,handleEdit, handleDelete, }) => {
    return <div className=" flex flex-col gap-3">
        {
            data.map((element,indx) => (
                <PromptCard
                key={element._id}
                    element={element}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ))
        }
    </div>;
};

const Feed = () => {
    //state
    const [searchText, setsearchText] = useState("");

    const [posts, setPosts] = useState([]);

    const {data: session} = useSession();

    //func
    const handleSerchText = () => {};

    const handleTagClick = () => {};

    const getPosts = async () => {
        const posts = await fetch("/api/prompt/getPromotApi");

        const data = await posts.json();

        setPosts(data);
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <section className=" flex flex-col gap-10">
            <form className=" mt-10">
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSerchText}
                    className="search_input peer"
                    placeholder="Enter Text To Serch"
                />
            </form>


            {
                session?.user ?<PromptCardList data={posts} handleTagClick={handleTagClick} />
                    : (
                        null
                )
            }
        </section>
    );
};

export default Feed;
