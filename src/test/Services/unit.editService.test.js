const { assert } = require('chai');
const { it, describe } = require('mocha');
const { editService } = require('../../servicios/servicios.controller')


describe('Testing para editar todos los servicios', () => {    
// Tests that the function updates a service with a valid id and data. 
    it("Test editar servicio", async () => {
        const id = '753a8d61-a11a-40fc-a83b-d3a2341d0fe8';
        const data = {nombre: "New Service Name"};
        const response = await editService(id, data);
        assert.equal(response[0], 1);
    });

})