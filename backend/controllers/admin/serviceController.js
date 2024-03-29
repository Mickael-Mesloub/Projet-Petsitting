import serviceModel from "../../models/serviceModel.js";

export const createService = async (req, res) => {
  try {
    const { category, name, description, price, visible } = req.body;
    serviceModel
      .create({
        category,
        name,
        description,
        price,
        visible,
      })
      .then((service) => {
        return res
          .status(201)
          .json({ message: "Un nouveau service a été créé!", service });
      })
      .catch((error) => {
        return res.status(500).json({
          error: `Une erreur est survenue et le service n'a pas pu être créé : ${error.message}. Veuillez réessayer.`,
        });
      });
  } catch (error) {
    return res.status(500).json({
      error: `Une erreur et le service n'a pas pu être créé : ${error.message}. Veuillez réessayer.`,
    });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await serviceModel.find({});
    return res.status(200).json(services);
  } catch (error) {
    return res.status(400).json({
      error: `Services introuvables : ${error.message}. Veuillez réessayer.`,
    });
  }
};

export const getServiceDetails = async (req, res) => {
  try {
    const service = await serviceModel.findById(req.params.serviceId);

    if (!service) {
      return res.status(404).json({
        error: `Service inexistant : ${error.message}. Veuillez réessayer.`,
      });
    }

    return res.status(200).json(service);
  } catch (error) {
    return res.status(400).json({
      error: `Service introuvable : ${error.message}. Veuillez réessayer.`,
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await serviceModel.findById(req.params.serviceId);
    const { category, name, description, price, visible } = req.body;
    serviceModel
      .findByIdAndUpdate(
        req.params.serviceId,
        {
          category: category || service.category,
          name: name || service.name,
          description: description || service.description,
          price: price || service.price,
          visible: visible || service.visible,
        },
        { new: true }
      )
      .then((service) => {
        return res
          .status(201)
          .json({ message: "Service modifié avec succès!", service });
      })
      .catch((error) => {
        return res.status(500).json({
          error: `Une erreur est survenue et le service n'a pas pu être modifié : ${error.message}`,
        });
      });
  } catch (error) {
    return res.status(404).json({
      error: `Service inexistant : ${error.message}. Veuillez réessayer.`,
    });
  }
};

export const deleteService = async (req, res) => {
  const service = await serviceModel.findById(req.params.serviceId);

  if (!service) {
    return res.status(404).json({ error: "Ce service n'existe pas." });
  }

  serviceModel
    .findByIdAndDelete(req.params.serviceId)
    .then((service) => {
      return res.status(204).send();
    })
    .catch((error) => {
      return res.status(500).json({
        error: `Une erreur est survenue et le service n'a pas pu être supprimé : ${error.message}`,
      });
    });
};

export const deleteAllServices = (req, res) => {
  serviceModel
    .deleteMany()
    .then((service) => {
      console.log("Tous les services ont été supprimés!");
      return res.status(204).send();
    })
    .catch((error) => {
      console.log(
        `Une erreur est survenue et les services n'ont pas pu être supprimés : ${error.message}`
      );
      return res.status(500).json({
        error: `Une erreur est survenue et les services n'ont pas pu être supprimés : ${error.message}`,
      });
    });
};
