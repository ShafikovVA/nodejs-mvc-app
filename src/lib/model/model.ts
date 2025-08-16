import pool from "../db/db-connection";
import { IModel, IModelConfig } from "./types";

const createModel = <ModelInstance>(data: IModelConfig<ModelInstance>) => {
    const { table, identify } = data;

    const model: IModel<ModelInstance, typeof identify> = {
        getAll: async () => {
            const query = `SELECT * FROM ${table}`;
            const result = await pool.query(query);

            return result.rows;
        },
        addOne: async (data) => {
            const keys = Object.keys(data);
            const values = Object.values(data);
            const placeholders = keys.map((_, i) => `$${i + 1}`).join(',');

            const query = `INSERT INTO ${table} (${keys}) VALUES (${placeholders}) RETURNING *`;
            const result = await pool.query(query, values);

            return result.rows[0];
        },
        deleteOne: async (id) => {
            const result = await pool.query(`DELETE FROM ${table} WHERE ${String(identify)} = $1 RETURNING *`, [id]);
            return result.rows[0];
        },
        updateOne: async (data) => {
            if (typeof data !== 'object' || !data) {
                throw new Error('Invalid data');
            }

            const keys = Object.keys(data) as (keyof ModelInstance)[];

            if (!data[identify]) {
                throw new Error('No identify field in data');
            }
            const idValue = data[identify];

            const updateKeys = keys.filter((key) => key !== identify);
            const updateValues = updateKeys.map((key) => data[key]);
            const setClause = updateKeys.map((key, i) => `${String(key)} = $${i + 1}`).join(', ');
            const query = `UPDATE ${table} SET ${setClause} WHERE ${String(identify)} = $${updateKeys.length + 1} RETURNING *`;
            const result = await pool.query(query, [...updateValues, idValue]);
            return result.rows[0];
        },
        patchOne: async (data) => {
            if (typeof data !== 'object' || !data) {
                throw new Error('Invalid data');
            }
            const keys = Object.keys(data) as (keyof ModelInstance)[];
            if (!data[identify]) {
                throw new Error('No identify field in data');
            }
            const idValue = data[identify];
            const updateKeys = keys.filter((key) => key !== identify);
            if (updateKeys.length === 0) {
                throw new Error('No fields to update');
            }
            const updateValues = updateKeys.map((key) => data[key]);
            const setClause = updateKeys.map((key, i) => `${String(key)} = $${i + 1}`).join(', ');
            const query = `UPDATE ${table} SET ${setClause} WHERE ${String(identify)} = $${updateKeys.length + 1} RETURNING *`;
            const result = await pool.query(query, [...updateValues, idValue]);
            return result.rows[0];
        }
    }
    return model
};

export default createModel;