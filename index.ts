
import express, { Request, Response } from "express";
import getConnection from "./config";

const app = express()
const PORT = process.env.PORT || 10101;
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});


app.get("/productos", async (req: Request, res: Response) => {
  try {
    const connection = await getConnection();

    const [rows] = await connection.query('SELECT * FROM productos');

    connection.release();

    res.json(rows);
  } catch (e) {
    console.error('Error al obtener los productos: ', e);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});


// // INSERT
app.post("/insetar", async (req: Request, res: Response) => {

  const { nombres, descripcion, precio, cantidad, imagen } = req.body
  const insertQuery = 'INSERT INTO productos (nombre, descripcion, precio,cantidad,imagen) VALUES (?, ?, ?, ?, ?)';
  const insertValues = [nombres, descripcion, precio, cantidad, imagen];

  try {
    const connection = await getConnection();

    await connection.query(insertQuery, insertValues);

    connection.release();

    res.status(200).json({
      Status: "Producto agregado",
      Nombres: nombres,
    });

  } catch (error) {
    console.error('Error al insertar producto: ', error);
    res.status(500).json({ message: 'Error al insertar el producto' });
  }
});


//   // UPDATE
app.put("/actualizar",async(req: Request, res: Response) => {

  const {nombres, descripcion, precio,cantidad,imagen} = req.body
  const updateQuery = 'UPDATE productos SET descripcion = ?, precio = ?, cantidad = ? , imagen = ?  WHERE nombre = ?';
  const updateValues = [descripcion, precio, cantidad , imagen , nombres];

  try {
    const connection = await getConnection();

    const [result] = await connection.query(updateQuery, updateValues);
    connection.release();

    const affectedRows = (result as any).affectedRows;

    if (affectedRows > 0) {
      // Si se actualizó, responder con un mensaje de éxito
      res.status(200).json({
        Status: "Producto actualizado",
        Nombres: nombres
      });
    } else {
      // Si no se actualizó ninguna fila (producto no encontrado)
      res.status(404).json({
        Status: "Producto no encontrado",
        Nombres: nombres
      });
    }

  } catch (error) {
    console.error('Error al actualizar producto: ', error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
    
  }
});


// // // DELETE
app.delete("/eliminar",async(req: Request, res: Response) => {

  const {nombres} = req.body

  const deleteQuery = 'DELETE FROM productos WHERE nombre = ?';
  const deleteValues = [nombres];

  try {
    
    const connection = await getConnection();
    await connection.query(deleteQuery, deleteValues);
    connection.release();

    res.status(200).json({
      "Status": "producto eliminado",
      nombres: nombres
    });

  } catch (error) {
    console.error('Error al eliminar producto: ', error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
    
  }
});