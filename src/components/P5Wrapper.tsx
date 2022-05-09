import { useCallback, useEffect, useRef, useState } from 'react'
import { P5Instance } from 'react-p5-wrapper'
import { MediaElement as P5MediaElement } from 'p5'

import quotes from './quotes'

const P5Wrapper = () => {
    const [videoWidth, setVideoWidth] = useState(120)
    const [videoHeight, setVideoHeight] = useState(45)
    const [outputWidth, setOutputWidth] = useState(720)
    const [outputHeight, setOutputHeight] = useState(480)
    const videoRef = useRef<P5MediaElement>()

    const setupSketch = useCallback(
        (): Function => {
            let startIndex = 0
            let w = outputWidth / videoWidth
            let h = outputHeight / videoHeight

            const sketch = (p5: P5Instance) => {
                p5.setup = () => {
                    const video: P5MediaElement = p5.createCapture(p5.VIDEO)
                    videoRef.current = video

                    video.size(videoWidth, videoHeight)
                    video.hide()

                    p5.createCanvas(outputWidth, outputHeight)
                }

                p5.draw = () => {
                    let charIndex = startIndex
                    const video = videoRef.current
                    p5.background(0)
                    p5.frameRate(8);
                    video.loadPixels()

                    for (let i = 0; i < videoWidth; i++) {
                        for (let j = videoHeight; j > 0; j--) {
                            const pixelIndex = (i + j * videoWidth) * 4
                            const [r, g, b] = [
                                video.pixels[pixelIndex + 0],
                                video.pixels[pixelIndex + 1],
                                video.pixels[pixelIndex + 2]
                            ]
                            const avg = (r + g + b) / 3;
                            const char = quotes.charAt(charIndex % quotes.length)

                            p5.noStroke()
                            p5.fill(0, avg * 0.8, 0)
                            p5.textSize(w * 1.2)
                            p5.textAlign(p5.CENTER, p5.CENTER);

                            p5.text(
                                char,
                                i * w + w * 0.5,
                                j * h + h * 0.5,
                            )
                            charIndex++
                        }
                    }
                    startIndex++
                }
            }

            return sketch
        }, []
    )
    const wrapperRef = useRef()
    useEffect(() => {
        const setupWrapper = async () => {
            const { ReactP5Wrapper } = await import('react-p5-wrapper')
            wrapperRef.current = ReactP5Wrapper
        }
        setupWrapper()
    }, [])

    console.log('rendering wrapper', wrapperRef.current)

    // TODO: group status flags
    return wrapperRef.current ? <wrapperRef.current sketch={setupSketch()} /> : <></>
}


export default P5Wrapper