import tactic from './tacticTemplates.json';
import config from './configLocal.json';

export default {
    tactic: tactic.tactic,
    mysql: config.mysql,
    baseurl: config.baseurl,
    wcl: config.wcl,
}