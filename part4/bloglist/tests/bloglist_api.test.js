const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    // has to be done this way and not new User then user.save() because passwordHash needs to be created through post route
    await api
        .post('/api/users')
        .send(helper.initialUser)

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('login return a token', async () => {
    await api
        .post('/api/login')
        .send(helper.initialUser)
        .expect(200)
})

test('returns correct amount of blog post', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    }

    const user = await api
        .post('/api/login')
        .send(helper.initialUser)

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${user.body.token}`)
        .expect(200)
        .expect('Content-type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).toContain('Canonical string reduction')
})

test('if likes property is missing it will default to the value 0', async () => {
    const newBlog = {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        __v: 0
    }

    const user = await api
        .post('/api/login')
        .send(helper.initialUser)

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${user.body.token}`)
        .expect(200)
        .expect('Content-type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const requiredBlog = blogsAtEnd.find(b => b.title === 'First class tests')

    expect(requiredBlog.likes).toEqual(0)
})

test('if title and url properties missing, respond with 400 Bad Request', async () => {
    const newBlog = {
        _id: "5a422ba71b54a676234d17fb",
        author: "Robert C. Martin",
        likes: 0,
        __v: 0
    }

    const user = await api
        .post('/api/login')
        .send(helper.initialUser)

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${user.body.token}`)
        .expect(400)
        .expect('Content-type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('viewing a blog with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
})

test('deleting a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    }

    const user = await api
        .post('/api/login')
        .send(helper.initialUser)

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${user.body.token}`)
        .expect(200)

    const allBlogs = await helper.blogsInDb()
    expect(allBlogs).toHaveLength(blogsAtStart.length + 1)

    const blogToDelete = allBlogs.find(blog => blog.title === newBlog.title)

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${user.body.token}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
})

afterAll(() => {
    mongoose.connection.close()
})