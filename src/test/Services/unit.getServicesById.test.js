const { assert } = require('chai');
const { it, describe } = require('mocha');
const { getServiceById } = require('../../servicios/servicios.controller')
const Servicios = require('../../models/servicios.models')
// Tests that the function returns the corresponding service data without certain attributes when a valid id is passed. 
describe('Testing para obetener los servicios por Id', () => {
     // Tests that the function returns the corresponding service data when a valid id is passed. 
     it("Test validar id", async () => {
          const result = await getServiceById('753a8d61-a11a-40fc-a83b-d3a2341d0fe8');
          assert.equal(result.id, '753a8d61-a11a-40fc-a83b-d3a2341d0fe8');
     });

     // Tests that the function returns null when an invalid id is passed. 
     it("Test en caso de pasar un Id invalido", async () => {
          const result = await getServiceById('982a8d61-a11a-40fc-a83b-d3a2341d0fe9');
          assert.equal(result, null);
     });

     // Tests that the function excludes certain attributes from the returned data. 
     it("Test general que excluye algunos atributos", async () => {
          const result = await getServiceById('003edda4-9dcb-4b1d-bfc8-1eb2366cbc02');
          assert.notEqual(result, "createdAt");
          assert.notEqual(result, "updatedAt");
          assert.notEqual(result, "usuarioId");
          assert.notEqual(result, "userId");
     });
     
})