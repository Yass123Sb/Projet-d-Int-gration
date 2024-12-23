const User = require("../models/user.model.js");

const signup = async (req, res) => {
	const { email, password, name, role, department,degree } = req.body;
	const departments = [
		"Informatique",
		"Télécommunications",
		"Électronique",
		"Génie Civil",
		"Mécanique",
		"Génie Industriel",
		"Énergétique",
		"Génie Biologique",
		"Automatique",
		"Mathématiques Appliquées",
	];

	if (department && !departments.includes(department)) {
		return res.status(400).json({ message: "Invalid department" });
	}

	try {
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Create new user with the degree included
		const user = await User.create({ name, email, password, role, degree,department });

		// Send back the response excluding the password
		console.log(user);
		
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			degree: user.degree,
			department: user.department,
		});
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ message: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (user && (await user.comparePassword(password))) {
			// Send back the response excluding the password
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				degree: user.degree,
			});
		} else {
			res.status(400).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ message: error.message });
	}
};

const getUserById = async (req, res) => {
	try {
	  const { id } = req.params;
	  const user = await User.findById(id); 
  
	  if (user) {
		res.json(user);
	  } else {
		res.status(404).json({ message: "User not found" }); 
	  }
	} catch (error) {
	  console.error("Error in getUserById controller:", error.message);
	  res.status(500).json({ message: "Internal server error" });
	}
  };

  const deleteUserById = async (req, res) => {
	try {
	  const { id } = req.params;
	  const deletedUser = await User.findByIdAndDelete(id);
  
	  if (deletedUser) {
		res.json({ message: "User deleted successfully", user: deletedUser });
	  } else {
		res.status(404).json({ message: "User not found" });
	  }
	} catch (error) {
	  console.error("Error in deleteUserById controller:", error.message);
	  res.status(500).json({ message: "Internal server error" });
	}
  };

const getAllUsers = async (req, res) => {
	try {
	  const users = await User.find(); 
  
	  if (users) {
		res.json(users);
	  } else {
		res.status(404).json({ message: "Users not found" }); 
	  }
	} catch (error) {
	  console.error("Error in getUsers controller:", error.message);
	  res.status(500).json({ message: "Internal server error" });
	}
  };

module.exports = { signup, login,getUserById,getAllUsers,deleteUserById };