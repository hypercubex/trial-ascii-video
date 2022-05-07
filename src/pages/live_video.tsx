import { useEffect, useRef, useState } from "react"
import { Button } from "@mui/material"
import Link from "next/link"
import { NextPage } from "next/types"
import { P5Instance } from "react-p5-wrapper"
import { Element as P5Element } from "p5"

// import '../styles/videoCapture.module.css'
import quotes from '../../public/quotes.txt'


const sketch = (p5: P5Instance) => {
    let videoCapture: P5Element

    // let outputDiv = null
    const width = 600
    const height = 480
    let startIndex = 0

    p5.setup = () => {
        // p5.noCanvas()
        videoCapture = p5.createCapture(p5.VIDEO)
        videoCapture.size(60, 60)
        p5.createCanvas(width, height)

        videoCapture.hide()

        // outputDiv = p5.createDiv()
        // outputDiv.addClass('ascii-output')
    }

    p5.draw = () => {
        let charIndex = startIndex;
        let w = width / videoCapture.width;
        let h = height / videoCapture.height;
        // let output = ''

        p5.background(0)
        p5.frameRate(12);
        videoCapture.loadPixels()

        for (let i = 0; i < videoCapture.width; i++) {
            for (let j = 0; j < videoCapture.height; j++) {

                const pixelIndex = (i + j * videoCapture.width) * 4
                const r = videoCapture.pixels[pixelIndex + 0];
                const g = videoCapture.pixels[pixelIndex + 1];
                const b = videoCapture.pixels[pixelIndex + 2];
                const avg = (r + g + b) / 3;

                p5.noStroke()
                p5.fill(avg);
                p5.textSize(w * 1.2);
                p5.textAlign(p5.CENTER, p5.CENTER);

                p5.text(quotes.charAt(charIndex % quotes.length), i * w + w * 0.5, j * h + h * 0.5);
                charIndex++;
            }
            // output += '<br/>'
            // outputDiv.html(`<pre>${output}</pre>`)
            startIndex++
        }
    }
}

const LiveVideoPage: NextPage = () => {
    const [isReady, setIsReady] = useState(false)
    // useref to avoid rerender that might replace the wrapper
    const P5Wrapper = useRef(({ sketch }: { sketch: Function }) => <></>)

    useEffect(() => {
        const { ReactP5Wrapper } = require('react-p5-wrapper')
        P5Wrapper.current = ReactP5Wrapper
        setIsReady(true)
    }, [])

    return (
        <>
            <div>Video Here</div>
            {isReady &&
                <P5Wrapper.current sketch={sketch} />
            }
            <Link href="/">
                <Button data-testid="video-page-home-link">Back to homepage</Button>
            </Link>
        </>
    )
}

export default LiveVideoPage