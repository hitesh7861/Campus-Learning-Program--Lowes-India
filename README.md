# Campus-Learning-Program--Lowes-India
A **User Authentication Portal** created using **Express and MongoDB** as a part of **Lowes India 2020 Campus Learning Program** by **Hitesh Kumar(NIT Srinagar) and Shweta Charde(VNIT Nagpur)**

A user authentication app created using Express and UI designed by using simple html and css having the database connectivity.

![](pics/Screenshot%20(94).png)


To start the project just open your command line.

Navigate to the folder where you just saved the project folder use command **npm install** so as to include the necessary **node modules**.

After that activate your MongoDB server, using MongoDB community edition and after that create the collection and an admin user 'hitesh'using db.createUser({user:'hitesh',pwd:'1234',roles:['readWrite','dbAdmin']}) and connect that by mongoose.connect in app.js file.

And finally run the app by navigating to the folder and using the command **node app** on your terminal. 

