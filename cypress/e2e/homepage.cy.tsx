/* eslint-disable */

// @ts-ignore
describe('Home page', () => {

    const itemsPerPage = 5;

    it(`shows ${itemsPerPage} products by default on first page`, () => {
        cy.visit('/')
        cy.get('.headline h4').should('have.text', 'Product list')
        cy.get('tbody tr').should('have.length', itemsPerPage)
        cy.get('.paginationPrev').should('be.disabled')
        cy.get('.paginationNext').should('not.be.disabled')
        cy.get('.paginationSummary').should('contain', 'Page 1 out of')
    })

    it('loads 2nd page based on query parameter', () => {
        const page = 2;
        cy.visit(`/?page=${page}`)
        cy.get('.headline h4').should('have.text', 'Product list')
        cy.get('tbody tr').should('have.length',  itemsPerPage)
        cy.get('.paginationPrev').should('not.be.disabled')
        cy.get('.paginationNext').should('not.be.disabled')
        cy.get('.paginationSummary').should('contain', `Page ${page} out of`)
    })

    it('loads out of range page based on query parameter', () => {
        const outOfRangePage = 99999;
        cy.visit(`/?page=${outOfRangePage}`)
        cy.get('.headline h4').should('have.text', 'Product list')
        cy.get('tbody tr').should('have.length', 0)
        cy.get('.paginationPrev').should('not.be.disabled')
        cy.get('.paginationNext').should('be.disabled')
        cy.get('.paginationSummary').should('contain', `Page ${outOfRangePage} out of`)
    })

    it('load product by query parameter', () => {
        const product = 2;
        cy.visit(`/?product=${product}`)
        cy.get('.headline h4').should('have.text', `Search results for id: ${product}`)
        cy.get('tbody tr').should('have.length', 1)
        cy.get('.pagination').should('not.exist');
    })

    it('shows error on not existing product', () => {
        const outOfRangeProduct = 99999;
        cy.visit(`/?product=${outOfRangeProduct}`)
        cy.get('.headline h4').should('have.text', `Search results for id: ${outOfRangeProduct}`)
        cy.get('tbody tr').should('have.length', 0)
        cy.get('.pagination').should('not.exist');
        cy.get('body').should('contain', `Product with id ${outOfRangeProduct} does not exist`);
    })

    it('Resets search after submit',()=>{
        const value = "1";
        const inputName = 'productId';
        cy.visit(`/`);
        cy.get(`input[name="${inputName}"]`)
            .type(value)
            .should('have.value', value);
        cy.get('button[type="submit"]')
            .click();
        cy.get('tbody tr').should('have.length', 1)
        cy.get(`input[name="${inputName}"]`)
            .should('have.value', value);
        cy.get('button[type="reset"]')
            .click();
        cy.get(`input[name="${inputName}"]`)
            .should('have.value', '')
        cy.get('tbody tr').should('have.length', itemsPerPage)
    })

})
