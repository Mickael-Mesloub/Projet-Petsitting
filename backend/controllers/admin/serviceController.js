import serviceModel from '../../models/serviceModel.js';

export const createService = async (req, res) => {
    console.log("ok");
    try {
        const {name, description, price, visible} = req.body;
        serviceModel.create({
            name,
            description,
            price,
            visible
        })
            .then((service) => {
                console.log(`Nouveau service créé : ${service}`);
                res.status(201).json({message: "Un nouveau service a été créé!" , service})
            })
            .catch((error) => {
                res.status(500).json({error: "Une erreur est survenue lors de la création du service."})
            })

    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la création du service." })
    }
}

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
            return res.status(404).json({error: "Article inexistant."})
        } 
        res.status(200).json(service)

    } catch (err) {
        res.status(400).json({ message: "Service introuvable" })
    }
}

export const updateService = async (req, res) => {

    try {
        const service = await serviceModel.findById(req.params.id);
        const {name, description, price, visible} = req.body;

        if(!service) {
            return res.status(404).json({error: "Ce service n'existe pas."})
        }
        
        serviceModel.findByIdAndUpdate(req.params.id, 
        {
            name: name || service.name,
            description: description || service.description,
            price: price || service.price,
            visible: visible || service.visible
        }, {new: true})
            .then((service) => res.status(201).json({message: "Service modifié avec succès!", service}))
            .catch((err) => res.status(400).json({error: "Le service n'a pas pu être modifié."}) )
        
    } catch(err) {
        return res.status(400).json({error: "Le service n'a pas pu être modifié."})
    }
}

export const deleteService = async (req, res) => {
    const service = await serviceModel.findById(req.params.id);
    
    if(!service) {
        return res.status(404).json({error: "Ce service n'existe pas."})
    }

    serviceModel.findByIdAndDelete(req.params.id)
        .then((service) => res.status(204).send())
        .catch((err) => res.status(500).json({error: "Le service n'a pas pu être supprimé."}))

};

export const deleteAllServices = (req, res) => {

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