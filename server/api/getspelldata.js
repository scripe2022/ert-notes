import spellListCN from '~/assets/json/spellInfo_cn.json'
import spellListEN from '~/assets/json/spellInfo_en.json'

export default async(req, res) => {
    const params = req.query;
    const locale = params.locale;

    return locale=='cn' ? spellListCN : spellListEN;
}