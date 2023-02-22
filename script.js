const mongoose = require ('mongoose');
const User = require ('./User')

//Mongoose connection to mongodb database
mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://admin:password@myatlasclusteredu.8riisqd.mongodb.net/test", () => {
    console.log('Connected');
},
e => console.error(e)
)

//Declare function to run queries
async function run() {

    try {
        //Create query
    // const user = await User.create({ 
    //     name: "Pablo 2", 
    //     age: 40,
    //     email: 'PABLO.gianferro@conclave.io',
    //     hobbies: ['FitBoxing', 'Soccer'],
    // address: {
    //     street: 'Francia 4730',
    //     city: 'San Isidro'
    // } 
    
    // })
    
    //Create query another way
    // const user2 = new User({ name: "Pablo", age: 40 })
    // await user.save().then(() => console.log('User saved'))

    //Update
    // user.name = 'Pablo Gianferro'
    // await user.save();

//FindByID
const findUserByID = await User.findById('63f5f77cfb7484e70b0b0e62')

//Find
const findUserByName = await User.find({name:'PABLO'})

//FindOne: first match only
const findUserOne = await User.findOne({name:'Pablo'})

//Exists: true or false
const existsUser = await User.exists({name:'Pablo Gianferro'})

//Delete One
const deleteUser = await User.deleteOne ({ name: 'Pablo Gianferro'})

//Our own queries: equals
const userWhere = await User.where('name').equals('Pablo')
const userWhere2 = await User.where('age').gt('39').lt('41').where('name').equals('Lionel')
const userWhereLimit = await User.where('name').equals('Pablo').limit(2)
const userWhereSelectField = await User.where('name').equals('Pablo').select('age')

//Update 
// const userwithBestFriend = await User.where('name').equals('Pablo').limit(1).select('bestFriend')
// userwithBestFriend[0].bestFriend = '63f57707433712856380439b'
// userwithBestFriend[0].save()

//Populate: useful to make joins and show all the referenced data and not only the objectID
const userPopulateBestFriend = await User.where('age').gt('39').where('name').equals('Pablo').populate('bestFriend')

//Apply schema method
// findUserOne.sayHi()

//FindByName Statics: allows to find name case insensitive
const findUserByNameStatics = await User.findByName({name:'PABLO'})

//FindByName query level: allows to find name case insensitive
const findUserByNameQueries = await User.find().byName({name:'PABLO'})

//FindByName virtual: allows to find name case insensitive
const findUserEmailVirtual = await User.findOne().where('email').equals('pablo.gianferro@conclave.io').limit(1)
console.log(findUserEmailVirtual.namedEmail);


    //Show result in console
    console.log(findUserEmailVirtual);
    await findUserEmailVirtual.save()
    console.log(findUserEmailVirtual);


    } catch (error) {
        console.log(error.message);
        // console.log(error.errors.age);
        
    }
    
}

run();

