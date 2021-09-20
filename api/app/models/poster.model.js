module.exports = (sequelize, Sequelize) => {
    const poster= sequelize.define("poster", {

        id: {
            type: Sequelize.INTEGER ,
            primaryKey: true,
            autoIncrement: true,


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
            
        },
        phone_number : {

            type: Sequelize.STRING,
            
        },
        category:{
            type: Sequelize.STRING,
        }
        ,
        viewed:{
            type: Sequelize.INTEGER,
        }
    });

    return poster
};
