import Link from "next/link";

const Form = ({type, post, setPost, handleSubmit,isSubmit}) => {
    return (
        <section className=" flex flex-col">
            <h1 className="head_text">
                <span className=" blue_gradient ">{type}</span> Post{" "}
            </h1>

            <p className=" text-gray-700 my-3">
                {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered
                platform
            </p>
            <form className="bg-gray-200 shadow-md flex flex-col p-3"
            onSubmit={handleSubmit}
            >
                <label className="label_style">
                    <span>Your AI prompt</span>
                    <textarea
                        placeholder="Enter Your Prompot"
                        className=" border border-gray-300 h-[200px] p-2 input_reset"
                        value={post.prompt}
                        onChange={(e) =>
                            setPost({
                                ...post,
                                prompt: e.target.value,
                            })
                        }
                    ></textarea>
                </label>
                <label className=" label_style">
                    <span>(#product, #webdevelopment, #idea, etc.)</span>
                    <input
                        className=" p-2 input_reset"
                        placeholder=" #Tags"
                        value={post.tag}
                        onChange={(e) =>
                            setPost({
                                ...post,
                                tag: e.target.value,
                            })
                        }
                    ></input>
                </label>
                <div className="flex justify-end mt-3 gap-x-2">
                    <Link href={"/"} className="px-4 py-2 underline  rounded">
                        cancel
                    </Link>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        disabled={isSubmit}

                    >
                        {isSubmit?`${type}ing`:type}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Form;
