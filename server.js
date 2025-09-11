import express from 'express';
import dotenv from 'dotenv';
import router from './router/authrouter.js';
import router1 from './router/taskrouter.js';

dotenv.config();
const app  = express();

// app.get('/', (req, res)=>{
//     res.send('Hello World!');
// });

app.use(express.json());

app.use('/auth', router);
app.use('/tasks', router1);






const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})