module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comments", {
      user_id: {
        type: Sequelize.STRING
      },    
      poster_id: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      }
    });
  
    return Comments;
  };