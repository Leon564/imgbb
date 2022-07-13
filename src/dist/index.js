const uploadImage = require("./uploadImage");
class upload {
  constructor(image) {
    this.image = image;
  }
  setImage(image) {
    this.image = image;
    return this;
  }
  setApiKey(apiKey) {
    this.apiKey = apiKey;
    return this;
  }
  setName(name) {
    this.name = name;
    return this;
  }
  setExpiration(expiration) {
    this.expiration = expiration;
    return this;
    }

  upload() {
    if(!this.image) throw new Error("Image is required");
    if(!this.apiKey) throw new Error("API key is required");
    return uploadImage({image: this.image, apiKey: this.apiKey, name: this.name, expiration: this.expiration});
  }
}
module.exports = upload;