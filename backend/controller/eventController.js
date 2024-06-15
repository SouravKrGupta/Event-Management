const db = require("../config/db");
const fs = require("fs");

const addEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      price,
      privacy,
      category,
    } = req.body;
    const image_filename = req.file.filename;
    // Ensure all required fields are provided
    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !location ||
      !price ||
      !privacy ||
      !category ||
      !image_filename
    ) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    // Convert date to MySQL format 'YYYY-MM-DD'
    const formattedDate = new Date(date).toISOString().slice(0, 10);
    // Insert event into the database
    const data =
      "INSERT INTO events (image, title, description, date, time, location, price, privacy, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const [result] = await db.execute(data, [
      image_filename,
      title,
      description,
      formattedDate,
      time,
      location,
      price,
      privacy,
      category,
    ]);
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Error in insert query",
      });
    }
    res.status(201).send({
      success: true,
      message: "Event created successfully",
      eventId: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating event API",
      error,
    });
  }
};

const removeEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Event ID is required",
      });
    }
    // Retrieve the event from the database
    const [rows] = await db.execute("SELECT * FROM events WHERE id = ?", [id]);
    const event = rows[0];

    if (!event) {
      return res.status(404).send({
        success: false,
        message: "Event not found",
      });
    }
    // Delete the associated image file
    fs.unlink(`uploads/${event.image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    // Delete event from the database
    const data = "DELETE FROM events WHERE id = ?";
    const [result] = await db.execute(data, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Event removed successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Removing event API",
      error,
    });
  }
};

// const getEvent = async (req, res) => {
//   try {
//     // Fetch all events from the database
//     const { id } = req.params;

//     let query = "SELECT * FROM events";
//     const queryParams =[];
//     if(id){
//       query+="WHERE id = ?"
//       queryParams.push(id);
//     }

//     const [rows] = await db.execute(query,queryParams);
//     // Check if there are any events
//     if (rows.length === 0) {
//       return res.status(404).send({
//         success: false,
//         message: "No events found",
//       });
//     }

//     res.status(200).send({
//       success: true,
//       message: "Events retrieved successfully",
//       events: id ?rows[0] :rows,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: "Error in retrieving events",
//       error,
//     });
//   }
// };
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Event ID is required",
      });
    }

    const [rows] = await db.execute("SELECT * FROM events WHERE id = ?", [id]);
    const event = rows[0];

    if (!event) {
      return res.status(404).send({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Event retrieved successfully",
      event,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in retrieving event",
      error,
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM events");

    if (rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No events found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Events retrieved successfully",
      events: rows,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in retrieving events",
      error,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      date,
      time,
      location,
      price,
      privacy,
      category,
    } = req.body;
    console.log(req.body);
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Event ID is required",
      });
    }

    // Retrieve the event from the database to check if it exists
    const [rows] = await db.execute("SELECT * FROM events WHERE id = ?", [id]);
    const event = rows[0];

    if (!event) {
      return res.status(404).send({
        success: false,
        message: "Event not found",
      });
    }

    // Prepare fields to update
    const updates = {
      title,
      description,
      date: date ? new Date(date).toISOString().slice(0, 10) : event.date,
      time,
      location,
      price,
      privacy,
      category,
    };

    // If a new image is provided, handle the file update
    if (req.file) {
      const newImageFilename = req.file.filename;
      // Delete the old image file
      fs.unlink(`uploads/${event.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      updates.image = newImageFilename;
    }

    // Build the SQL update query dynamically
    const updateFields = Object.keys(updates)
      .filter((key) => updates[key] !== undefined)
      .map((key) => `${key} = ?`)
      .join(", ");
    const updateValues = Object.values(updates).filter(
      (value) => value !== undefined
    );

    const sql = `UPDATE events SET ${updateFields} WHERE id = ?`;
    updateValues.push(id);
    console.log(sql);
    console.log(updateFields);
    const [result] = await db.execute(sql, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Event not found or no changes made",
      });
    }

    res.status(200).send({
      success: true,
      message: "Event updated successfully",
      result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating event",
      error,
    });
  }
};
const searchEvents = async (req, res) => {
  try {
    const { query } = req.query;

    let sql = "SELECT * FROM events WHERE 1=1";
    const params = [];

    if (query) {
      sql += " AND (title LIKE ? OR description LIKE ? OR location LIKE ? OR DATE_FORMAT(date, '%Y-%m-%d') LIKE ? OR time LIKE ?)";
      params.push(`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`);
    }

    const [rows] = await db.execute(sql, params);

    if (rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No events found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Events retrieved successfully",
      events: rows,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in retrieving events",
      error,
    });
  }
};

module.exports = {
  addEvent,
  removeEvent,
  getEventById,
  getAllEvents,
  updateEvent,
  searchEvents
};
