import React from "react"
import Link from "next/link"

export const SUBMIT_TYPE = {
	CREATE: "Create",
	EDIT: "Edit",
	DELETE: "Delete",
}

export const INPUT_TYPE = {
	PROMPT: "prompt",
	TAG: "tag",
}

const Form = ({
	type = "",
	postDetail = {
		[INPUT_TYPE.PROMPT]: "",
		[INPUT_TYPE.TAG]: "",
	},
	setPostDetail = () => null,
	submitting = false,
	setSubmitting = () => null,
	handleSubmit = () => null,
}) => {
	return (
		<section className="w-full max-w-full flex-start flex-col">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{type} Post</span>
			</h1>
			<p className="desc text-left max-w-md">
				{type} and share amazing prompts with the world, and let your
				imagination run wild with any AI-powered platform
			</p>

			<form
				onSubmit={handleSubmit}
				className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
			>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Your AI Prompt
					</span>

					<textarea
						value={
							postDetail && postDetail[INPUT_TYPE.PROMPT]
								? postDetail[INPUT_TYPE.PROMPT]
								: ""
						}
						onChange={(e) =>
							setPostDetail((prev) => ({
								...prev,
								[INPUT_TYPE.PROMPT]: e.target.value,
							}))
						}
						placeholder="Write your post here"
						required
						className="form_textarea resize-none"
					/>
				</label>

				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Field of Prompt{" "}
						<span className="font-normal">
							(#product, #webdevelopment, #idea, etc.)
						</span>
					</span>
					<input
						value={
							postDetail && postDetail[INPUT_TYPE.TAG]
								? postDetail[INPUT_TYPE.TAG]
								: ""
						}
						onChange={(e) =>
							setPostDetail((prev) => ({
								...prev,
								[INPUT_TYPE.TAG]: e.target.value,
							}))
						}
						type="text"
						placeholder="#Tag"
						required
						className="form_input"
					/>
				</label>

				<div className="flex-end mx-3 mb-5 gap-4">
					<Link href="/" className="text-gray-500 text-sm">
						Cancel
					</Link>

					<button
						type="submit"
						disabled={submitting}
						className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
					>
						{submitting ? `${type}ing...` : type}
					</button>
				</div>
			</form>
		</section>
	)
}

export default Form
