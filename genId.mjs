const data1 = require("./data.json");
const data2 = require("./new.json");
const data3 = require("./new3.json");
const data4 = require("./new4.json");
const data5 = require("./new5.json");
const data6 = require("./new6.json");
const data7 = require("./new7.json");
const data8 = require("./new8.json");
const data9 = require("./new9.json");
const data10 = require("./new10.json");
const data11 = require("./new11.json");
const data12 = require("./new12.json");
const data13 = require("./new13.json");
const data14 = require("./new14.json");
const data15 = require("./new15.json");
const data16 = require("./new16.json");
const data17 = require("./new17.json");
const data18 = require("./new18.json");
const data19 = require("./new19.json");
const data20 = require("./new20.json");
const data21 = require("./new21.json");
const data22 = require("./new22.json");
const data23 = require("./new23.json");
const data24 = require("./new24.json");
const gifs = require("./gifs.json");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const dataX = [
  { data: data1 },
  { data: data2 },
  { data: data4 },
  { data: data3 },
  { data: data5 },
  { data: data6 },
  { data: data7 },
  { data: data8 },
  { data: data9 },
  { data: data10 },
  { data: data11 },
  { data: data12 },
  { data: data13 },
  { data: data14 },
  { data: data15 },
  { data: data16 },
  { data: data17 },
  { data: data18 },
  { data: data19 },
  { data: data20 },
  { data: data21 },
  { data: data22 },
  { data: data23 },
  { data: data24 },
  { data: gifs, type: "gifs", name: "gifs" },
  // { data: gifs, name: "gifs" },
];

// Function to add unique IDs to objects in the arrays
function addUniqueIds(data, index) {
  fs.writeFile(
    `../../images/data${index}.json`,
    JSON.stringify(
      data.map((item) => ({ ...item, id: uuidv4() })),
      null,
      2
    )
  );
}

// Apply the addUniqueIds function to each JSON file
dataX.forEach((d, index) => addUniqueIds(d.data, index));
// const newData1 = addUniqueIds(data1);
// const newData2 = addUniqueIds(data2);
// ... process other JSON files ...

// Export the new data
// export { newData1, newData2 /* ... */ };
