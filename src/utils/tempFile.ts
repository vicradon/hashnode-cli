interface FileOptions {
  name?: string;
  data?: string;
  encoding?: string;
}
export default function tempFile({
  name = "temp_file",
  data = "<!--Type in markdown the content of your post here-->\n\n",
  encoding = "utf8",
}: FileOptions) {
  const fs = require("fs");
  const os = require("os");
  const path = require("path");

  return new Promise((resolve, reject) => {
    const tempPath = path.join(os.tmpdir(), "hashnode-posts");

    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath);
    }

    const file_name = path.join(tempPath, `${name}.md`);

    fs.appendFile(file_name, data, encoding, (error: object) => {
      if (error) return reject(error);

      resolve(file_name);
    });
  });
}
