const axios = require("axios");
const formdata = require("form-data");
const {createReadStream,writeFileSync, unlinkSync} = require("fs-extra");
const { tmpdir } = require("os");
const validator = require("validator");
const baseUrl = "https://api.imgbb.com/1/upload?";

const uploadImage = async ({ image, expiration, name, apiKey }) => {
  let img = null;
  const isBuffer=Buffer.isBuffer(image);
  const tmp = `${tmpdir()}/${Date.now()}.image`;
  
  if (isBuffer) {
    writeFileSync(tmp, image);
    img = createReadStream(tmp);    
  } else if (validator.isURL(image)) {
    img = image;
  } else {
    img = createReadStream(image);
  }

  let query = baseUrl;
  if (apiKey) query += `key=${apiKey}&`;
  if (expiration) query += `expiration=${expiration}&`;
  if (name) query += `name=${name}`;

  const form = new formdata();
  form.append("image", img);

  const response = await axios.post(query, form, {
    headers: form.getHeaders(),
  });

  if (isBuffer) unlinkSync(tmp);

  return response.data.data;
};

module.exports = uploadImage;
