"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 10101;
app.use(express_1.default.json());
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
app.get("/productos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, config_1.default)();
        const [rows] = yield connection.query('SELECT * FROM productos');
        connection.release();
        res.json(rows);
    }
    catch (e) {
        console.error('Error al obtener los productos: ', e);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
}));
// // INSERT
app.post("/insetar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombres, descripcion, precio, cantidad, imagen } = req.body;
    const insertQuery = 'INSERT INTO productos (nombre, descripcion, precio,cantidad,imagen) VALUES (?, ?, ?, ?, ?)';
    const insertValues = [nombres, descripcion, precio, cantidad, imagen];
    try {
        const connection = yield (0, config_1.default)();
        yield connection.query(insertQuery, insertValues);
        connection.release();
        res.status(200).json({
            Status: "Producto agregado",
            Nombres: nombres,
        });
    }
    catch (error) {
        console.error('Error al insertar producto: ', error);
        res.status(500).json({ message: 'Error al insertar el producto' });
    }
}));
//   // UPDATE
app.put("/actualizar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombres, descripcion, precio, cantidad, imagen } = req.body;
    const updateQuery = 'UPDATE productos SET descripcion = ?, precio = ?, cantidad = ? , imagen = ?  WHERE nombre = ?';
    const updateValues = [descripcion, precio, cantidad, imagen, nombres];
    try {
        const connection = yield (0, config_1.default)();
        const [result] = yield connection.query(updateQuery, updateValues);
        connection.release();
        const affectedRows = result.affectedRows;
        if (affectedRows > 0) {
            // Si se actualizó, responder con un mensaje de éxito
            res.status(200).json({
                Status: "Producto actualizado",
                Nombres: nombres
            });
        }
        else {
            // Si no se actualizó ninguna fila (producto no encontrado)
            res.status(404).json({
                Status: "Producto no encontrado",
                Nombres: nombres
            });
        }
    }
    catch (error) {
        console.error('Error al actualizar producto: ', error);
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
}));
// // // DELETE
app.delete("/eliminar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombres } = req.body;
    const deleteQuery = 'DELETE FROM productos WHERE nombre = ?';
    const deleteValues = [nombres];
    try {
        const connection = yield (0, config_1.default)();
        yield connection.query(deleteQuery, deleteValues);
        connection.release();
        res.status(200).json({
            "Status": "producto eliminado",
            nombres: nombres
        });
    }
    catch (error) {
        console.error('Error al eliminar producto: ', error);
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
}));
