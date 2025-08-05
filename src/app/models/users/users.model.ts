import pool from "../../../lib/db/db-connection";
import { IUser } from "./types/IUser";

export const users = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
}

export const addUser = async (user: Omit<IUser, 'id'>) => {
  const result = await pool.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [user.name]);
  return result.rows[0];
}