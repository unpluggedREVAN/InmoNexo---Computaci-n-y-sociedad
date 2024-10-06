import {pool} from '../db.js'

export const addEvent = async (req, res) => {
    const data = req.body;

    const response = await pool.query('SELECT * FROM Usuarios WHERE id = $1', [data.usuarioid])

    if (response.rows.length == 0){
        return res.status(400).json(["Usuario no encontrado"])
    }

    const {rows} = pool.query('INSERT INTO (nombre, descripcion, fechapublicacion, estado, usuarioid) VALUES ($1, $2, $3) RETURNING *', [data.name, data.details, data.date, data.state, data.usuarioid])
    return res.status(200).json(rows);
}

export const getEvents = async (req, res) => {
    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const existUser = await pool.query('SELECT * FROM Usuarios WHERE id = $1', [req.params.id])

    if(existUser.rows.length == 0){
        return res.status(404).json(["No existe el usuario"])
    }

    const response = await pool.query('SELECT * FROM Eventos WHERE usuarioId = $1', [req.params.id])

    return res.status(200).json(response.rows)
}

export const editEvent = async (req, res) => {
    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)
    const data = req.body;

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const result = await pool.query('UPDATE Eventos SET nombre = $1, descripcion = $2, estado = $3 WHERE id = $4 RETURNING *', [data.name, data.details, data.state, req.params.id]);
    return res.status(200).json(result.rows);
}

export const deleteEvent = async (req, res) => {
    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

}