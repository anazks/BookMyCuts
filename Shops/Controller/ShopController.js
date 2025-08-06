const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const secretkey = process.env.secretkey;
const {addShop,viewAllShops,addServices,viewAllServices,addBarbers,viewAllBarbers,getAShop,getMyService,getMyBarbers} = require('../Repo/ShopRepo')
const AddShop = asyncHandler(async (req,res)=>{
    const data = req.body;
    let shopId;
    let token = req.headers['authorization']?.split(' ')[1]; // Get token from the Authorization header
     jwt.verify(token, secretkey, (err, decoded) => {
            if (err) {
                return res.status(401).send('Invalid token'); // Token is invalid
            }
            console.log(decoded)
            shopId = decoded.id;
    })
    console.log(data,"data")
    data.shopId=shopId
    let Obj = {
        ShopName: data.name,
        City: data.address,
        Timing: data.timing,
        website: data.website,
        shopId: data.shopId
    }
     let shopAdded = await  addShop(Obj)
     console.log(shopAdded,"shopAdded")
     if(shopAdded){
            res.json({
                success:true,
                message:"Shop added successfully",
                data:shopAdded
            })
     }else{
        res.json({
            success:false,
            message:"Shop not added",
     })}
})
const ViewAllShop = asyncHandler(async (req,res)=>{
    let allShops = await  viewAllShops()
    if(allShops){
        res.json({
            success:true,
            message:"All Shops",
            data:allShops
        })
    }else{
        res.json({
            success:false,
            message:"No Shop Found",
        })
    }
})
const addService = asyncHandler(async (req,res)=>{
    const data = req.body.serviceDatas;
    console.log(data,"data")
    let shopId ;
    let token = req.headers['authorization']?.split(' ')[1]; // Get token from the Authorization header
     jwt.verify(token, secretkey, (err, decoded) => {
            if (err) {
                return res.status(401).send('Invalid token'); // Token is invalid
            }
            console.log(decoded)
            shopId = decoded.id;
    })
    data.shopId = shopId 
    console.log(token,"token fromadd service")
    let addServicess = await  addServices(data)
    console.log(addServicess,"shopAdded")
    if(addServicess){
        res.json({
            success:true,
            message:"Services added successfully",
            data:addServicess
        })
    }else{
        res.json({
            success:false,
            message:"Services not added",
        })}
})
const ViewAllServices = asyncHandler(async (req,res)=>{
    let allService = await  viewAllServices()
    if(allService){
        res.json({
            success:true,
            message:"All Services",
            data:allService
        })
    }else{
        res.json({
            success:false,
            message:"No Services Found",
        })
    }
})
const addBarber = asyncHandler(async (req,res)=>{
    const data = req.body.newBarbers;
    console.log(data,"data")
    let token = req.headers['authorization']?.split(' ')[1]; // Get token from the Authorization header
     jwt.verify(token, secretkey, (err, decoded) => {
            if (err) {
                return res.status(401).send('Invalid token'); // Token is invalid
            }
            console.log(decoded)
            shopId = decoded.id;
    })
    data.shopId = shopId //BarBarName
    let addBarber = await  addBarbers(data)
    console.log(addBarber,"addBarber")
    if(addBarber){
        res.json({
            success:true,
            message:"Barber added successfully",
            data:addBarber
        })
    }else{
        res.json({
            success:false,
            message:"Barber not added",
        })}
})
const ViewAllBarbers = asyncHandler(async (req,res)=>{
    let allBarber = await  viewAllBarbers()
    if(allBarber){
        res.json({
            success:true,
            message:"All Barbers",
            data:allBarber
        })
    }else{
        res.json({
            success:false,
            message:"No Barbers Found",
        })
    }
})
const viewSigleShop = asyncHandler(async(req,res)=>{
    console.log("------------------")
    console.log(req.body)
    let id = req.body.data
    console.log(id,"id,----")
    let singleShop = await getAShop(id)
    res.json({
        success:true,
        message:"Single shop",
        data:singleShop
    })

})
const viewMyService = asyncHandler(async(req,res)=>{
    let id = req.params.id
    let myShops = await getMyService(id)
    res.json({
        success:true,
        message:"Single shop",
        data:myShops
    })
})
const viewMyBarbers = asyncHandler(async(req,res)=>{
    let id = req.params.id
    let myBarbers = await getMyBarbers(id)
    res.json({
        success:true,
        message:"Single shop",
        data:myBarbers
    })
})

module.exports = {AddShop,ViewAllShop,addService,ViewAllServices,addBarber,ViewAllBarbers,viewSigleShop,viewMyService,viewMyBarbers}