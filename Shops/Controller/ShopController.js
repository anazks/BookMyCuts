const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const secretkey = process.env.secretkey;

const {
    addShop,
    viewAllShops,
    addServices,
    viewAllServices,
    addBarbers,
    viewAllBarbers,
    getAShop,
    getMyService,
    getMyBarbers,
    getAllBookingsOfShop,
    getShopUser,
    getMyshop,
    getShopService,
    getShopBarbers,
    editBarberProfile,
    deleteBarberFunction,
    makePremiumFunction
} = require('../Repo/ShopRepo');
const Decoder = require("../../TokenDecoder/Decoder");

const AddShop = asyncHandler(async (req, res) => {
    const data = req.body;
    console.log("Data received for adding shop:", data);
    // Validate presence of data
    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No shop data provided"
        });
    }

    // Check for token
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        });
    }

    try {
        // Decode the token
        const decoded = jwt.verify(token, secretkey);
        req.userId = decoded.id;

        // Add userId to the shop data
        data.ShopOwnerId = req.userId;

        console.log("Data received for adding shop:", data);

        // Save shop
        const shopAdded = await addShop(data);
        console.log("Shop added:", shopAdded);  
        if (shopAdded) {
            return res.status(201).json({
                success: true,
                message: "Shop added successfully",
                data: shopAdded
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed to add shop"
            });
        }

    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
});


