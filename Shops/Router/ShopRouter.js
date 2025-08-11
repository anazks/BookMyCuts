const express = require('express');
const router = express.Router();
const {viewMyshop,viewSingleShopBarbers,viewSingleShopService,myprofile,viewAllBookingOfShops,myShopProfile,AddShop,ViewAllShop,addService,ViewAllServices,addBarber,ViewAllBarbers,viewSigleShop,viewMyService,viewMyBarbers,updateBarber, deleteBarber,makePremium} = require('../Controller/ShopController')

router.route('/addShop').post(AddShop)
router.route('/getMyProfile').get(myprofile)
router.route('/ViewAllShop').get(ViewAllShop)
router.route('/viewSigleShop').post(viewSigleShop)
router.route('/viewMyshop').get(viewMyshop)
router.route('/viewMyBooking').get(viewAllBookingOfShops) // Assuming this is a function
// router.route('/viewMyShop').get(viewMyShop) // Assuming this is a function
// router.route('/viewMyShop').get(myShopProfile)
router.route('/addService').post(addService)
router.route('/viewMyService').get(viewMyService)

router.route('/viewSingleShopBarbers/:id').get(viewSingleShopBarbers) // Assuming this is a function
router.route('/viewSingleShopService/:id').get(viewSingleShopService) // Assuming this is a function

router.route('/ViewAllServices').get(ViewAllServices)

router.route('/addBarber').post(addBarber)
router.route('/ViewAllBarbers').get(ViewAllBarbers)
router.route('/viewMyBarbers').get(viewMyBarbers)
router.route('/updateBarber/:id').put(updateBarber)
router.route('/deleteBarber/:id').delete(deleteBarber)

router.route('/premium').post(makePremium)

module.exports = router;