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
const promise_1 = __importDefault(require("mysql2/promise"));
// Configuración del pool de conexiones
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tiendadb',
    connectionLimit: 10, // Límite de conexiones simultáneas en el pool
    queueLimit: 0 // Número de conexiones en espera (0 significa sin límite)
};
// Crear el pool de conexiones
const pool = promise_1.default.createPool(dbConfig);
// Función para obtener una conexión desde el pool
function getConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield pool.getConnection();
            console.log('Conexión obtenida del pool');
            return connection;
        }
        catch (err) {
            console.error('Error al obtener conexión del pool: ', err);
            throw err;
        }
    });
}
exports.default = getConnection;
