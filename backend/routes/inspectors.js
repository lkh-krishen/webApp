const router=require("express").Router();
const { response } = require("express");
let Inspector=require("../models/Inspectors");

//add 
router.route("/add").post((req,res)=>{
    
    
    const name=req.body.name;
    const email=req.body.email;
    const phoneNumber=req.body.phoneNumber;
    const city=req.body.city;

    const newInspector = new Inspector({
    name,
    email,
    phoneNumber,
    city

    })
    newInspector.save().then(()=>{
        res.json("Inspector Added")
    }).catch((err)=>{
        console.log(err);
    })

})
//read   
router.route('/details').get((req, res) => {
    Inspector.find()
      .then(inspectors => res.json(inspectors))
      .catch(err => res.status(400).json('Error: ' + err));
  });
//update 
router.route("/update/:id").put(async (req, res) => {
  let inspectorId = req.params.id;
  const {name,email,phoneNumber,city} =
    req.body;

  const updateInspector = {
    name,
    email,
    phoneNumber,
    city
  };

  const update = await Inspector.findByIdAndUpdate(inspectorId, updateInspector)
    .then(() => {
      res.status(200).send({ status: "Inspector Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updating data" });
    });
});


//delete 
router.route("/delete/:id").delete(async (req, res) => {
  let inspectorid = req.params.id;
  console.log(inspectorid);
  await Inspector.findOneAndDelete({ inspectorid })
    .then(() => {
      res.status(200).send({ status: "Inspector Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error deleting Inspector", error: err.message });
    });
});


//get one Inspector details
router.route('/:id').get((req, res) => {
    Inspector.findById(req.params.id)
      .then(inspector => res.json(inspector))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  //Getting Details of one Inspector by Name

router.route("/getbyName/:name").get(async (req,res) =>{
    let inspectorName = req.params.name;
    const inspector = await Inspector.findOne({name : inspectorName}).then((data) =>{
      res.json(data);
    }).catch((err) =>{
      console.log(err.message);
    })
  })





module.exports=router;