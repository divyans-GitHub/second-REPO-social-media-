const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const sharp = require("sharp");
const rev = require("gulp-rev");
const uglify = require("gulp-uglify");
const del = require("del");
const fs = require("fs");
const path = require("path");

gulp.task("css", function (done) {
  console.log("minifying css......");

  gulp
    .src("./assets/sass/**/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest("./assets.css"));

  gulp
    .src("./assets/**/*.css")
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      }),
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

gulp.task("js", function (done) {
  console.log("miinifying js.........");

  gulp
    .src("./assets/**/*.js")
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      }),
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

gulp.task("images", async function () {
  console.log("compressing image files.......");

  const imageDir = "./assets";
  const destDir = "./public/assets";

  // Ensure destination directory exists
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const imageExtensions = /\.(png|jpg|gif|svg|jpeg)$/i;
  const manifest = {};

  const processDirectory = async (dir, outputDir) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        const newOutputDir = path.join(outputDir, file);
        if (!fs.existsSync(newOutputDir)) {
          fs.mkdirSync(newOutputDir, { recursive: true });
        }
        await processDirectory(filePath, newOutputDir);
      } else if (imageExtensions.test(filePath)) {
        const ext = path.extname(file);
        const basename = path.basename(file, ext);
        const hash = Date.now();
        const newFileName = `${basename}-${hash}${ext}`;
        const outPath = path.join(outputDir, newFileName);

        try {
          if (ext.toLowerCase() === ".svg") {
            // SVG: copy as-is
            fs.copyFileSync(filePath, outPath);
          } else if ([".jpg", ".jpeg"].includes(ext.toLowerCase())) {
            // JPEG: compress
            await sharp(filePath)
              .jpeg({ quality: 80, progressive: true })
              .toFile(outPath);
          } else if (ext.toLowerCase() === ".png") {
            // PNG: compress
            await sharp(filePath).png({ compressionLevel: 9 }).toFile(outPath);
          } else {
            // GIF or other: copy as-is
            fs.copyFileSync(filePath, outPath);
          }
          console.log(`✓ ${filePath} → ${outPath}`);
        } catch (err) {
          console.error(`✗ Error processing ${filePath}:`, err.message);
        }
      }
    }
  };

  await processDirectory(imageDir, destDir);
  console.log("Image compression complete");
});

//empty the public/assets directory
gulp.task("clean:assets", function (done) {
  del.sync("./public/assets");
  done();
});

gulp.task(
  "build",
  gulp.series("clean:assets", "css", "js", "startup", "images"),
  function (done) {
    console.log("Building assets");
    done();
  },
);
