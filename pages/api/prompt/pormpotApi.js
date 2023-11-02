import {Prompot} from "@/models/pormots";
import {connectToDB} from "@/utils/database";

export default async (req,res) => {
  const { prompt, tag, userId } = await JSON.parse(req.body);
    try {
        await connectToDB();

        const newPrompt = new Prompot({
            creator: userId,
            prompt,
            tag,
        });

      await newPrompt.save();
      
      res.status(200).json({ success: true })
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to insert data', error: error.message });
    }

    // put comming data to db
};
