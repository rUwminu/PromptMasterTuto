import { INPUT_TYPE } from "@components/Form"

import Prompt from "@models/prompt"
import { connectionToDB } from "@utils/database"

export const POST = async (req, res) => {
	const {
		userId,
		[INPUT_TYPE.PROMPT]: prompt,
		[INPUT_TYPE.TAG]: tag,
	} = await req.json()

	try {
		await connectionToDB()

		const newPrompt = new Prompt({
			creator: userId,
			prompt,
			tag,
		})

		await newPrompt.save()

		return new Response(JSON.stringify(newPrompt), {
			status: 201,
		})
	} catch (err) {
		return new Response("Failed to create new prompt", { status: "500" })
	}
}
