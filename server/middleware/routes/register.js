import express from 'express';
import { Users } from '~/server/database/model.js';
const router = express.Router();

router.post('/register', async(req, res) => {
    const username = req.body.username;
    const passwordHash = req.body.passwordHash;

    const user = await Users.findAll({
        where: {
            username: username,
        }
    });
    if (user.length > 0) {
        res.json({code: '400'}); // user exist
    }
    else {
        const user = await Users.create({
            username: username,
            password: passwordHash,
            defaultPlayers: [],
            notes: [],
        });
        res.json({code: '200'}); // success
    }
});

export default router;