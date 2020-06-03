module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "postgres",
  database: "storage",
  define: {
    timestamps: true, //define created_at and updated_at
    underscored: true, //change to snak_case
  }
}