const { assert } = require('chai');
const { it, describe } = require('mocha');
const { createService } = require('../../servicios/servicios.controller')


describe('Testing para crear servicios', () => {
    // Tests that a new service is created with valid data and a valid userId. 
    // it("Test para crear un servicio", async () => {
    //     const data = {
    //         nombre: "Test Service",
    //         descripcion: "This is a test service",
    //         precio: '100000'
    //     }
    //     const userId = "676479b0-d7d4-11ed-9335-9fc7efe1e922"
    //     const result = await createService(data, userId)
    //     assert.strictEqual(result.nombre, data.nombre)
    //     assert.strictEqual(result.descripcion, data.descripcion)
    //     assert.strictEqual(result.precio, data.precio)
    //     assert.strictEqual(result.userId, userId)
    // });

    // Tests that an error is thrown when creating a new service with invalid data. 
    it("Test que crea servicio con dato invalido", async () => {
        const data = {
            nombre: "Test Service",
            descripcion: 123,
            precio: "invalidPrice"
        }
        const userId = "676479b0-d7d4-11ed-9335-9fc7efe1e922"
        try {
            await createService(data, userId);
            // La promesa se resolvió correctamente, por lo que la prueba debería fallar
            assert.fail("Expected an error to be thrown");
        } catch (error) {
            // La promesa fue rechazada, la prueba pasa
            assert.ok(error instanceof Error);
        }
    })

    // Tests that an error is thrown when creating a new service with missing data. 
    it("Test crear servicios con dato faltante", async () => {
        const data = {
            nombre: "Test Service",
            precio: 10.99
        }
        const userId = "validUserId"
        try {
            await createService(data, userId);
            assert.fail("Expected an error to be thrown");
        } catch (error) {
            assert.ok(error instanceof Error);
        }
    })

        // Tests that an error is thrown when creating a new service with an invalid userId. 
        it("Test crear servicios con userId invalido", async () => {
            const data = {
                nombre: "Test Service",
                descripcion: "This is a test service",
                precio: 10.99
            }
            const userId = 123
            try {
                await createService(data, userId);
                assert.fail("Expected an error to be thrown");
            } catch (error) {
                assert.ok(error instanceof Error);
            }
        })
        


})