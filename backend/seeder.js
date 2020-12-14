import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import reviews from './data/reviews.js'
import User from './models/userModel.js'
import Review from './models/reviewModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Review.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const reviewer = createdUsers[0]._id //will need amending

    const sampleReviews = reviews.map((review) => {
      return { ...review, user: reviewer }
    })

    await Review.insertMany(sampleReviews)
    console.log(`Data Imported!`.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Review.deleteMany()
    await User.deleteMany()

    console.log(`Data Deleted!`.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
