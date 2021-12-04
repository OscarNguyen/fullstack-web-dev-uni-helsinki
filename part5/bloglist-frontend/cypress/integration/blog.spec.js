/// <reference types="cypress" />

const user = {
  name: 'Minh Nguyen',
  username: 'minh_test',
  password: 'ahihi'
}

beforeEach(() => {
  cy.request('POST','http://localhost:3003/api/testing/reset')

  cy.request('POST','http://localhost:3003/api/users/',user)

  cy.visit('http://localhost:3000')
})

const userLogin = () => {
  cy.get('#username').type(user.username)
  cy.get('#password').type(user.password)
  cy.get('button').click()
}

describe('blog app',() => {

  it('Check that the application displays the login form by default.',() => {
    cy.get('#username')
    cy.get('#password')
    cy.contains('Login')
  })

  describe('Login',() => {

    it('succeeds with correct credentials', function() {
      userLogin()
      cy.contains('Logout').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('das')
      cy.get('#password').type('asds')
      cy.get('button').click()
      cy.get('.Notification_error__27SW1').as('errorBanner')
      cy.get('@errorBanner').should('have.css','color','rgb(255, 0, 0)')
      cy.get('@errorBanner').should('have.css','border-color','rgb(255, 0, 0)')
    })
  })

  describe('When logged in',() => {

    const createABlog=(title,author,url) => {
      cy.contains('Create new blog').click().then(() => {
        console.log('open')
        cy.get('#title').type(title)
        cy.get('#author').type(author)
        cy.get('#url').type(url)
        cy.get('.submitBtn').click()
      })
    }

    const viewABlog = (title,author,url) => {
      createABlog(title,author,url)
      cy.contains('View').click()
    }

    beforeEach(() => {
      userLogin()

      cy.request('POST','http://localhost:3003/api/users/login',{
        username:user.username,
        password:user.password
      }).then(res => {
        localStorage.setItem('token',res.body.token)
        cy.visit('http://localhost:3000')
      })
    })


    it('A blog can be created', function() {
      createABlog('title1','Minh','m.com')
      cy.contains('title1')
    })

    it('Users can like a blog',() => {
      viewABlog('title 2','Minh','m.com')
      cy.contains('Like').click()
      cy.get('span').contains('1')
    })

    it('Check the user who created a blog can delete it',() => {
      viewABlog('title 3','Minh','m.com')
      cy.contains('Remove').click()
      cy.get('.Notification_success__TNer8').as('successBanner')
      cy.get('@successBanner').should('have.css','border-color','rgb(0, 128, 0)')
    })

    // it.only('Check the user who are not authorized cannot delete the blog',() => {
    //   viewABlog()
    //   cy.request('POST','http://localhost:3003/api/users/',{
    //     name: 'Nguyen',
    //     username: 'nguyen_test',
    //     password: 'ahihi'
    //   })

    //   cy.request('POST','http://localhost:3003/api/users/login',{
    //     username: 'nguyen_test',
    //     password: 'ahihi'
    //   }).then(res => {
    //     localStorage.setItem('token',res.body.token)
    //   })

    //   cy.contains('Remove').click()
    // //   cy.get('.Notification_success__TNer8').as('successBanner')
    // //   cy.get('@successBanner').should('have.css','border-color','rgb(0, 128, 0)')
    // })

    it('checks that the blogs are ordered according to likes with the blog with the most likes being first.',() => {
      viewABlog('title 1','cc','dsdas.com')
      viewABlog('title 2','cc','dsdas.com')

      cy.visit('http://localhost:3000')

      cy.get('.Blog_blog__31wur').eq(0).find('button').click()

      for(let i = 0;i<5;i++){
        cy.get('.Blog_blog__31wur').eq(0).find('.likeBtn').click()
      }

      cy.get('.Blog_blog__31wur').eq(1).find('button').click()

      for(let i = 0;i<8;i++){
        cy.get('.Blog_blog__31wur').eq(1).find('.likeBtn').click()
      }

      cy.visit('http://localhost:3000')

      cy.get('.Blog_blog__31wur').eq(0).find('button').click()

      cy.get('.Blog_blog__31wur').eq(1).find('button').click()

      cy.get('.Blog_blog__31wur').then(items => {
        const likesOfTheFirstOne = Number(items[0].children[2].children[0].children[1].innerHTML)
        const likesOfTheSecondOne = Number(items[1].children[2].children[0].children[1].innerHTML)
        expect(likesOfTheFirstOne).to.be.greaterThan(likesOfTheSecondOne)
      })
    })
  })

})


