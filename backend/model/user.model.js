const e = require("express");
const pool = require("../config/database");
module.exports = {
  // First Fn is Create; Other functions instances goes into this object
  createUser: (payload, cb) => {
    // accepts payload & cb; cb accepts error or result of the create action/ query
    pool.query(
      `
        insert into students(first_name, last_name,phone,password,username,gender,email)
                values(?,?,?,?,?,?,?)
        `,
      [
        payload.first_name,
        payload.last_name,
        payload.phone,
        payload.password,
        payload.username,
        payload.gender,
        payload.email,
      ],
      (error, result, fields) => {
        if (error) cb(error);
        return cb(null, result);
      }
    );
  },
  getUsers: (cb) => {
    pool.query(
      `
    select id,first_name,last_name,username,email,gender,phone from students
    `,
      [],
      (error, result, fields) => {
        if (error) cb(error);
        return cb(null, result);
      }
    );
  },
  getUserById: (id, cb) => {
    pool.query(
      `select id,first_name,last_name,username,email,gender,phone from students where id=?`,
      [id],
      (error, result) => {
        if (error) cb(error);
        return cb(null, result[0]);
      }
    );
  },
  updateUser: (payload, cb) => {
    pool.query(
      `update students set first_name=? last_name=? username=? email=? password=? gender=? phone=?`,
      [
        payload.first_name,
        payload.last_name,
        payload.username,
        payload.gender,
        payload.phone,
        payload.email,
        payload.password,
      ],
      (error, result, fields) => {
        if (error) cb(error);
        return cb(null, result);
      }
    );
  },
  deleteUser: (id, cb) => {
    pool.query(`delete from students where id=?`, [id], (error, result) => {
      if (error) cb(error);
      return cb(null, result);
    });
  },
  findUserByEmail: (email, cb) => {
    pool.query(
      `select password,id from students where email =?`,
      [email],
      (error, result) => {
        if (error) cb(error);
        return cb(null, result[0]);
      }
    );
  },
};
