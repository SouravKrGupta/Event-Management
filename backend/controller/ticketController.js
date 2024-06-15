const db =require('../config/db')

const addTicket = async (req, res) => {
    const { UserId, EventId, Type, Price, DateTime, Status } = req.body;
    try {
        if (!UserId || !EventId || !Type || !Price || !DateTime || !Status) {
            return res.status(400).send({
                success: false,
                message: "All fields are required",
            });
        }

        // Validate and format the DateTime value correctly
        const dateTime = new Date(DateTime);
        if (isNaN(dateTime.getTime())) {
            return res.status(400).send({
                success: false,
                message: "Invalid datetime format",
            });
        }
        const formattedDateTime = dateTime.toISOString().slice(0, 19).replace('T', ' '); // MySQL datetime format

        const query = 'INSERT INTO tickets (UserId, EventId, Type, Price, DateTime, Status) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [
            UserId, EventId, Type, Price, formattedDateTime, Status
        ]);

        if (!result) {
            return res.status(404).send({
                success: false,
                message: "Error in insert query",
            });
        }

        res.status(201).send({
            success: true,
            message: "Ticket created successfully",
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

const removeTicket =async(req,res)=>{

try {
    const {id} =req.params;
    if (!id) {
        return res.status(400).send({
          success: false,
          message: "Event ID is required",
        });
      }
      const data= 'DELETE FROM tickets WHERE Id = ?';
      const [result]=await db.execute(data,[id]);
      if (result.affectedRows === 0) {
        return res.status(404).send({
            success: false,
            message: "Ticket not found",
        });
    }
    res.send({
        success: true,
        message: "Ticket deleted successfully",
    });
} catch (error) {
    res.status(500).send({
        success: false,
        message: "Error in Removing event API",
        error,
      });

}
}
const getAllTicket=async(req,res)=>{
    try {
        const { UserId } = req.query; 
        if (!UserId) {
            return res.status(400).send({
                success: false,
                message: "UserId is required",
            });
        }
        const data = 'SELECT * FROM tickets WHERE UserId=?';
        const query=`SELECT *
        FROM tickets
        INNER JOIN events ON tickets.EventId=events.id WHERE tickets.UserId=?`
        const [results] = await db.execute(query, [UserId]);
        res.send({
            success: true,
            tickets: results,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in fetching ticket",
            error,
        });
    }
}

const getTicket= async(req,res)=>{
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Ticket ID is required",
            });
        }

        const query = 'SELECT * FROM tickets WHERE Id = ?';
        const [rows] = await db.execute(query, [id]);

        if (rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "Ticket not found",
            });
        }

        res.status(200).send({
            success: true,
            data: rows[0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Getting ticket API",
            error,
        });
    }
}

const updateTicket =async(req,res)=>{
    try {
        const { id } = req.params;
        const { UserId, EventId, Type, Price, DateTime, Status } = req.body;

        if (!UserId || !EventId || !Type || !Price || !DateTime || !Status) {
            return res.status(400).send({
                success: false,
                message: "All fields are required",
            });
        }

        // Parse and format the DateTime value correctly
        const [datePart, timePart] = DateTime.split(' ');
        const [year, month, day] = datePart.split('-');
        const formattedDateTime = `20${year}-${month}-${day} ${timePart}`; // Prepend '20' to year to convert 'YY' to 'YYYY'

        const query = 'UPDATE tickets SET UserId = ?, EventId = ?, Type = ?, Price = ?, DateTime = ?, Status = ? WHERE Id = ?';
        const [result] = await db.execute(query, [
            UserId, EventId, Type, Price, formattedDateTime, Status, id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: "Ticket not found",
            });
        }

        res.send({
            success: true,
            message: "Ticket updated successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Updating ticket API",
            error,
        });
    }
}

module.exports={
    addTicket,
    removeTicket,
    getAllTicket,
    getTicket,
    updateTicket
}
