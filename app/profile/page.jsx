"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"

const MyProfile = () => {
	const router = useRouter()
	const { data: session } = useSession()

	const [posts, setPosts] = useState([])

	const fetchUserPosts = async () => {
		if (!session || !session.user) return

		const response = await fetch(`/api/users/${session?.user.id}/posts`)
		const data = await response.json()

		setPosts(data)
	}

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`)
	}

	const handleDelete = async (post) => {
		const hasConfirmed = confirm(
			"Are you sure you want to delete this prompt?"
		)

		if (!hasConfirmed) return

		try {
			const res = await fetch(`/api/prompt/${post._id.toString()}`, {
				method: "DELETE",
			})

			if (res.ok) {
				setPosts((prev) => prev.filter((p) => p._id !== post._id))
			}
		} catch (error) {}
	}

	useEffect(() => {
		fetchUserPosts()
	}, [session])

	return (
		<Profile
			name="My"
			desc={"Welcome to your personalized profile page"}
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	)
}

export default MyProfile
