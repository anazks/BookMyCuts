const {checkBookings,addBookings} = require('../Repo/BookingRepo')
module.exports.checkAvailable = async (data) => {
    try {
        let checkByDate = data.Date
        let available = await checkBookings(checkByDate)
        //find  the time is also avaible
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports.bookNow = async (data,decodedValue)=>{
    try {
            data.ShopId = decodedValue.id
            let Booking = await addBookings(data)
            return Booking
    } catch (error) {
            return error   
    }
}