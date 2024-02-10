import { expect } from "chai";
import supertest from "supertest";

const requester = supertest('http://localhost:8080')

describe('Pruebas de integración módulo de mascotas', () => {
  it('POST de /api/pets debe crear una mascota correctamente', async () => {
    const petMock = {
      name: "Luna",
      specie: "Perro",
      birthDate: "12-30-2018"
    }
    const { statusCode, _body } = await requester.post('/api/pets').send(petMock)
    expect(statusCode).equal(200)
    expect(_body.payload).to.have.property('_id')
  })  

  it('POST de /api/pets se debe corroborar que la mascota creada cuente con la propiedad adopted en false ', async () => {
    const petMock = {
      name: "Luna",
      specie: "Perro",
      birthDate: "12-30-2018"
    }
    const { statusCode, _body } = await requester.post('/api/pets').send(petMock)
    expect(statusCode).equal(200)
    expect(_body.payload).to.have.property('adopted')
    expect(_body.payload.adopted).to.be.equal(false)
  }) 

  it('POST de /api/pets se debe corroborar que si se desea crear una mascota sin el campo name el modulo debe responder con un status 400 ', async () => {
    const petMock = {
      specie: "Perro",
      birthDate: "10-28-2018"
    }
    const { statusCode } = await requester.post('/api/pets').send(petMock)
    expect(statusCode).to.be.equal(400)
  }) 

  it('GET de /api/pets se debe corroborar que la respuesta debe tener los campos status y payload y payload debe ser un arreglo', async () => {

    const { statusCode, _body } = await requester.get('/api/pets')
    expect(statusCode).to.be.equal(200)
    expect(_body).to.have.property('status')
    expect(_body).to.have.property('payload')
    expect(Array.isArray(_body.payload)).to.true
  }) 

  it('PUT de /api/pets se debe corroborar que se haga la actualización correcta a una mascota', async () => {
    const petMock = {
      name: "Benito",
      specie: "Perro",
      birthDate: "12-30-2018"
    }
    // Crear mascota
    const { _body} = await requester.post('/api/pets').send(petMock)
    const id = _body.payload._id

    // Actualizar la mascota
    const petMockUpdated = {
      name: "Katy",
      specie: "Gato",
      birthDate: "01-01-2018"
    }

    const updatedResult = await requester.put(`/api/pets/${id}`).send(petMockUpdated)

    expect(updatedResult.statusCode).to.be.equal(200)
    expect(updatedResult._body.message).to.be.equal("pet updated")
  }) 

  it('DELETE de /api/pets se debe corroborar que se elimine la última mascota agregada correctamente', async () => {
    const petMock = {
      name: "Ayuudante de santa",
      specie: "Perro",
      birthDate: "12-24-2020"
    }
    // Crear mascota
    const { _body} = await requester.post('/api/pets').send(petMock)
    const id = _body.payload._id

    // Eliminar la mascota
    const deleteResult = await requester.delete(`/api/pets/${id}`)

    expect(deleteResult.statusCode).to.be.equal(200)

    const getResult = await requester.get('/api/pets')
    const pets = getResult._body.payload

    expect(pets.find( pet => pet._id === id )).to.be.undefined
  }) 

  it('POST de /api/pets/withimage se debe crear una mascota con imagen correctamente', async () => {
    const petMock = {
      name: "Snowflake",
      specie: "Perro",
      birthDate: "05-18-2021"
    }

    const result = await requester.post("/api/pets/withimage")
    .field('name', petMock.name)
    .field('specie', petMock.specie)
    .field('birthDate', petMock.birthDate)
    .attach('image', './test/integrations/Pets/dog1.jpeg')

    expect(result.statusCode).to.be.equal(200)

  }) 
})
