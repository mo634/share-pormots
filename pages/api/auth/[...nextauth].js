import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {connectToDB } from './../../../utils/database';
import { User } from '@/models/user';


const handler = NextAuth({

    //set your providers 
    providers: [
        GoogleProvider( {
            clientId: process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        }
        )
    ]
    ,

    callbacks: {
        //config the session to get the data from db in session 
        
        async session({ session }) {
            // when user try to sign in is its email

            //get the  data that the email insid db is == email in session 
            const sessionUser = await User.findOne({ email: session.user.email })
            
            session.user.id = sessionUser._id.toString()
            

            return session 
        },

        // configure signin

        //when signin the profile param will pass to singIn func to can deal with data 

        async signIn({profile}){
            try {
                // connect tot db 
                await connectToDB() 

                // if the email of singed user exist in db 
                const userExist = await User.findOne({ email: profile.email })
                
                // if user not exist 
                if (!userExist) {
                    // create new record of this user in db
                    await User.create({
                        email: profile.email,
                        username: profile.name,
                        image: profile.picture,
                    })

                }

                return true
            } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false
            }
        }
    }

})
export default handler
export { handler as GET, handler as POST }