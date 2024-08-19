"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import Profile from "@components/Profile"

const MyProfile = ({ params }) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const userId = params.id
	const userName = searchParams.get("name")

	const [posts, setPosts] = useState([])

	const fetchUserPosts = async () => {
		if (!userId) return

		const response = await fetch(`/api/users/${userId}/posts`)
		const data = await response.json()

		setPosts(data)
	}

	useEffect(() => {
		fetchUserPosts()
	}, [userId])

	return (
		<Profile
			name={userName}
			desc={`Welcome to ${userName} personalized profile page`}
			data={posts}
		/>
	)
}

export default MyProfile
