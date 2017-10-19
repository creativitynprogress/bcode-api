const mongoose = require('mongoose')
const Schema = mongoose.Schema

const supplieSchema = new Schema({
    name: {
        type: String
    },
    category: {
        type: String,
        enum: ['Frutas', 'Verduras', 'Aderezos', 'Aceites', 'Salsas', 'Bebidas alcoholicas', 'Bebidas no alcoholicas', 'Legumbres', 'Carnes', 'Aves de corral', 'Pescado', 'Frutos secos y semillas',
            'Huevos', 'Granos enteros', 'Granos complejos', 'Pastas', 'Productos lácteos', "Insumos cocina", "Insumos baño", "Insumos limpieza", "Insumos de oficina", "Insumos comensales",
            'Embutidos', 'Especias', 'Extras', 'Mariscos', 'Cereales', 'Insumos Barra', 'Panadería', 'Enlatados'
        ]
    },
    quantity: {
        type: Number,
        default: 0
    },
    quantityAlert: {
        type: Number
    },
    unit: {
        type: String,
        enum: ['g', 'kg', 'ton', 'lb', 'ml', 'l', 'ga', 'oz', 'pza']
    },
    daysToBuy: {
        type: String,
        enum: ['N/A', 'Diario', 'Semanal', 'Quincenal', 'Mensual', 'Bimestral', 'Trimestral']
    },
    storage: {
        type: Schema.Types.ObjectId,
        ref: 'Storage'
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    value : {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Supplie', supplieSchema)
