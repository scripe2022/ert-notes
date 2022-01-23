import express from 'express';
import { Users, Notes } from '~/server/database/model.js';
const router = express.Router();

router.post('/save', async(req, res) => {
    const username = req.body.username;
    const defaultPlayers = req.body.defaultPlayers;
    const noteArray = req.body.noteArray;
    let noteNid = [];
    for (let i = 0; i < noteArray.length; ++i) {
        noteNid.push(noteArray[i].nid);
    }
    await Users.update({
            defaultPlayers: defaultPlayers,
            notes: noteNid,
        }, {
            where: {
                username: username
            }
        }
    );
    for (let i = 0; i < noteArray.length; ++i) {
        const note = await Notes.findAll({
            where: {
                nid: noteArray[i].nid,
            }
        });
        if (note.length == 0) { // insert
            await Notes.create({
                nid: noteArray[i].nid,
                name: noteArray[i].name,
                content: noteArray[i].content,
                players: noteArray[i].players,
            })
        }
        else { // update
            await Notes.update({
                    name: noteArray[i].name,
                    content: noteArray[i].content,
                    players: noteArray[i].players,
                }, {
                    where: {
                        nid: noteArray[i].nid,
                    }
                }
            )
        }
    }
    res.json({code: '200'});
});

export default router;