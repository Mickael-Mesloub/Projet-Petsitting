import serviceModel from "../../models/serviceModel.js";
import bookingModel from "../../models/bookingModel.js";
import articleModel from "../../models/articleModel.js";


// ********** SERVICES **********

export const getAllServices = async (req, res) => {
    try {
        const services = await serviceModel.find({});
        res.status(200).json(services);

    } catch (error) {
        res.status(400).json({ error: "Services introuvables." });
    };
};

export const getServiceDetails = async (req, res) => {
    try {
        const service = await serviceModel.findById(req.params.id);

        if(!service) {
            return res.status(404).json({error: "Service inexistant."});
        } ;

        res.status(200).json(service);
    } catch (error) {
        res.status(400).json({ error: "Service introuvable" });
    };
};

// ********** NEWS **********

export const getAllArticles = async (req, res) => {
    try {
        const articles = await articleModel.find({});
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: `Articles introuvables : ${error.message}. Veuillez réessayer.` })
    }
};

// ********** BOOKINGS **********

export const createBooking = async (req, res) => {
    try {
        const { service, date, startTime, endTime, animal } = req.body;
        serviceModel.create({
            service,
            date,
            startTime,
            endTime,
            animal
        })
            .then((booking) => {
                console.log(`Nouvelle réservation créée : ${booking}`);
                res.status(201).json({message: "Une nouvelle réservation a été créée!" , booking});
            })
            .catch((error) => {
                res.status(500).json({error: `Une erreur est survenue et la réservation n'a pas pu être créée : ${error.message}. Veuillez réessayer.`});
            })
    } catch (error) {
        res.status(500).json({ error: `Une erreur est survenue et la réservation n'a pas pu être créée : ${error.message}. Veuillez réessayer.` });
    };
};

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await serviceModel.find({});
        res.status(200).json(bookings);
    } catch (error) {
        res.status(400).json({ error: "Réservations introuvables." });
    };
};

export const getBookingDetails = async (req, res) => {
    try {
        const booking = await bookingModel.findById(req.params.id);

        if(!booking) {
            return res.status(404).json({error: "Réservation inexistante."});
        } ;

        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ error: "Réservation inexistante." });
    };
};

export const updateBooking = async (req, res) => {
    try {
        const booking = await bookingModel.findById(req.params.id);
        const {date, startTime, endTime, animal, service} = req.body;

        if(!booking) {
            return res.status(404).json({error: "Cette réservation n'existe pas."});
        };
        
        bookingModel.findByIdAndUpdate(req.params.id, 
        {
            date: date || booking.date,
            startTime: startTime || booking.startTime,
            endTime: endTime || booking.endTime,
            animal: animal || booking.animal,
            service: service || booking.service
        }, {new: true})
            .then((booking) => res.status(201).json({message: "Réservation modifiée avec succès!", booking}))
            .catch((error) => res.status(400).json({error: `Une erreur est survenue et la réservation n'a pas pu être modifiée : ${error.message}. Veuillez réessayer.`}));
    } catch(error) {
        return res.status(400).json({error: `Une erreur est survenue et la réservation n'a pas pu être modifiée : ${error.message}. Veuillez réessayer.`});
    };
};

export const deleteBooking = async (req, res) => {
    const booking = await bookingModel.findById(req.params.id);
    
    if(!booking) {
        return res.status(404).json({error: "Ce booking n'existe pas."});
    };

    bookingModel.findByIdAndDelete(req.params.id)
        .then((booking) => res.status(204).send())
        .catch((error) => res.status(500).json({error: `Une erreur est survenue et la réservation n'a pas pu être annulée : ${error.message}. Veuillez réessayer.`}));

};

export const deleteAllBookings = (req, res) => {
    bookingModel.deleteMany()
        .then((booking) => {
            console.log("Toutes les réservations ont été annulées!");
            return res.status(204).send();
        })
        .catch(error => {
            console.log("Une erreur est survenue lors de la supression des réservations.");
            return res.status(500).json({ error: `Une erreur est survenue et les réservations n'ont pas pu être annulées : ${error.message}. Veuillez réessayer.` });
        });
};

