const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const path = require("path");
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegStatic);

const fontPath = path.join(__dirname, 'fonts', 'OpenSans-Regular.ttf');

exports.createOutroLayer = (data) => {
    const {callToAction, customCallToAction} = data;
    return new Promise((resolve, reject) => {
        let layerText = callToAction || customCallToAction || 'Test';
        const outputDir = path.join(__dirname, '..', 'output-outro');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, {recursive: true});
        }

        ffmpeg()
            .input('color=c=black:s=720x1280:d=20')
            .inputOptions(['-f', 'lavfi'])
            .complexFilter([
                {
                    filter: 'drawtext',
                    options: {
                        fontfile: fontPath,
                        text: layerText || 'Your title',
                        fontsize: 32,
                        fontcolor: '#FF00F2',
                        x: '(w-text_w)/2',
                        y: '(h-text_h)/2',
                        alpha: 'if(lt(t,4),1,if(lt(t,5),(4-(t-4)),0))'
                    },
                    outputs: 'text'
                },
                {
                    filter: 'format',
                    options: 'yuva420p',
                    inputs: 'text'
                }
            ])
            .outputOptions([
                '-c:v', 'libvpx-vp9',
                '-auto-alt-ref', '0',
                '-metadata:s:v:0', 'alpha_mode="1"'
            ])
            .on('end', () => resolve())
            .on('error', (err) => reject(err))
            .save(`${outputDir}/outro.webm`);
    });
};