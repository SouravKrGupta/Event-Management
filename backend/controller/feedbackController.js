const db = require("../config/db");

const addFeedback = async (req, res) => {
  const { description, rating, eventId, userId } = req.body;
  try {
    if (!description || !rating || !eventId || !userId) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const data =
      "INSERT INTO feedback (Description, Rating, EventId, UserId) VALUES (?, ?, ?, ?)";
    const [result] = await db.execute(data, [
      description,
      rating,
      eventId,
      userId,
    ]);
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Error in insert query",
      });
    }
    res.status(201).send({
      success: true,
      message: "Feedback created successfully",
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

const removeFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Event ID is required",
      });
    }
    const data = "DELETE FROM feedback WHERE Id = ?";
    const [result] = await db.execute(data, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Feedback not found",
      });
    }
    res.send({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Removing event API",
      error,
    });
  }
};

const getFeedback = async (req, res) => {
    try {
        const [results] = await db.execute('SELECT * FROM feedback');
        res.send({
            success: true,
            feedback: results,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in fetching feedback",
            error,
        });
    }
};

const updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { description, rating } = req.body;
  try {
    if (!description && !rating) {
      return res.status(400).send({
        success: false,
        message: "At least one field is required to update",
      });
    }

    let updateFields = [];
    if (description) updateFields.push(`Description = '${description}'`);
    if (rating) updateFields.push(`Rating = ${rating}`);

    const updateQuery = `UPDATE feedback SET ${updateFields.join(
      ", "
    )} WHERE Id = ?`;
    const [result] = await db.execute(updateQuery, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Feedback not found",
      });
    }
    res.send({
      success: true,
      message: "Feedback updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Updating feedback API",
      error,
    });
  }
};

module.exports = {
  addFeedback,
  removeFeedback,
  getFeedback,
  updateFeedback,
};
