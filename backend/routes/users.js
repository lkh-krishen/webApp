const router = require("express").Router();
let User = require("../models/Users");

router.route("/add").post((req, res) => {
  const {
    username,
    name,
    email,
    contactNo,
    password,
  } = req.body;

  const user = new User({
    username,
    name,
    email,
    contactNo,
    password,
  });

  user
    .save()
    .then(() => {
      res.json("Account created!");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/get").get((req, res) => {
  User.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/get/:username").get((req, res) => {
  const username = req.params.username;

  User.findOne({ username })
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.route("/update/:username").put(async (req, res) => {
//   const updates = req.body;

//   let username = req.params.username;

//   console.log(updates);

//   await User.findOneAndUpdate({ username }, updates)
//     .then(() => {
//       res.json("Updated succesfully!");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const {username,name,email,contactNo} =
    req.body;

  const updateUser = {
    username,
    name,
    email,
    contactNo
   
  };

  const update = await User.findByIdAndUpdate(userId, updateUser)
    .then(() => {
      res.status(200).send({ status: "User Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updating data" });
    });
});

router.route("/delete/:username").delete(async (req, res) => {
  let username = req.params.username;

  await User.findOneAndDelete({ username })
    .then(() => {
      res.json("Unregistered successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/changepwd/:username").put(async (req, res) => {
  let username = req.params.username;

  const newpwd = req.body;

  console.log(req.body);

  await User.findOneAndUpdate({ username }, newpwd)
    .then(() => {
      res.json("Password updated!");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/check/:username").get(async (req, res) => {
  const username = req.params.username;
  await User.exists({ username })
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
