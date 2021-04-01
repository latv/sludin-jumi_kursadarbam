module.exports = (sequelize, Sequelize) => {
    const poster= sequelize.define("poster", {

        id: {
            type: Sequelize.INTEGER ,
            primaryKey: true,
            autoIncrement: true,


        },
        user_id: {
            type: Sequelize.STRING,
        
        },
        poster: {
            type: Sequelize.STRING
        },
        price: {

            type: Sequelize.DECIMAL(10, 2),
            defaultValue: false
        },
        image : {

            type: Sequelize.STRING,
            
        }
    });

    return poster
};
