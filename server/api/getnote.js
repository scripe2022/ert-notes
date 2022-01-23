import { Notes } from '~/server/database/model.js';

export default async(req, res) => {
    const nid = req.body.nid;

    const note = await Notes.findAll({
        where: {
            nid: nid,
        }
    });
    if (note.length == 0) {
        return {code: '404'}; // note not exist
    }
    else {
        return {
            code: '200',
            nid: note[0].dataValues.nid,
            name: note[0].dataValues.name,
            players: note[0].dataValues.players,
            content: note[0].dataValues.content,
        };
    }
}