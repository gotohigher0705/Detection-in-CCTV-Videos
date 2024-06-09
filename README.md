# Benchmark FFmpeg - Video processor

> [!NOTE]
> This is one of the 3 repos involved in this project:
> * Video Processor 
> * [Frontend](https://github.com/vjimcor955/benchmark_ffmpeg-frontend)
> * [Backend](https://github.com/vjimcor955/benchmark_ffmpeg-backend)

> [!IMPORTANT]  
> Cloning this repository is required in order to use the application!

* Frontend deploy: https://ffmpegbenchmark.netlify.app/#/

## Requirements

  - [Node.js](https://nodejs.org/)
  - [FFmpeg](https://ffmpeg.org/download.html)
  - [FFmpeg-quality-metrics](https://github.com/slhck/ffmpeg-quality-metrics/tree/master?tab=readme-ov-file#requirements)

## Instalation

### Verify Node.js Installation:

  First, make sure Node.js is installed on your device with the command:
  ```
  node -v
  ``` 
  If it is not installed you can install it from the [official Node.js website](https://nodejs.org/).

### Verify FFmpeg Installation:

  Next, verify that FFmpeg is installed on your device with the command:
  ``` 
  ffmpeg -version
  ```
  If it is not installed you can install it from the [official FFmpeg website](https://ffmpeg.org/download.html) and add the FFmpeg bin directory to the system PATH.

### Verify the installation of ffmpeg-quality-metrics:

  Next, verify that ffmpeg-quality-metrics is installed with the command: 
  ```
  ffmpeg-quality-metrics -version
  ```
  If it is not installed, you can install it by following the installation instructions in [the FFmpeg-quality-metrics repository](https://github.com/slhck/ffmpeg-quality-metrics/tree/master?tab=readme-ov-file#requirements).

### Clone the Project Repository, install the dependencies, and build the server:

  Clone the video processor repository from GitHub. You can clone it either from the IDE or using git clone:
  ```
  git clone https://github.com/vjimcor955/benchmark_ffmpeg-video_processor
  ```

### Install Dependencies:

  Once the repository is cloned, go into the repository directory and run the following command to install the dependencies:
  ```
  npm install
  ```

### Server Upgrade:

  After installing the dependencies, run the server using the following command:
  ```
  node index.js
  ```

  > [!IMPORTANT]  
  > Make sure the server is listening on port 3030, otherwise the frontend will not be able to make the necessary calls to process the videos.

---

Developed by Víctor Jiménez Corada - [GitHub](https://github.com/vjimcor955).
