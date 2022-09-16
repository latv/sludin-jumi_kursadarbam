module.exports = (sequelize, Sequelize) => {
    const poster = sequelize.define("adminUserID", {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,


        },

    });

    return poster
};