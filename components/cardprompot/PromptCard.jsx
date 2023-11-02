"use client";
import React, {useState} from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const PromptCard = ({element,handleEdit,handleDelete}) => {
    //state
    const [copied, setCopied] = useState("");
    const pathName =useRouter().pathname

    const {data:session} = useSession()

    //func

    const handleCopy = () => {
        setCopied(element.prompt);
        navigator.clipboard.writeText(element.prompt);
        setTimeout(() => setCopied(""), 3000);
    };

    return (
        <section
            className=" bg-gray-200 p-3 rounded-md
    shadow-md 
    "
        >
            {/*start  personal info */}

            <div className=" justify-between items-center flex gap-5 flex-col sm:flex-row">
                <div className=" flex gap-5">
                <Image alt="profile image" width={40} height={40} src={element.creator.image} />
                <div>
                    {/* user  info  */}
                    <h3 className=" text-gray-950 font-bold">{element.creator.username}</h3>
                    <p className=" text-gray-600">{element.creator.email}</p>
                </div>
                </div>

                {/* copy btn  */}
                <div className="">
                    <Image
                        onClick={handleCopy}
                        className="copy_btn"
                        width={12}
                        height={12}
                        alt="copy icon"
                        src={copied === element.prompt ? "assets/icons/tick.svg" : "assets/icons/copy.svg"}
                    />
                </div>
            {/*end  personal info */}
            </div>
            {/* statr rener prompt and tag  */}

            <div className=" flex items-center sm:items-start  flex-col gap-3 mt-3 ">
                <p>{ element.prompt}</p>
                <p className=" blue_gradient">{ element.tag}</p>
            </div>

            {/* edit and delte */}
            {
                session?.user.id === element.creator._id && pathName === "/my-profile" && (
                    <div className=" flex justify-center items-center gap-3">
                
                    <p className="p_style"
                    onClick={()=>handleEdit(element._id)}
                        >edit </p>
                        <p
                            onClick={()=>handleDelete(element._id)}
                            className="p_style">delete</p>
                    </div>
                )
            }
        </section>
    );
};

export default PromptCard;
