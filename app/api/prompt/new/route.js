import { connectToDB } from '@utils/database';

export const POST = async (req, res) => {
    const { userId, prompt } = await req.json()

    try{
        await connectToDB();
        const newPrompt = new prompt({
            creator: userId,
            
        })
        
    } catch(error) {

    }
}