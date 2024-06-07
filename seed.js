
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const MONGODB_URI = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}/${process.env.DATABASE_NAME}`

mongoose.connect(
    MONGODB_URI + '?retryWrites=true&w=majority'
    )
    .then(result => {
        app.listen(8080, () => {
            console.log("App started on port 8080")
        });   
    })
    .catch(err => console.log(err))

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', async () => {
      console.log('Connected to the database');
    
      const usersSchema = new mongoose.Schema({
        data: Object
      });
    
      const Users = mongoose.model('Users', usersSchema);
    
      // Read data from JSON file
      const data = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
    
      await Users.deleteMany({}); // Clear existing Users
    
      await Users.insertMany(data);
      console.log('Database seeded');
    
      db.close();
    });
