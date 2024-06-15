const db = require("../config/db");

const addAttendees = async (req, res) => {
  const { UserId, EventId } = req.body;
  try {
    if (!UserId || !EventId) {
      return res.status(400).send({
        success: false,
        message: "Both UserId and EventId are required",
      });
    }

    const query = "INSERT INTO attendees (UserId, EventId) VALUES (?, ?)";
    const [result] = await db.execute(query, [UserId, EventId]);

    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Error in insert query",
      });
    }

    res.status(201).send({
      success: true,
      message: "Attendee added successfully",
      attendeeId: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in adding attendee",
      error,
    });
  }
};

const removeAttendees = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Attendee ID is required",
      });
    }

    const query = "DELETE FROM attendees WHERE Id = ?";
    const [result] = await db.execute(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Attendee not found",
      });
    }

    res.send({
      success: true,
      message: "Attendee removed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in removing attendee",
      error,
    });
  }
};

const getAttendees = async (req, res) => {
  try {
    const { UserId } = req.query;
    if (!UserId) {
      return res.status(400).send({
        success: false,
        message: "UserId is required",
      });
    }
    const query = "SELECT * FROM attendees";
    const data = `SELECT *
        FROM attendees
        INNER JOIN events ON attendees.EventId=events.id   INNER JOIN users ON attendees.UserId=users.id WHERE attendees.UserId=?`;
    const [rows] = await db.execute(data, [UserId]);

    res.status(200).send({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching attendees",
      error,
    });
  }
};
const getALLAttendees = async (req, res) => {
  try {
    const query = `SELECT *
        FROM attendees
        INNER JOIN events ON attendees.EventId=events.id   INNER JOIN users ON attendees.UserId=users.id `;

    const [rows] = await db.execute(query);

    res.status(200).send({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching attendees",
      error,
    });
  }
};

const updateAttendees = async (req, res) => {
  try {
    const { id } = req.params;
    const { UserId, EventId } = req.body;
    const { status } = req.body;
    if (!UserId || !EventId) {
      return res.status(400).send({
        success: false,
        message: "Both UserId and EventId are required",
      });
    }
    if (!status) {
      return res.status(400).send({
        success: false,
        message: "Status is required",
      });
    }
    const query =
      "UPDATE attendees SET  status= ? UserId = ?, EventId = ? WHERE Id = ?";
    const [result] = await db.execute(query, [UserId, EventId, id]);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Attendee not found",
      });
    }

    res.send({
      success: true,
      message: "Attendee updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating attendee",
      error,
    });
  }
};
module.exports = {
  addAttendees,
  removeAttendees,
  getAttendees,
  getALLAttendees,
  updateAttendees,
};
