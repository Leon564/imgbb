# IMGBB

upload images to imgbb


# Content (Examples)

```js
const imgbb = require("./src");
//The input can be a file path, buffer or a url

await result = new imgbb(readFileSync("./image01.png"))
  .setApiKey("YOUR_API_KEY") //https://imgbb.com/
  .setExpiration("600") //time in seconds for the image to be deleted
  .setName("image")
  .upload()

console.log(result.url)
  
```

***