// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// Custom Command untuk Create User
Cypress.Commands.add('createUser', (userData) => {
  return cy.request({
    method: 'POST',
    url: '/api/users',
    body: userData,
    failOnStatusCode: false
  });
});

// Custom Command untuk Get User
Cypress.Commands.add('getUser', (userId) => {
  return cy.request({
    method: 'GET',
    url: `/api/users/${userId}`,
    failOnStatusCode: false
  });
});

// Custom Command untuk Update User
Cypress.Commands.add('updateUser', (userId, updatedData) => {
  return cy.request({
    method: 'PUT',
    url: `/api/users/${userId}`,
    body: updatedData,
    failOnStatusCode: false
  });
});

// Custom Command untuk Delete User
Cypress.Commands.add('deleteUser', (userId) => {
  return cy.request({
    method: 'DELETE',
    url: `/api/users/${userId}`,
    failOnStatusCode: false
  });
});