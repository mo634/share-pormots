
import { Prompot } from "@/models/pormots";
import { connectToDB } from "@/utils/database";

//read from dataBase
export default async (req, res) => {
    const { id } = req.query;
    await connectToDB();
    if (req.method === "GET") {
        //id of prompot in db 
        try {
            // Connect to your database and fetch data
            const prompt = await Prompot.findById(id).populate('creator');
    
            if (!prompt) {
                return res.status(404).json({
                    messg:"Not Found "
                })
            }

            console.log("comonig  get prompot api")
    
            return res.status(200).json(prompt)
        } catch (error) {
            return res.status(500).json({error: "Failed to fetch data"});
        }
    }

    //update
    if (req.method === "PATCH") {
        try {
            //get data from body 
            
            const { prompt, tag } = req.body 

            
            // get data from db

            const exsitingData = await Prompot.findById(id)


        
            if (!exsitingData) {
                return res.status(404).json({
                    messg:"Not Found "
                })
            }
            console.log("comonig  patch prompot api",)
            
            exsitingData.prompt=prompt
            exsitingData.tag=tag
            await exsitingData.save()

            return res.status(200).json(prompt)
        } catch (error) {
            return res.status(500).json({error: `Failed to fetch data: ${error.message}`});

        }
    }

    //delete 
    if (req.method === "DELETE") {
        console.log("comonig   delet api")
        try {
            // get data from db

            await Prompot.findByIdAndDelete(id)

            return res.status(200).json(prompt)
        } catch (error) {
            return res.status(500).json({error: "Failed to fetch data"});
        }
    }




};
