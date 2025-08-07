const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const secretkey = process.env.secretkey;

const {addShop,viewAllShops,addServices,viewAllServices,addBarbers,viewAllBarbers,getAShop,getMyService,getMyBarbers, getAllBookingsOfShop} = require('../Repo/ShopRepo')




const {getShopUser,addShop,viewAllShops,addServices,viewAllServices,addBarbers,viewAllBarbers,getAShop,getMyService,getMyBarbers} = require('../Repo/ShopRepo');
const Decoder = require("../../TokenDecoder/Decoder");

const AddShop = asyncHandler(async (req,res)=>{
     const data = req.body;
     console.log("userId",req.userId)
     data.ShopOwnerId = req.userId;
     console.log(data)
     let shopAdded = await  addShop(data)
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
const addService = asyncHandler(async (req, res) => {
    const data = req.body;

    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No service data provided",
        });
    }

    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided",
        });
    }

    let shopId;
    try {
        const decoded = jwt.verify(token, secretkey);
        shopId = decoded.id;
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }

    // Attach shopId to service data
    data.shopId = shopId;
    console.log(data, "data with shopId");

    try {
        const addedService = await addServices(data);

        if (addedService) {
            return res.json({
                success: true,
                message: "Services added successfully",
                data: addedService
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Services not added"
            });
        }
    } catch (error) {
        console.error("Error adding service:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

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
const addBarber = asyncHandler(async (req, res) => {
    const data = req.body;
    console.log(data, "data from add barber");
    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No barber data provided"
        });
    }

    let token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    let shop_Id;
    try {
        const decoded = jwt.verify(token, secretkey);
        shop_Id = decoded.id;
        
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    console.log(token, shop_Id, "token from add service");

    // Add shopId to the barber data
    data.shopId = shop_Id;

    try {
        const addBarberResult = await addBarbers(data);
        if (addBarberResult) {
            res.json({
                success: true,
                message: "Barber added successfully",
                data: addBarberResult
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Barber not added",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});

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
    const shopOwnerId = req.userId
    let shops = await getAShop(shopOwnerId)
    res.json({
        success:true,
        message:"Single shop",
        shops
    })

})
const viewMyService = asyncHandler(async(req,res)=>{
    // let id = req.params.id
    let token = req.headers['authorization']?.split(' ')[1]; // Get token from the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    let id;
    try {
        let tokenData = await Decoder(token);
        console.log(tokenData, "tokenData in viewMyService");
        id = tokenData.id; // Assuming the shop ID is in the decoded token
        let myShops = await getMyService(id)
        console.log(myShops, "myShops in viewMyService");
        res.json({
            success:true,
            message:"Single shop",
            data:myShops
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
    console.log(id,"id in viewMyService")
    if (!id) {
        return res.status(400).json({ success: false, message: "Shop ID is required" });
    }
    console.log("Fetching services for shop ID:", id);
    // Fetch services for the shop ID
  
  
})
const viewMyBarbers = asyncHandler(async(req,res)=>{
    // let id = req.params.id
    let token = req.headers['authorization']?.split(' ')[1]; // Get token from the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    let id;
    try {
        let tokenData = await Decoder(token);
        console.log(tokenData, "tokenData in viewMyBarbers");
        id = tokenData.id; // Assuming the shop ID is in the decoded token
        let myBarbers = await getMyBarbers(id)
    res.json({
        success:true,
        message:"Single shop",
        data:myBarbers
    })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
    
})


const viewAllBookingOfShops = asyncHandler(async (req,res)=>{
    const shopOwnerId = req.userId
    console.log(req.userId,"userId in viewAllBookingOfShops")
    let bookings = await getAllBookingsOfShop(shopOwnerId)
    if(!bookings || bookings.length === 0){
          res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }else{
          res.status(200).json({
            success:true,
            message:"All bookings of shop",
            bookings
        })
    }
})

// module.exports = {AddShop,ViewAllShop,addService,ViewAllServices,addBarber,ViewAllBarbers,viewSigleShop,viewMyService,viewMyBarbers,viewAllBookingOfShops}

const myprofile = asyncHandler(async (req, res) => {
    let token = req.headers['authorization']?.split(' ')[1]; // Get token from the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    } 
    try {
        let tokenData = await Decoder(token);
        console.log(tokenData, "tokenData in myprofile");
        let shopid = tokenData.id; // Assuming the shop ID is in the decoded token
        let shopperData = await getShopUser(shopid);
        console.log(tokenData, "tokenData in myprofile");
        res.json({
            success: true,
            message: "User profile fetched successfully",
            user: shopperData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
})
module.exports = {myprofile,AddShop,ViewAllShop,addService,ViewAllServices,addBarber,ViewAllBarbers,viewSigleShop,viewMyService,viewMyBarbers}

