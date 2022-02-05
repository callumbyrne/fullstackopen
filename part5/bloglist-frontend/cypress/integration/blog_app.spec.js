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
  })
})