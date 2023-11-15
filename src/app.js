const express = require('express');
const app = express();

const bcrypt = require('bcrypt');

let port = 3000;
const path = require('path');
const empCollection = require('./model/model');
const template_path = path.join(__dirname, "../templates/views");

app.set('view engine', 'hbs');
app.set('views', template_path);
require('./db/db.js');

app.get('/', (req, res) => {
    res.render('index');
});

app.use(express.urlencoded({ extended: false }));

app.post('/empdata', async(req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        // Check if passwords match before hashing
        if (password !== cpassword) {
            return res.send("Password and confirm password must be the same");
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const empData = new empCollection({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
           
            password: hashedPassword,
           
        });

        const postData = await empData.save();
        res.send(
       ` <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
       <div style="color: #3498db; background-color: #ecf0f1; padding: 10px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);">
           <p style="font-size: 18px; font-weight: bold;">Welcome ${req.body.name}!!!</p>
           <p style="font-size: 16px;">You have successfully registered.</p>
           <p style="font-size: 14px;">Thank you for joining our community!</p>
       </div>
   </div>`

    );
      
    } catch (error) {
        res.send(error);
    }
});

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
});
