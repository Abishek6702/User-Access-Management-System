const { AppDataSource } = require("../data-source");
const Request = require("../entities/Request");
const Software = require("../entities/Software");
const requestRepo = AppDataSource.getRepository("Request");
const softwareRepo = AppDataSource.getRepository("Software");

// user make access request
exports.submitRequest = async (req, res) => {
  try {
    const { softwareId, accessType, reason } = req.body;
    const userId = req.user.id;

    const software = await softwareRepo.findOneBy({ id: softwareId });
    if (!software) return res.status(404).json({ msg: "Software not found" });

    // Defensive: ensure accessLevels is an array
    let accessLevels = software.accessLevels;
    if (typeof accessLevels === "string") {
      accessLevels = accessLevels.split(",").map(s => s.trim());
    }
    console.log("software.accessLevels:", accessLevels, "accessType:", accessType);

    if (!accessLevels.includes(accessType)) {
      return res.status(400).json({ msg: "Invalid access type" });
    }

    const request = requestRepo.create({
      user: { id: userId },
      software: { id: softwareId },
      accessType,
      reason,
      status: "Pending"
    });

    await requestRepo.save(request);
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ msg: "Error submitting request" });
  }
};


// approve or reject the accesss request made
exports.manageRequest = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body; // "Approved" or "Rejected"
    const request = await requestRepo.findOne({
      where: { id },
      relations: ["user", "software"]
    });
    if (!request) return res.status(404).json({ msg: "Request not found" });
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }
    request.status = status;
    await requestRepo.save(request);
    res.json(request);
  } catch (err) {
    res.status(500).json({ msg: "Error updating request" });
  }
};

// to get pending request 
exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await requestRepo.find({
      where: { status: "Pending" },
      relations: ["user", "software"]
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching requests" });
  }
};
// to fetch all the request made
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await requestRepo.find({
      relations: ["user", "software"],
      order: { id: "DESC" } // optional: newest first
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching all requests" });
  }
};
// fetch request of particular user
exports.getMyRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const requests = await requestRepo.find({
      where: { user: { id: userId } },
      relations: ["software", "user"],
      order: { id: "DESC" }
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching your requests" });
  }
};
