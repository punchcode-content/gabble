process.env.NODE_ENV = 'test'

const assert = require('assert');
const models = require("../models");

describe("models", function () {
  beforeEach(done => {
    models.sequelize.sync({ force: true, match: /_test$/, logging: false }).then(done)
  })

  describe("Users", () => {
    it("can be created", (done) => {
      models.User.create({username: "test", password: "test"}).then(user => {
        return user.username;
      }).then(username => {
        assert.equal(username, "test");
        done();
      }).catch(done)
    })
  });

  describe("Likes", function () {
    it("can be created", (done) => {
      models.User.create({username: "test", password: "test"})
      .then(user => {
        return [user, models.Gab.create({body: "testing", userId: user.id})];
      })
      .spread((user, gab) => {
        return [user, gab, models.Like.create({userId: user.id, gabId: gab.id})];
      })
      .spread((user, gab, like) => {
        return [user, gab, like.getUser()]
      })
      .spread((user, gab, likeUser) => {
        assert.equal(likeUser.id, user.id);
        return [gab, user.getLikedGabs()];
      })
      .spread((gab, likedGabs) => {
        assert.equal(gab.id, likedGabs[0].id);
        done();
      })
      .catch(done);
  });
});
});
