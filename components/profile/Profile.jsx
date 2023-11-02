import React from "react";
import {PromptCardList} from "../feed/Feed";
const Profile = ({name, desc, handleEdit, handleDelete, data}) => {
    return (
        <section className="my_container ">
            <h1 className="head_text text-left blue_gradient "><span>{name} Profile</span></h1>
            <p className="desc mb-3">{desc}</p>
            
            {/* render posts info */}

            <PromptCardList
                data={data}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                />
        </section>
    );
};

export default Profile;
