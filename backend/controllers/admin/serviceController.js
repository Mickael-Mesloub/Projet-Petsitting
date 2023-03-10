export const createService = (req, res) => {
    console.log("ok");
    return res.status(201).json({message:"OK"})
}