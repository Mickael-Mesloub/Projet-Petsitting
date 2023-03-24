import bookingModel from "../../models/bookingModel.js";

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find({});

        if(!bookings) {
            return res.status(404).json({error: "Aucune réservation n'a été trouvée."});
        }

        return res.status(200).json({bookings});
    } catch(error) {
        return res.status(500).json({error: `Une erreur est survenue et les réservations n'ont pas pu s'afficher : ${error.message}. Veuillez réessayer.`});
    };
};

export const getBooking = async (req, res) => {
    try {
        const booking = await bookingModel.findById(req.params.bookingId);
        
        if(!booking) {
            return res.status(404).json({error: "Cette réservation n'existe pas."});
        };
        console.log({booking});

        return res.status(200).json({booking})
            
    } catch(error) {
        return res.status(500).json({error: `Une erreur est survenue et la réservation n'a pas pu être affichée : ${error.message}. Veuillez réessayer.`});
    };
} ;

export const cancelUserBooking = async (req, res) => {
    try {
        const booking = await bookingModel.findById(req.params.bookingId);

        if(!booking) {
            return res.status(404).json({error: "Cette réservation n'existe pas."});
        };

        return res.status(204).send();

    } catch(error) {
        return res.status(500).json({error: `Une erreur est survenue et cette réservation n'a pas pu être supprimée : ${error.message}. Veuillez réessayer.`})
    }
};