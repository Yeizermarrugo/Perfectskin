const { assert } = require('chai');
const { it, describe } = require('mocha');
const { getAllServices } = require('../../servicios/servicios.controller')

// Tests that the function successfully retrieves all services from the database. 
describe('Testing para obetener todos los servicios', () => {
    it("test_successful_retrieval", async () => {
        const result = await getAllServices();
        assert.notEqual(result.length, 0);
    });
    // Tests that the function returns data in the expected format. 
    it("Deberia retornar toda la informacion del servicio con el usuario que lo creo", async () => {
        const result = await getAllServices();
        assert.isArray(result);
        assert.property(result[0], 'id');
        assert.property(result[0], 'nombre');
        assert.property(result[0], 'descripcion');
        assert.property(result[0], 'precio');
        assert.property(result[0], 'createdAt');
        assert.property(result[0], 'updatedAt');
        assert.property(result[0], 'usuarioId');
        assert.property(result[0], 'userId');
        assert.notProperty(result[0], 'user');
        assert.property(result[0].usuario, 'id');
        assert.property(result[0].usuario, 'nombre');
        assert.property(result[0].usuario, 'email');
    });

        // Tests that the function includes user information in the retrieved services. 
        it("test incluye informacon del usuario que creo el servicio", async () => {
            const result = await getAllServices();
            assert.property(result[0], 'usuario');
        });
})