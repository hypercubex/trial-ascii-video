import { useCallback, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import Link from 'next/link'
import { NextPage } from 'next/types'
import { Box } from '@mui/system'

import P5Wrapper from '../components/P5Wrapper'
import styles from '../styles/VideoCapture.module.css'

const LiveVideoPage: NextPage = () => {
    const [isReady, setIsReady] = useState(false)
    const toggleVideoCapture = useCallback(() => {
        console.log(`set isReady:${isReady}`)
        setIsReady(!isReady)
    }, [isReady])

    useEffect(() => {
        setIsReady(true)
    }, [])

    return (
        <Box id={styles.videoPage}>
            <Button data-testid='video-page-btn-toggle-camera' onClick={toggleVideoCapture}>Toggle Camera</Button>
            <P5Wrapper />
            <Box>
                <Link href='/'>
                    <Button data-testid='video-page-home-link'>Back to homepage</Button>
                </Link>
            </Box>
        </Box>
    )
}

export default LiveVideoPage