import db from "../backend/db";

const getError = (error) => {
  return error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message;
};

const onError = async (error, req, res) => {
  await db.connect();
  res.status(500).send({ message: error.toString() });
};
export { getError, onError };
