import { Router } from "express";
import users  from "../../data/users.json";

const usersRouter = Router();


usersRouter.get('/', (req, res) => {
    res.json(users);
})

usersRouter.get('/:id', (req, res) => {
    const id = +req.params.id;
    const user = users.find(u => u.id === id);
    res.json(user);
});

usersRouter.post(('/'), (req, res) => {
    const user = req.body;
    const newID = users.reduce((max, user) => Math.max(max, user.id), 0) + 1;
    users.push({ ...user, id: newID });
    res.json({ users });
});

usersRouter.delete('/:id', (req, res) => {
    const id = +req.params.id;
    const indexToDelete = users.findIndex(u => u.id === id);
    if (indexToDelete !== -1) {
        users.splice(indexToDelete, 1);
        res.json({ users });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

usersRouter.patch('/:id', (req, res) => {
    const id = +req.params.id;
    const userFounded = users.find(u => u.id === id);
    if (userFounded) {
        Object.assign(userFounded, req.body);
        res.json({ users });
    } else {
        res.status(404).json({ message: 'User not found' });}
});

export default usersRouter;