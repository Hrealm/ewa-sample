
const gulp = require('gulp');
var del = require('del');
const ossSync = require('gulp-oss-sync');
const fs = require('fs');
require('dotenv').config()

const env = process.env.NODE_ENV || 'development'

let cdnproject = process.env.project || './';
let rawdata = fs.readFileSync(`${cdnproject}/package.json`);
let pkg = JSON.parse(rawdata);
let version = pkg.imgtag.replace(/\./g, '_');
// oss 域名
let ossroot = "https://cdn.com/";
// cdn 目录

let ossdir = `${pkg.name}/${version}`;
if (env == 'development') {
  ossdir = `${pkg.name}/dev`
}
ossroot = ossroot + ossdir

/**
 * cdn 图片
 */
const pushImage = () => {
  const ossConf = {
    connect: {
      "region": process.env.region,
      "accessKeyId": process.env.accessKeyId,
      "accessKeySecret": process.env.accessKeySecret,
      "bucket": process.env.bucket
    },
    controls: {
      "headers": {
        "Cache-Control": "no-cache"
      }
    },
    setting: {
      dir: ossdir, // root directory name
      noClean: false, // compare with the last cache file to decide if the file deletion is need
      force: false, // ignore cache file and force re-upload all the files
      quiet: true // quiet option for oss deleteMulti operation
    }
  };
  const cacheConf = {
    cacheFileName: env == 'development' ? `.oss-cache/dev`: `.oss-cache/test_${version}` // the filename for the cache file
  };
  return gulp.src([`src/images/**/*`])
    .pipe(ossSync(ossConf, cacheConf));
}

gulp.task('pushimage', pushImage)

const clearImageFile = (cb) => {
  del([
    'dist/images/**/*',
    '!dist/images/tabBar',
  ], cb);
  cb();
}

gulp.task('clearImageFile', clearImageFile)

// exports.pushimage = pushImage;