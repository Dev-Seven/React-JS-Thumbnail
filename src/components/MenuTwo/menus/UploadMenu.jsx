import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { Button } from '@chakra-ui/react'
import ImageMenuContainer from 'components/UI/ImageMenuContainer/ImageMenuContainer'
import Upload from 'rc-upload'
import styles from '../MenuTwo.module.css'
import { useCanvas } from 'contexts/EditorContext'


const UploadMenu = () => {
    const { userUploads, setUserUploads } = useCanvas()


    const [file, setFile] = useState(null)
    const [fileObject, setFileObject] = useState(null)

    // Animation Variant
    const variants = {
        hidden: { opacity: 0, marginTop: 25 },
        visible: { opacity: 1, marginTop: 0 },
    }

    // =========================================================================
    // FUNCTIONS
    // =========================================================================
    const uploadImage = () => {
        if (!file) return

        let payload = {
            code: file.name,
            url: URL.createObjectURL(file)
        }
        setUserUploads([...userUploads, payload])
    }


    // Render
    return (
        <motion.div initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.4, type: "tween", ease: "easeInOut" }}
            style={{ height: '100%' }}
        >
            <div className={styles.container}>
                <div style={{ width: '100%', padding: '1em 0', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <h1 className="text-xl font-bold self-start pl-4">Upload Image</h1>
                    <Upload
                        type='drag'
                        beforeUpload={file => setFile(file)}
                        multiple={false}
                        style={{
                            width: '100%',
                            padding: '1em',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div className={styles.imageDragContainer}>
                            {
                                !file &&
                                <p style={{ textAlign: 'center', fontSize: '.9rem' }}>Click or Drag to Upload</p>
                            }
                            {
                                file &&
                                <p style={{ textAlign: 'center', fontSize: '.9rem' }}>{file.name}</p>
                            }
                        </div>
                    </Upload>

                    <Button onClick={uploadImage}>Upload</Button>


                </div>


                <div className="p-4">
                    <h1 className="text-xl mt-4 font-bold">User Images</h1>
                    <div className="grid grid-cols-2 gap-4 ">
                        {
                            userUploads.map(upload => <ImageMenuContainer key={upload.code} image={upload} />)
                        }
                    </div>
                </div>

            </div>
        </motion.div>
    )
}

export default UploadMenu