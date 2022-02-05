describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Callum Byrne',
      username: 'cbyrne',
      password: 'archie'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('cbyrne')
      cy.get('#password').type('archie')
      cy.get('#login').click()

      cy.contains('logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('cbyrne')
      cy.get('#password').type('wrong')
      cy.get('#login').click()

      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'cbyrne', password: 'archie' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('test')
      cy.get('#author').type('tester')
      cy.get('#url').type('test.com')
      cy.contains('create').click()

      cy.contains('test')
    })

    it('A blog can be liked', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('test')
      cy.get('#author').type('tester')
      cy.get('#url').type('test.com')
      cy.contains('create').click()

      cy.contains('view').click()
      cy.get('.likeButton').click()

      cy.contains('likes 1')
    })

    it('User who created a blog can delete it', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('test')
      cy.get('#author').type('tester')
      cy.get('#url').type('test.com')
      cy.contains('create').click()

      cy.contains('view').click()
      cy.contains('remove').click()
    })
  })

  describe('Check order of blogs', function () {
    beforeEach(function () {
      cy.login({ username: 'cbyrne', password: 'archie' })
    })

    it('Created blogs are ordered correctly', function () {
      cy.createBlog({ title: 'one', author: 'one', url: 'one', likes: 1 })
      cy.createBlog({ title: 'ten', author: 'ten', url: 'ten', likes: 10 })
      cy.createBlog({ title: 'twenty', author: 'twenty', url: 'twenty', likes: 20 })

      cy.get('.likes').then(likes => {
        expect(likes[0]).to.contain(20)
      })
    })
  })
})