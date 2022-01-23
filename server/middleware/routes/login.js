import express from 'express';
import { Users, Notes } from '~/server/database/model.js';
const router = express.Router();

router.post('/login', async(req, res) => {
    const username = req.body.username;
    const passwordHash = req.body.passwordHash;
    const readonly = req.body.readonly;

    const user = await Users.findAll({
        where: {
            username: username,
        }
    });
    if (user.length == 0) {
        res.json({code: '401'}); // user not exist
    }
    else {
        if ((!readonly) && (passwordHash != user[0].dataValues.password)) {
            res.json({code: '402'}); // password incorrect
        }
        else {
            const defaultPlayers = user[0].dataValues.defaultPlayers;
            const noteNid = user[0].dataValues.notes;
            let noteArray = [];
            for (let i = 0; i < noteNid.length; ++i) {
                const note = await Notes.findAll({
                    where: {
                        nid: noteNid[i],
                    }
                })
                noteArray.push(note[0]);
            }
            res.json({
                code: '200',
                readonly: readonly,
                username: username,
                defaultPlayers: defaultPlayers,
                noteArray: noteArray,
            });
        }
    }
    
});

export default router;