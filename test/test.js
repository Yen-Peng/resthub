let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
Contact = require('../contactModel');

let should = chai.should();

chai.use(chaiHttp);

describe('Contacts', () => {
    beforeEach((done) => { //Before each test we empty the database
        Contact.deleteOne({}, (err) => {
           done();
        });
    });
    describe('GET /', () => {
        it('should return homepage', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.contain('Hello World with Express and Nodemon!');
                    done();
                });
        });
    });

    describe('GET /api', () => {
        it('should return api working page', (done) => {
            chai.request(server)
                .get('/api')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    res.text.should.contain('Welcome to RESTHub crafted with love!');
                    done();
                });
        });
    });

    describe('GET /api/contacts', () => {
        it('should list all contacts', (done) => {
            chai.request(server)
                .get('/api/contacts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('data');
                    res.text.should.contain('Contacts retrieved successfully');
                    done();
                });
        });
    });

    describe('GET /api/contacts/{id}', () => {
        it('should get a single contact by the given id', (done) => {
            let contact = new Contact({
                name: 'Bob',
                email: 'bob@email.com',
                phone: '93336333',
                gender: 'Male'
            });
            contact.save((err, contact) => {
                chai.request(server)
                    .get('/api/contacts/' + contact.id)
                    .send(contact)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Contact details loading..');
                        res.body.data.should.have.property('name');
                        res.body.data.should.have.property('email');
                        res.body.data.should.have.property('phone');
                        res.body.data.should.have.property('gender');
                        res.body.data.should.have.property('_id').eql(contact.id);
                        done();
                    });
            });
        });
    });

    describe('POST /api/contacts', () => {
        it('should create a new contact', (done) => {
            let contact = new Contact({
                name: 'Mark',
                email: 'mark@gmail.com',
                phone: '64634633',
                gender: 'Male'
            });

            chai.request(server)
                .post('/api/contacts')
                .send(contact)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.should.have.property('message').eql('New contact created!');
                    res.body.data.should.have.property('name').eql('Mark');
                    res.body.data.should.have.property('email').eql('mark@gmail.com');
                    res.body.data.should.have.property('phone').eql('64634633');
                    res.body.data.should.have.property('gender').eql('Male');
                    done();
                });
        });
    });

    describe('PUT /api/contacts/{id}', () => {
        it('should update a single contact by given id', (done) => {
            let contact = new Contact({
                name: 'Jasmine',
                email: 'jasmine@yahoo.com',
                phone: '92224466',
                gender: 'Female'
            });
            contact.save((err, contact) => {
                chai.request(server)
                    .put('/api/contacts/' + contact.id)
                    .send({name: 'Jasmine', email: 'jasmine@yahoo.com', phone: '9664422', gender: "Female"})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Contact Info updated');
                        res.body.data.should.have.property('phone').eql('9664422');
                        done();
                    });
            });
        });
    });

    describe('DELETE /api/contacts/{id}', () => {
        it('should delete a single contact by given id', (done) => {
            let contact = new Contact({
                name: 'Orange',
                email: 'orange@gmail.com',
                phone: '65007000',
                gender: 'Male'
            });
            contact.save((err, contact) => {
                chai.request(server)
                    .delete('/api/contacts/' + contact.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Contact deleted');
                        done();
                    });
            });
        });
    });
});
