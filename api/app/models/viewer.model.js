module.exports = (sequelize, Sequelize) => {
    const viewer = sequelize.define("viewer", {
      viewer_id: {
        type: Sequelize.INTEGER
      },
      post_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return viewer;
  };