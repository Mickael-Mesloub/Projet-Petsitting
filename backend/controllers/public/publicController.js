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
        console.log("ENTREE DANS CATCH");
        // const { userId } =  req.params.id;
        console.log(`USER-ID : ${req}`);
        const { service, date, startTime, endTime, animal } = req.body;
        console.log(`SERVICE : ${service} // DATE : ${date} // STARTTIME : ${startTime} // ENDTIME : ${endTime} // ANIMAL : ${animal} `);

        bookingModel.create({
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