const { AppDataSource } = require("../data-source");
const Software = require("../entities/Software");
const softwareRepo = AppDataSource.getRepository("Software");
const Request = require("../entities/Request");
const requestRepo = AppDataSource.getRepository("Request");

// create new software
exports.createSoftware = async (req, res) => {
  try {
    const { name, description, accessLevels } = req.body;
    const software = softwareRepo.create({ name, description, accessLevels });
    await softwareRepo.save(software);
    res.status(201).json(software);
  } catch (err) {
    res.status(500).json({ msg: "Error creating software" });
  }
};

// ftech all softwares
exports.getSoftwares = async (req, res) => {
  try {
    const softwares = await softwareRepo.find();
    res.json(softwares);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching software" });
  }
};

// to edit softwares
exports.updateSoftware = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, accessLevels } = req.body;
    let software = await softwareRepo.findOneBy({ id });
    if (!software) return res.status(404).json({ msg: "Software not found" });
    software.name = name;
    software.description = description;
    software.accessLevels = accessLevels;
    await softwareRepo.save(software);
    res.json(software);
  } catch (err) {
    res.status(500).json({ msg: "Error updating software" });
  }
};

// to delete particular software 
exports.deleteSoftware = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const software = await softwareRepo.findOneBy({ id });
    if (!software) return res.status(404).json({ msg: "Software not found" });

    await softwareRepo.remove(software);
    res.json({ msg: "Software and its requests deleted" });
  } catch (err) {
    console.error("Delete software error:", err);
    res.status(500).json({ msg: "Error deleting software", error: err.message });
  }
};




