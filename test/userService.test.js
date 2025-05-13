const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');

const userService = require('../src/services/userServices');
const User = require('../src/models/user'); 

describe('UserService - login', () => {
  afterEach(() => {
    sinon.restore(); 
  });

  it('should return a user if email exists', async () => {
    const mockUser = {
      _id: new mongoose.Types.ObjectId(),
      email: 'test@example.com',
      userId: 'USR0015',
      isDeleted: false,
    };

    
    sinon.stub(User, 'findOne').resolves(mockUser);

    const result = await userService.login('test@example.com');

    expect(result).to.deep.equal(mockUser);
    sinon.assert.calledWith(User.findOne, { email: 'test@example.com', isDeleted: false });
  });

  it('should throw an error if user is not found', async () => {
    sinon.stub(User, 'findOne').resolves(null);

    try {
      await userService.login('notfound@example.com');
    } catch (error) {
      expect(error.message).to.equal('Error during login: User not found');
    }
  });

  it('should throw an error if database throws an exception', async () => {
    sinon.stub(User, 'findOne').throws(new Error('DB failure'));

    try {
      await userService.login('test@example.com');
    } catch (error) {
      expect(error.message).to.equal('Error during login: DB failure');
    }
  });
});
