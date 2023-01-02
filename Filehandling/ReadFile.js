//read data from file
import FileSaver from "file-saver";
import fs from "fs";

// fs.readFile(
//   "./Release Deed- Hitesh Jain- Rajesh Joshi- Kandivali Document.docx",
//   "utf8",
//   (error, data) => {
//     if (error) {
//       console.log(error);
//       return;
//     }
//     // fs.writeFile("./sample.docx", data, (error) => {
//     //   console.log(error);
//     // });
//     console.log(data);
//   }
// );

import WordExtractor from "word-extractor";
const extractor = new WordExtractor();

// import * as fs from "fs";
import pkg from "docx";
const { Document, Packer, Paragraph, TextRun } = pkg;

const extracted = extractor.extract(
  "./Release Deed- Hitesh Jain- Rajesh Joshi- Kandivali Document.docx"
);

extracted.then(function (doc) {
  // console.log(doc.getBody().toUpperCase());

  // fs.writeFileSync("./sample.docx", doc.getBody().fontcolor("red"), (error) => {
  //   console.log(error);
  // });

  converter(doc);
});

function converter(doc) {
  const docu = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: doc.getBody(),
                // bold: true,
                allCaps: true,
                font: "Algerian",
                size: 20,
              }),
            ],
          }),
        ],
      },
    ],
  });

  // Used to export the file into a .docx file
  Packer.toBuffer(docu).then((buffer) => {
    fs.writeFileSync("sample.docx", buffer);
  });
}

console.log("success");
