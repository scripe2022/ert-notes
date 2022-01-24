import express from 'express';
const router = express.Router();
import { wclQuery } from '~/server/warcraftlogs/query.js';
import wowClassTable from '~/assets/json/wowClassTable.json';

router.post('/wclplayers', async(req, res) => {
    const reportId = req.body.reportId;

    const queryString = `query {reportData {report(code:"${reportId}") {playerDetails(startTime: 0, endTime: 2147483647000)}}}`;

    wclQuery(queryString).then((result) => {
        const json = result.reportData.report.playerDetails.data.playerDetails;
        const data = [...(json.tanks?json.tanks:[]), ...(json.dps?json.dps:[]), ...(json.healers?json.healers:[])];
        let players = [];
        for (let i = 0; i < data.length; ++i) {
            players.push({
                name: data[i].name,
                class: wowClassTable[data[i].type],
            });
        }
        res.json({
            code: '200',
            players: players,
        });
    }).catch((error) => {
        console.log(error);
        res.json({code: '502'});
    });
});

export default router;