const ViewAllShop = asyncHandler(async (req, res) => {
    try {
        const allShops = await viewAllShops();
        if (!allShops || allShops.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No shops found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "All shops retrieved successfully",
            data: allShops
        });
    } catch (error) {
        console.error("Error fetching shops:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

const addService = asyncHandler(async (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No service data provided"
        });
    }

    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, secretkey);
        data.shoperId = decoded.id;

        const addedService = await addServices(data);
        if (addedService) {
            return res.status(201).json({
                success: true,
                message: "Service added successfully",
                data: addedService
            });
        }
        return res.status(500).json({
            success: false,
            message: "Failed to add service"
        });
    } catch (error) {
        console.error("Error adding service:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

const ViewAllServices = asyncHandler(async (req, res) => {
    try {
        const allServices = await viewAllServices();
        if (!allServices || allServices.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No services found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "All services retrieved successfully",
            data: allServices
        });
    } catch (error) {
        console.error("Error fetching services:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

const addBarber = asyncHandler(async (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No barber data provided"
        });
    }

    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, secretkey);
        data.shoperId = decoded.id;

        const addedBarber = await addBarbers(data);
        if (addedBarber) {
            return res.status(201).json({
                success: true,
                message: "Barber added successfully",
                data: addedBarber
            });
        }
        return res.status(500).json({
            success: false,
            message: "Failed to add barber"
        });
    } catch (error) {
        console.error("Error adding barber:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

const ViewAllBarbers = asyncHandler(async (req, res) => {
    try {
        const allBarbers = await viewAllBarbers();
        if (!allBarbers || allBarbers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No barbers found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "All barbers retrieved successfully",
            data: allBarbers
        });
    } catch (error) {
        console.error("Error fetching barbers:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

const viewSigleShop = asyncHandler(async (req, res) => {
    try {
        // const shopOwnerId = req.userId;
        console.log("Request body:", req.body);
        const shop = await getAShop(req.body.id);
        console.log("Shop data:--------", shop);
        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Shop not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Shop retrieved successfully",
            data: shop
        });
    } catch (error) {
        console.error("Error fetching shop:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

const viewMyService = asyncHandler(async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        });
    }

    try {
        const tokenData = await Decoder(token);
        const myServices = await getMyService(tokenData.id);
        
        if (!myServices || myServices.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No services found for this shop"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Services retrieved successfully",
            data: myServices
        });
    } catch (error) {
        console.error("Error fetching services:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

const viewMyBarbers = asyncHandler(async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        });
    }

    try {
        const tokenData = await Decoder(token);
        const myBarbers = await getMyBarbers(tokenData.id);
        
        if (!myBarbers || myBarbers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No barbers found for this shop"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Barbers retrieved successfully",
            data: myBarbers
        });
    } catch (error) {
        console.error("Error fetching barbers:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

const viewAllBookingOfShops = asyncHandler(async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        const tokenData = await Decoder(token);
        console.log(tokenData)
        const bookings = await getAllBookingsOfShop(tokenData.id);
        
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No bookings found for this shop"
            });
        }
        console.log(bookings)
        return res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: bookings
        });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

const myprofile = asyncHandler(async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        });
    }

    try {
        const tokenData = await Decoder(token);
        const shopData = await getShopUser(tokenData.id);
        
        if (!shopData) {
            return res.status(404).json({
                success: false,
                message: "Shop profile not found"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Profile retrieved successfully",
            data: shopData
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
const viewMyshop = asyncHandler(async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        });
    }

    try {
        const tokenData = await Decoder(token);
        const myShop = await getMyshop(tokenData.id);
            console.log("My shop data:--------", myShop);
        if (!myShop) {
            return res.status(404).json({
                success: false,
                message: "My shop not found"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "My shop retrieved successfully",
            data: myShop
        });
    } catch (error) {
        console.error("Error fetching my shop:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
})
const viewSingleShopService = asyncHandler(async (req, res) => {
    const shopId = req.params.id;
    if (!shopId) {
        return res.status(400).json({
            success: false,
            message: "Shop ID is required"
        });
    }

    try {
        const services = await getShopService(shopId);
        if (!services || services.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No services found for this shop"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Services retrieved successfully",
            data: services
        });
    } catch (error) {
        console.error("Error fetching services:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
})
const viewSingleShopBarbers = asyncHandler(async (req, res) => {
    const shopId = req.params.id;
    if (!shopId) {
        return res.status(400).json({
            success: false,
            message: "Shop ID is required"
        });
    }

    try {
        const barbers = await getShopBarbers(shopId);
        if (!barbers || barbers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No barbers found for this shop"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Barbers retrieved successfully",
            data: barbers
        });
    } catch (error) {
        console.error("Error fetching barbers:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

const updateBarber = async (req,res) => {
    try {
        const barberId = req.params.id
        let data = req.body
        const barber = await editBarberProfile(barberId,data)
        if(!barber || barber.lenght === 0){
             return res.status(404).json({
                success: false,
                message: "barber not found"
            });
        }

          return res.status(200).json({
            success: true,
            message: "successfully updated barber",
            data: barber
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message:"internal server error"
        })
    }
}

const deleteBarber =async (req, res) => {
     try {
         const barberId = req.params.id
         const barber = await deleteBarberFunction(barberId)
         if(!barber || barber.length === 0){
            return res.status(404).json({
                success:true,
                message:"successfull deleted"
            })
         }

     } catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
     }
}

const makePremium =  async (req,res) => {
    try {
        const {shopId} = req.body
        const premium = await makePremiumFunction(shopId)
        if(!premium || premium.length === 0){
            return res.status(404).json({
                succuss:true,
                message:"premium subscirption is failed"
            })
        }else{
            return res.status(200).json({
                success:true,
                message:"successfully subscribed to premium",
                premium
            })
        }
    } catch (error) {
            console.error(error)
            return res.status(500).json({
                success:false,
                message:"internal server error"
            })
    }
}

module.exports = {
    makePremium,
    deleteBarber,
    myprofile,
    AddShop,
    ViewAllShop,
    addService,
    ViewAllServices,
    addBarber,
    ViewAllBarbers,
    viewSigleShop,
    viewMyService,
    viewMyBarbers,
    viewAllBookingOfShops,
    viewMyshop,
    viewSingleShopService,
    viewSingleShopBarbers,
    updateBarber
};