import { INPUT_TYPE } from "@components/Form"

import Prompt from "@models/prompt"
import { connectionToDB } from "@utils/database"

// GET
export const GET = async (request, { params }) => {
	try {
		await connectionToDB()

		const prompt = await Prompt.findById(params.id).populate("creator")

		if (!prompt) {
			return Response("Prompt not found", { status: 404 })
		}

		return new Response(JSON.stringify(prompt), { status: 200 })
	} catch (error) {
		return new Response("Failed to fetch all prompts", { status: 500 })
	}
}

// PATCH
export const PATCH = async (request, { params }) => {
	const { prompt, tag } = await request.json()

	try {
		await connectionToDB()

		const existingPrompt = await Prompt.findById(params.id)

		if (!existingPrompt) {
			return Response("Prompt not found", { status: 404 })
		}

		existingPrompt.prompt = prompt
		existingPrompt.tag = tag

		await existingPrompt.save()

		return new Response(JSON.stringify(existingPrompt), {
			status: 200,
		})
	} catch (err) {
		return new Response("Failed to update prompt", { status: "500" })
	}
}

// DELETE
export const DELETE = async (request, { params }) => {
	try {
		await connectionToDB()

		await Prompt.findByIdAndDelete(params.id)

		return new Response("Prompt deleted successfully", {
			status: 200,
		})
	} catch (error) {
		return new Response("Failed to delete prompt", { status: "500" })
	}
}
