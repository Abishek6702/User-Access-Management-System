const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getRepository } = require("typeorm");
const User = require("../entities/User");
const { AppDataSource } = require("../data-source");

exports.signup = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository("User");
    const { username, password, role } = req.body;

    // Validate role default to 'Employee' 
    const validRoles = ["Employee", "Manager", "Admin"];
    let userRole = validRoles.includes(role) ? role : "Employee";

    // If username starts with 'admin' then automatically assign the user as admin
    if (
      typeof username === "string" &&
      username.toLowerCase().startsWith("admin")
    ) {
      userRole = "Admin";
    }

 
    const existingUser = await repo.findOneBy({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "Username already taken" });
    }

  
    const hashed = await bcrypt.hash(password, 10);

   
    const user = repo.create({ username, password: hashed, role: userRole });

    await repo.save(user);
    res.status(201).json({ msg: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  const repo = AppDataSource.getRepository("User");
  const { username, password } = req.body;

  const user = await repo.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token, role: user.role });
};
