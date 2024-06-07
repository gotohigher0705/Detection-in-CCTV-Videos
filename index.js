const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { exec } = require('child_process');


// ----- VARIABLES -----

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3030;

/**
 * Multer disk storage configuration.
 * @type {import('multer').StorageEngine}
 */
const storageVideo = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    const inputName = req.headers.input
    cb(null, inputName);
  }
});
const uploadVideo = multer({ storage: storageVideo });


// ----- ENDPOINTS -----

/**
 * Serves the static files in the uploads and results directories.
 * 
 * @param {string} 'uploads' - The directory where the uploaded videos are stored.
 * @param {string} 'results' - The directory where the converted videos are stored.
 */
app.use(express.static('uploads'));
app.use(express.static('results'));


/**
 * Handles the POST request for the /codecs endpoint.
 * Executes FFmpeg command to convert the video to the specified codec and returns the video converted along with its quality metrics.
 * 
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
app.post('/codecs', uploadVideo.single('video'), (req, res) => {
  const codec = req.headers.codec;
  const outputName = `${req.file.originalname.split('.')[0]}_${codec}.${req.file.originalname.split('.')[1]}`;
  console.log(`---- CODEC: ${codec}`)

  const ffmpegCommand = `ffmpeg -i ${req.file.path} -c:v ${codec} results/${outputName}`;
  console.log(`-- FFMPEG: ${ffmpegCommand}`)
  exec(ffmpegCommand, (fferror, ffstdout, ffstderr) => {
    if (fferror) {
      console.error('Error:', fferror);
      res.status(500).send('Error:', fferror);
    }
    const response = {
      messagge: 'File converted!',
      sourceVideoPath: req.file.path,
      outputName: outputName,
      codec: codec
    };
    res.status(200).send(response);
  });
});


/**
 * Handles the POST request for the /command endpoint.
 * Executes FFmpeg command to convert the video with the specified command and returns the video converted along with its quality metrics.
 * 
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
app.post('/commands', uploadVideo.single('video'), (req, res) => {
  const command = req.headers.command;
  const outputName = req.headers.output;
  console.log(`---- COMMAND: ${command}`)
  
  const ffmpegCommand = `ffmpeg -i ${req.file.path} ${command} results/${outputName}`;
  console.log(`-- FFMPEG: ${ffmpegCommand}`)
  exec(ffmpegCommand, (fferror, ffstdout, ffstderr) => {
    if (fferror) {
      console.error('Error:', fferror);
      res.status(500).send('Error:', fferror);
    }
    const response = {
      messagge: 'File converted!',
      sourceVideoPath: req.file.path,
      outputName: outputName,
      codec: codec
    };
    res.status(200).send(response);
  });
});


app.post('/metrics', (req, res) => {
  const { outputName, sourceVideoPath } = req.body;

  const qualityMetricsCommand = `ffmpeg-quality-metrics results/${outputName} ${sourceVideoPath} \ -m psnr ssim vmaf`
  console.log(`-- QUALITY METRICS: ${qualityMetricsCommand}`)
  exec(qualityMetricsCommand, (qmError, qmStdout, qmStderr) => {
    if (qmError) {
      console.error('Error:', qmError);
      res.status(500).send('Error:', qmError);
    }

    const fileSizeCommand = `stat -c "%s" results/${outputName}`;
    console.log(`-- FILE SIZE: ${fileSizeCommand}`)
    exec(fileSizeCommand, (fsError, fsStdout, fsStderr) => {
      if (fsError) {
        console.error('Error:', fsError);
        res.status(500).send('Error:', fsError);
      }
      const fileSize = (parseInt(fsStdout) * 0.000001).toFixed(2);

      const response = {
        filename: outputName,
        codec: codec,
        size: fileSize,
        quality_metrics: JSON.parse(qmStdout),
      };    
      res.status(200).send(response);
    });
  });
});


/**
 * Shows the port where the server is running.
 * @param {number} PORT - The port number.
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
