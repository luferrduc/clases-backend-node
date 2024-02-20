import { expect } from 'chai'
import sinon from 'sinon'
import * as usersService from '../../src/services/users.services.js'


describe('Users service', () => {
  it('Debería retornar un usuario por email', async () => {
    const email = 'test@test.com'
    // Mockear el llamado al método getByEmail de nuestro repository
    const stubUser = {
      first_name: 'Coder mock',
      last_name: 'House mock',
      email: 'ch@coder.com',
      password: '1ghk$5123@0123&51sDkP',
      role: 'admin'
    }
    const stub = sinon.stub(usersService.usersRepository, 'getByEmail').returns(stubUser)
    const result = await usersService.getByEmail(email)
    expect(stub.calledOnce).to.be.true
    stub.restore()
  })

  it('Debería retornar una excepción por usuario no encontrado', async () => {
    const stub = sinon.stub(usersService.usersRepository, 'getByEmail').returns(null)
    await usersService.getByEmail('test@test.com').catch((error) => {
      expect(error.message).to.be.eql('user not found')
    })
    
    stub.restore()
  })
})