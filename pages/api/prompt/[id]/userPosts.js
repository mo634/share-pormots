// You might use a database utility and model like this:
import { Prompot } from "@/models/pormots";
import { connectToDB } from "@/utils/database";

export default async (req, res) => {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    const { id } = req.query;


    try {
        // Connect to your database and fetch data
        await connectToDB();
        const prompts = await Prompot.find({
            creator:id
        }).populate('creator');

        console.log("comonig from api",prompts)

        return res.status(200).json(prompts)
    } catch (error) {
        return res.status(500).json({error: "Failed to fetch data"});
    }
};
