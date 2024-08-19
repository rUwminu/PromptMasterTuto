"use client"

import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Form, { SUBMIT_TYPE, INPUT_TYPE } from "@components/Form"

const CreatePrompt = () => {
	const router = useRouter()
	const { data: session } = useSession()

	const [submitting, setSubmitting] = useState(false)
	const [postDetail, setPostDetail] = useState({
		[INPUT_TYPE.PROMPT]: "",
		[INPUT_TYPE.TAG]: "",
	})

	const submitCreatePrompt = async (e) => {
		e.preventDefault()

		setSubmitting(true)

		try {
			const res = await fetch("/api/prompt/new", {
				method: "POST",
				body: JSON.stringify({
					userId: session?.user.id,
					...postDetail,
				}),
			})

			if (res.ok) {
				router.push("/")
			}
		} catch (err) {
			console.log(err)
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<Form
			type={SUBMIT_TYPE.CREATE}
			postDetail={postDetail}
			setPostDetail={setPostDetail}
			submitting={submitting}
			setSubmitting={setSubmitting}
			handleSubmit={submitCreatePrompt}
		/>
	)
}

export default CreatePrompt
