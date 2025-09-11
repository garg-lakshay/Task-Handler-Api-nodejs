import express from 'express';
const router1 = express.Router();
import authMiddleware from '../middleware/authmiddleware.js';
import prisma from '../DB/db.config.js';
router1.post('/', authMiddleware, async (req, res)=>{
    try{
        const {title,description,due_date} = req.body;
        const task = await prisma.task.create({
            data:{
                title,
                description,
                due_date: due_date ? new Date(due_date) : null, 
                userId: req.user.id,
            },
        });
        res.status(200).json(task)
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Failed tocreate task"});
    }
});

router1.get('/',authMiddleware,async (req,res)=>{
    try{
        const tasks = await prisma.task.findMany({
            where:{userId : req.user.id},
            orderBy:{created_at:"desc"},
        });

        res.json(tasks);
    } catch(err) {
        res.status(500).json({error:"Failed to fetch tasks"});
    }
});






export default router1;








