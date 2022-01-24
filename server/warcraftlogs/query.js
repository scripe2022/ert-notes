import { GraphQLClient, gql } from 'graphql-request';
import { Token } from '~/server/database/model.js';
import { getToken } from './getToken.js';

const wclQuery = async(queryString) => {
    const token = await Token.findAll({
        where: {
            id: 1,
        }
    });
    const result = token[0].dataValues;
    let accessToken = result.token;

    const currentDate = Math.ceil((new Date().valueOf()) / 1000);
    if (currentDate - result.time > (86400*30)) {
        accessToken = await getToken();
        await Token.update({
                token: accessToken,
                time: currentDate,
            }, {
                where: {
                    id: 1,
                }
            }
        );
    }

    const endpoint = 'https://www.warcraftlogs.com/api/v2/client'

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            authorization: 'Bearer ' + accessToken,
        },
    })

    const query = gql`${queryString}`;

    const data = await graphQLClient.request(query)
    return data;
}

export { wclQuery };