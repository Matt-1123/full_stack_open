const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://matt:${password}@cluster0.qajlapv.mongodb.net/blogs?retryWrites=true&w=majority&appName=Blogs`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  },
  author: {
    type: String,
    required: true,
    minlength: 3
  },
  url: {
    type: String,
    required: true,
    minlength: 5
  },
  likes: {
    type: Number,
    required: false
  }
})

const Blog = mongoose.model('Blog', blogSchema)

// const blog = new Blog({
//   title: 'Test 2 Blog mongo.js',
//   author: 'Lorem Ipsum',
//   url: 'test9393092.com',
//   likes: 1
// })

// blog.save().then((result) => {
//   console.log('blog saved!')
//   mongoose.connection.close()
// })

Blog.find({}).then((result) => {
  result.forEach((blog) => {
    console.log(blog)
  })
  mongoose.connection.close()
})
