describe('CRUD API User Management - Data Driven Test', () => {
  let testData;

  beforeEach(() => {
    cy.fixture('user_data').then((data) => {
      testData = data;
    });
  });

  // --- POSITIVE CRUD FLOW ---
  it('POSITIF: Full CRUD Lifecycle (Create, Read, Update, Delete)', () => {
    // 1. CREATE
    cy.createUser(testData.positiveUser).then((createRes) => {
      expect(createRes.status).to.eq(201);
      expect(createRes.body).to.have.property('name', testData.positiveUser.name);
      expect(createRes.body).to.have.property('job', testData.positiveUser.job);
      expect(createRes.body).to.have.property('id');

      const userId = createRes.body.id;

      // 2. READ
      cy.getUser(2).then((getRes) => { // Menggunakan ID contoh dari Reqres (ID 2)
        expect(getRes.status).to.eq(200);
        expect(getRes.body.data).to.have.property('id', 2);
      });

      // 3. UPDATE
      cy.updateUser(userId, testData.updatedUser).then((updateRes) => {
        expect(updateRes.status).to.eq(200);
        expect(updateRes.body).to.have.property('name', testData.updatedUser.name);
        expect(updateRes.body).to.have.property('job', testData.updatedUser.job);
      });

      // 4. DELETE
      cy.deleteUser(userId).then((deleteRes) => {
        expect(deleteRes.status).to.eq(204);
      });
    });
  });

  // --- NEGATIVE TESTS (Data Driven) ---
  it('NEGATIF 1: Operasi GET ke endpoint yang tidak valid', () => {
    const negData = testData.negativeUsers[1];
    cy.request({
      method: 'GET',
      url: negData.invalidEndpoint,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(negData.expectedStatus);
    });
  });

  it('NEGATIF 2: Operasi GET ke user ID yang tidak ditemukan', () => {
    const nonExistentId = 9999;
    cy.getUser(nonExistentId).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.be.empty;
    });
  });
});