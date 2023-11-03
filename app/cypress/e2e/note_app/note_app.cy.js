beforeEach(() => {
  cy.visit('http://localhost:3000')

  cy.request('POST', 'http://localhost:4001/api/testing/reset')

  const user = {
    name: 'Oscar',
    username: 'pinkpanther',
    password: 'pepe'
  }

  cy.request('POST', 'http://localhost:4001/api/users', user)
})

describe('Note App', () => {
  it('frontpage can be opened', () => {
    cy.contains('Aplicación Notas')
  })

  it('login form can be opened', () => {
    cy.contains('Show Login').click()
  })

  it('login fails with wrong password', () => { // it.only --> for running only this test
    cy.contains('Show Login').click()
    cy.get('[placeholder="Username"]').type('pinkpanther')
    cy.get('[placeholder="Password"]').type('AAAAA')
    cy.get('#form-login-button').click()

    // cy.contains('Invalid user')

    cy.get('.error-msg')
      .should('contain', 'Invalid user')
  })

  it('user can login', () => {
    cy.contains('Show Login').click()
    cy.get('[placeholder="Username"]').type('pinkpanther')
    cy.get('[placeholder="Password"]').type('pepe')
    cy.get('#form-login-button').click()
    cy.contains('Create a New Note')
  })
})

describe('When user is logged in', () => {
  beforeEach(() => {
    cy.login({ username: 'pinkpanther', password: 'pepe' }) // --> cy.login is our custom command defined in 'cypresss/support/commands.js'
  })

  it('a new note can be created', () => {
    cy.contains('New Note').click()
    cy.get('#note_content').type('Esto es una nota de prueba')
    cy.contains('Crear Nota').click()
    cy.get('h2').contains('Esto es una nota de prueba')
  })

  describe('and a note exists', () => {
    beforeEach(() => {
      cy.addNote({ content: 'First note created by Cypress', important: false })
      cy.addNote({ content: 'A note created by Cypress', important: false })
      cy.addNote({ content: 'Last note created by Cypress', important: false })
    })

    it('can change note to important', () => {
      cy.contains('A note created by Cypress').parent().as('theNote') // --> .as(elementAlias) método para darle un alias al elemento y guardarlo. Se recupera con: cy.get('@elementAlias')

      cy.get('@theNote').contains('make important!').as('importanceToggle')

      cy.get('@importanceToggle').click()
      // cy.debug() // --> for debuggin: make an stop on devtools
      cy.get('@theNote').contains('make NOT important')
    })
  })
})
