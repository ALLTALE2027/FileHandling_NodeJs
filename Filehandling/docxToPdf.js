import { join } from "path";
import { promises as fs } from "fs";

import libre from "libreoffice-convert";
let { convertAsync, convert } = libre;
import util from "util";
convertAsync = util.promisify(convert);

const fileConverter = async () => {
  try {
    const ext = ".pdf";
    const inputPath = join(".", "sample.docx");
    const outputPath = join(".", `sample_${ext}`);

    // Read file
    const docxBuf = await fs.readFile(inputPath);

    // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
    let pdfBuf = await convertAsync(docxBuf, ext, undefined);

    // Here in done you have pdf file which you can save or transfer in another stream
    await fs.writeFile(outputPath, pdfBuf);
  } catch (error) {
    console.log(`Error converting file: ${err}`);
  }
};

fileConverter();
