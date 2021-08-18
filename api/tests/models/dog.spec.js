const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');
const { dogs } = require('../arrays')


describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });

    describe(' create dogs ', () => {
      beforeEach(()=> {
        Dog.bulkCreate(dogs)
      })

      describe('search dog', () => {
        
        it('length db', done => {
          Dog.findAll()
          .then(r => expect(r.length).to.be(2))    
          .catch(() => done())
        });

        it('name Dog', done => {
          Dog.findAll()
          .then(r => expect(r[0].name).to.be.true('ChupaHuevo'))
          .catch(() => done())
        });
        
        it('fake name Dog', done => {
          Dog.findAll()
          .then(r => expect(r[1].name).to.be.false('ChupaHuevo'))
          .catch(() => done())
        });
      })
    })
  });
});
