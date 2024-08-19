"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

import Form, { SUBMIT_TYPE, INPUT_TYPE } from "@components/Form"

const UpdatePrompt = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const promptId = searchParams.get("id")

	const [submitting, setSubmitting] = useState(false)
	const [postDetail, setPostDetail] = useState({
		[INPUT_TYPE.PROMPT]: "",
		[INPUT_TYPE.TAG]: "",
	})

	const fetchPost = async () => {
		if (!promptId) return

		const response = await fetch(`/api/prompt/${promptId}`)
		const data = await response.json()

		setPostDetail(data)
	}

	const submitUpdatePrompt = async (e) => {
		e.preventDefault()

		if (!promptId) return

		setSubmitting(true)

		try {
			const res = await fetch(`/api/prompt/${promptId}`, {
				method: "PATCH",
				body: JSON.stringify({
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

	useEffect(() => {
		fetchPost()

		return () => null
	}, [promptId])

	return (
		<Form
			type={SUBMIT_TYPE.EDIT}
			postDetail={postDetail}
			setPostDetail={setPostDetail}
			submitting={submitting}
			setSubmitting={setSubmitting}
			handleSubmit={submitUpdatePrompt}
		/>
	)
}

export default UpdatePrompt
