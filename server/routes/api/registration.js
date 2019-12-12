const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

module.exports = app => {
  //Signup
  app.post("/api/account/signup", (req, res, next) => {
    const { body } = req;
    const { firstName, lastName, password } = body;
    let { email } = body;

    if (!firstName) {
      return res.send({
        success: false,
        message: "Error: First name cannot be blank."
      });
    }
    if (!lastName) {
      return res.send({
        success: false,
        message: "Error: Last name cannot be blank."
      });
    }
    if (!email) {
      return res.send({
        success: false,
        message: "Error: email cannot be blank."
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: password cannot be blank."
      });
    }

    email = email.toLowerCase();

    //Steps:
    // 1. Verify email doesn't exist
    // 2. Save

    //Verification
    User.find(
      {
        email: email
      },
      (err, previousUsers) => {
        if (err) {
          return res.send({
            success: false,
            message: "Server error"
          });
        } else if (previousUsers.length > 0) {
          return res.send({
            success: false,
            message: "Email already registered"
          });
        }

        //Save User
        const newUser = new User();

        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.links = [];
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Server error"
            });
          }
          return res.send({
            success: true,
            message: "Signed up successfully"
          });
        });
      }
    );
  });
  //SignIn
  app.post("/api/account/signin", (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;

    if (!email) {
      return res.send({
        success: false,
        message: "Error: email cannot be blank."
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: password cannot be blank."
      });
    }

    email = email.toLowerCase();

    User.find(
      {
        email: email
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Server error"
          });
        }
        if (users.length != 1) {
          return res.send({
            success: false,
            message:
              "Error: This email and password combination doesn't exist. Try again."
          });
        }

        const user = users[0];
        if (!user.validPassword(password)) {
          return res.send({
            success: false,
            error: "Server error"
          });
        }

        //Otherwise it is the correct user
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
          // console.log("doc:", doc);
          // console.log("after doc user:", user);
          if (err) {
            return res.send({
              success: false,
              error: "Server error"
            });
          }

          return res.send({
            success: true,
            message: "valid sign in",
            firstName: user.firstName,
            lastName: user.lastName,
            token: doc.userId
          });
        });
      }
    );
  });
  //Verify
  app.get("/api/account/verify", (req, res, next) => {
    //Get the token
    const { headers } = req;
    const { token } = headers;
    console.log("verify token:", token);
    //?token = test
    //Verify the token is one of a kind and its not deleted
    UserSession.find(
      {
        _id: token,
        isDeleted: false
      },
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Server error"
          });
        }
        if (sessions.length != 0) {
          return res.send({
            success: false,
            error: "Already logged in"
          });
        } else {
          return res.send({
            success: true,
            message: "Authorized user"
          });
        }
      }
    );
  });
  //Logout
  app.get("/api/account/logout", (req, res, next) => {
    //Get the token
    const { query } = req;
    const { token } = query;
    //?token = test
    //Verify the token is one of a kind and its not deleted
    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      {
        $set: { isDeleted: true }
      },
      null,
      err => {
        if (err) {
          return res.send({
            success: false,
            message: "Server error"
          });
        }

        return res.send({
          success: true,
          message: "Logged out"
        });
      }
    );
  });

  //Get User Info
  app.get("/api/account/getUser", (req, res, next) => {
    //Get the token
    const { headers } = req;
    console.log("headers:", headers);

    const { token } = headers;
    //?token = test
    User.find(
      {
        _id: token
      },
      (err, users) => {
        console.log("users:", users);
        const user = users[0];
        console.log("user:", user);
        if (err) {
          console.log(err);
          console.log(token);
        }

        return res.send({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          links: user.links
        });
      }
    );
  });
};
