import formidable from "formidable";
import articleModel from "../../models/articleModel.js";
import serviceModel from "../../models/serviceModel.js";
import bookingModel from "../../models/bookingModel.js";


// ********** SERVICES **********

export const getAllServices = async (req, res) => {

    try {

        const services = await serviceModel.find({})
        res.status(200).json(services)

    } catch (err) {
        res.status(400).json({ message: "Services introuvables." })
    }
}

export const getServiceDetails = async (req, res) => {

    try {

        const service = await serviceModel.findById(req.params.id)
        if(!service) {
            return res.status(404).json({error: "Service inexistant."})
        } 
        res.status(200).json(service)

    } catch (err) {
        res.status(400).json({ message: "Service introuvable" })
    }
}


// ********** NEWS **********

export const createArticle = async (req, res) => {

    try {
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {

            if (err) {
                return res.status(500).json({ erreur: "Un problème est survenu lors du téléchargement de fichiers." })
            }

            const images = await copyFiles(files.file !== undefined ? files.file : []);

            articleModel.create({
                title: fields.title,
                content: fields.content,
                images
            })
                .then((article) => {
                    console.log("CREATION ARTICLE OK");
                    res.status(200).json({ message: "Nouvel article créé avec succès!", article })
                })
                .catch((err) => res.status(500).json({ error: "Une erreur est survenue lors de la création de l'article." }))
        })
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la création de l'article." })
    }
}


// ********** BOOKINGS **********

export const createBooking = async (req, res) => {
    
    try {
        const {date, startTime, endTime, animal, service} = req.body;
        serviceModel.create({
            date,
            startTime,
            endTime,
            animal,
            service
        })
            .then((booking) => {
                console.log(`Nouvelle réservation créée : ${booking}`);
                res.status(201).json({message: "Une nouvelle réservation a été créée!" , booking})
            })
            .catch((error) => {
                res.status(500).json({error: "Une erreur est survenue lors de la création de la réservation."})
            })

    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la création de la réservation." })
    }
}

export const getAllBookings = async (req, res) => {

    try {
        const bookings = await serviceModel.find({})
        res.status(200).json(bookings)

    } catch (err) {
        res.status(400).json({ message: "Réservations introuvables." })
    }
}

export const getBookingDetails = async (req, res) => {

    try {

        const booking = await bookingModel.findById(req.params.id)
        if(!booking) {
            return res.status(404).json({error: "Réservation inexistant."})
        } 
        res.status(200).json(booking)

    } catch (err) {
        res.status(400).json({ message: "Réservation introuvable" })
    }
}

export const updateBooking = async (req, res) => {

    try {
        const booking = await bookingModel.findById(req.params.id);
        const {name, description, price, visible} = req.body;

        if(!booking) {
            return res.status(404).json({error: "Cette réservation n'existe pas."})
        }
        
        bookingModel.findByIdAndUpdate(req.params.id, 
        {
            name: name || booking.name,
            description: description || booking.description,
            price: price || booking.price,
            visible: visible || booking.visible
        }, {new: true})
            .then((booking) => res.status(201).json({message: "Réservation modifiée avec succès!", booking}))
            .catch((err) => res.status(400).json({error: "La réservation n'a pas pu être modifiée."}) )
        
    } catch(err) {
        return res.status(400).json({error: "La réservation n'a pas pu être modifiée."})
    }
}

export const deleteBooking = async (req, res) => {
    const service = await serviceModel.findById(req.params.id);
    
    if(!service) {
        return res.status(404).json({error: "Ce service n'existe pas."})
    }

    serviceModel.findByIdAndDelete(req.params.id)
        .then((service) => res.status(204).send())
        .catch((err) => res.status(500).json({error: "Le service n'a pas pu être supprimé."}))

}

export const deleteAllBookings = (req, res) => {

    serviceModel.deleteMany()
        .then((service) => {
            
            console.log("Tous les services ont été supprimés!");
            return res.status(204).send()
        })
        .catch(err => {
            console.log("Une erreur est survenue lors de la supression des services.");
            return res.status(500).json({ error: "Une erreur est survenue lors de la suppression des services." })
        })

}

