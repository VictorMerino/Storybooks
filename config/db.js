import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      // TO-DO: they seems deprecated, remove when checked it
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: true,
    })

    console.log(`MongoDB connected: ${connection.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
