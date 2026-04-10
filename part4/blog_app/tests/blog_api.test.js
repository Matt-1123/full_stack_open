const { test, after, beforeEach, before } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'Test Blog mongo.js',
        author: 'Lorem Ipsum',
        url: 'test9393092.com',
        likes: 1
    },
    {
        title: 'Test 2 Blog mongo.js',
        author: 'Lorem Ipsum',
        url: 'test9393092.com',
        likes: 1
    }
]

beforeEach(async () => {
    await blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const title = response.body.map(e => e.title)
  assert(title.includes('Test Blog mongo.js'))  
})

after(async () => {
  await mongoose.connection.close()
})