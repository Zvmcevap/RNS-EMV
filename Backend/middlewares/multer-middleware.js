const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dest = "uploads";
        if (req.baseUrl.includes("courses")) {
            dest = "uploads/courses";
        }else if (req.baseUrl.includes("users") || req.baseUrl.includes("auth")) {
            dest = "uploads/users";
        }else if (req.baseUrl.includes("employees")) {
            dest = "uploads/employees";
        }
        try {
            fs.mkdirSync(dest, { recursive: true });
            cb(null, dest);
        } catch (error) {
            cb(error);
        } 
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split("/")[1];
        let fileName = `file-${Date.now()}.${extension}`;

        if (req.baseUrl.includes("courses")) {
            fileName = `course-${Date.now()}.${extension}`;
        } else if (req.baseUrl.includes("users") || req.baseUrl.includes("auth")) {
            fileName = `user-${Date.now()}.${extension}`;
        } else if (req.baseUrl.includes("employees")) {
            fileName = `employee-${Date.now()}.${extension}`;
        }
        cb(null, fileName);
    },
});
const fileFilter = (req, file, cb) => {
    const fileType = file.mimetype.split("/")[0];
    if (fileType === "image") {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};
const upload = multer({storage, fileFilter});
module.exports = upload;