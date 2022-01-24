import seq from 'sequelize';
import globalConfig from '~/config/config.js'
const { Sequelize } = seq;
const config = globalConfig.mysql;

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
});

const Users = sequelize.define("users", {
    username: {
        type: Sequelize.STRING(100),
        primaryKey: true
    },
    password: Sequelize.STRING(100),
    defaultPlayers: Sequelize.JSON,
    notes: Sequelize.JSON,
}, {
    tableName: 'users',
    timestamps: false,
});

const Notes = sequelize.define("notes", {
    nid: {
        type: Sequelize.STRING(100),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    content: Sequelize.JSON,
    players: Sequelize.JSON,
}, {
    tableName: 'notes',
    timestamps: false,
});

const Token = sequelize.define("token", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    token: Sequelize.STRING(1000),
    time: Sequelize.INTEGER,
}, {
    tableName: 'token',
    timestamps: false,
})

export { Users, Notes, Token };