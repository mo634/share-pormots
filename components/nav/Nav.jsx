"use client";
import Link from "next/link";
import Image from "next/image";
import {signIn, signOut, useSession, getProviders} from "next-auth/react";
import {useEffect, useState} from "react";
const Nav = () => {
    //state
    const {data: session} = useSession();
    const [providers, setProviders] = useState();
    const [drowpDown, setdrowpDown] = useState(null);

    useEffect(() => {
        const setProviderFun = async () => {
            const res = await getProviders();
            setProviders(res);
        };

        setProviderFun();
    });

    return (
        <nav className="my_container flex justify-between">
            <Link href={"/"} className=" flex gap-3">
                {/* left part  */}
                <Image
                    src={"/assets/images/logo.svg"}
                    height={30}
                    width={30}
                    className=" object-contain"
                    alt="logo image"
                ></Image>
                <p className=" hidden sm:block">prompts ai</p>
            </Link>

            {/* right part  */}

            {/* view on desktop */}

            <div className="sm:flex hidden relative">
                {session?.user ? (
                    <div className=" flex items-center">
                        <Link href={"/create-prompot"} className="black_btn">
                            Create Post
                        </Link>

                        <button className="white_btn" onClick={signOut}>
                            singOut
                        </button>
                    
                        {/* dropDown */}
                    <>
                        <Image
                            src={session?.user.image}
                            height={30}
                            width={30}
                            className=" object-contain cursor-pointer"
                            alt="logo image"
                            onClick={() => setdrowpDown((prev) => !prev)}
                        ></Image>
                        {drowpDown && (
                            <div className=" dropdown">
                                <Link href={"/my-profile"} onClick={() => setdrowpDown(false)} className="dropdown_link">
                                    my profile
                                </Link>

                                <Link
                                    href={"/create-prompot"}
                                    onClick={() => setdrowpDown(false)}
                                    className="dropdown_link"
                                >
                                    create prompt
                                </Link>

                                <button
                                    onClick={() => {
                                        setdrowpDown(false);
                                        signOut();
                                    }}
                                    className="black_btn w-full mt-3"
                                >
                                    signOut
                                </button>
                            </div>
                        )}
                    </>
                </div>
                ) : (
                    <>
                        {/* render all providers to sing in */}
                        {providers &&
                            Object.values(providers).map((provider) => (
                                // for each provider render sing in btn
                                // for each singin you need to pass provider id to identify you
                                <button className="black_btn" key={provider.name} onClick={() => signIn(provider.id)}>
                                    signIn
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* view on mobile  */}

            <div className=" sm:hidden flex relative">
                {session?.user ? (
                    <>
                        {/* dropDown */}
                        <Image
                            src={session?.user.image}
                            height={30}
                            width={30}
                            className=" object-contain cursor-pointer"
                            alt="logo image"
                            onClick={() => setdrowpDown((prev) => !prev)}
                        ></Image>
                        {drowpDown && (
                            <div className=" dropdown">
                                <Link href={"/my-profile"} onClick={() => setdrowpDown(false)} className="dropdown_link">
                                    my profile
                                </Link>

                                <Link
                                    href={"/create-prompot"}
                                    onClick={() => setdrowpDown(false)}
                                    className="dropdown_link"
                                >
                                    create prompt
                                </Link>

                                <button
                                    onClick={() => {
                                        setdrowpDown(false);
                                        signOut();
                                    }}
                                    className="black_btn w-full mt-3"
                                >
                                    signOut
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {/* render all providers to sing in */}
                        {providers &&
                            Object.values(providers).map((provider) => (
                                // for each provider render sing in btn
                                // for each singin you need to pass provider id to identify you
                                <button className="black_btn" key={provider.name} onClick={() => signIn(provider.id)}>
                                    signIn
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
