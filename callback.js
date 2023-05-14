const fs = require('fs');
  
let data = "text file"
  
fs.writeFile("text.txt", data, (err) => {
  if (err)
    console.log(err);
});