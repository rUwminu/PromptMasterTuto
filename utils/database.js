import mongoose from "mongoose"

let isConnected = false

export const connectionToDB = async () => {
	mongoose.set("strictQuery", true)

	if (isConnected) {
		console.log("MongoDB is already connected")
		return
	}

	try {
		await mongoose.connect(process.env.MONGO_URI_LOCAL, {
			dbName: "share_prompt",
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		isConnected = true

		console.log("MongoDB connected")
	} catch (err) {
		console.log(err)
	}
}
