const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/Week8';
mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection error:"));
db.once('connected', () => console.log(`Connected to ${MONGO_URI}`));

const PersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    Gender: String,
    Salary: Number
});

const Person = mongoose.model('Person', PersonSchema, 'personCollection');

const person = new Person({ name: 'Jacky', age: 36, Gender: 'Male', Salary: 3456 });
person.save()
    .then(doc => console.log("New Document Added:", doc))
    .catch(err => console.error(err));

const people = [
        { name: 'Simon', age: 42, Gender: 'Male', Salary: 3456 },
        { name: 'Neesha', age: 23, Gender: 'Female', Salary: 1000 },
        { name: 'Mary', age: 27, Gender: 'Female', Salary: 5402 },
        { name: 'Mike', age: 40, Gender: 'Male', Salary: 4519 }
    ];
    
Person.insertMany(people)
        .then(() => console.log("Multiple Documents Inserted"))
        .catch(err => console.error(err));

Person.find().limit(5)
        .then(docs => console.log("First 5 Documents:", docs))
        .catch(err => console.error(err));

Person.find({ Gender: 'Female', age: { $gt: 25 } })
        .then(docs => console.log("Filtered Documents:", docs))
        .catch(err => console.error(err));

Person.countDocuments()
        .then(count => console.log("Total Documents Count:", count))
        .catch(err => console.error(err));

Person.deleteMany({ age: { $gte: 25 } })
        .then(result => console.log("Deleted Documents:", result))
        .catch(err => console.error(err));
    
Person.updateMany({ Gender: 'Female' }, { Salary: 5555 })
        .then(result => console.log("Updated Records:", result))
        .catch(err => console.error(err));
    
    
            