import { useCanvas } from 'contexts/EditorContext'
import styles from './ImageMenuContainer.module.css'

// =============================================================================
// IMAGE CONTAINER
// =============================================================================
const ImageContainer = ({ image }) => {
    const { setDragURL } = useCanvas()


    const handleDragStart = () => {
        setDragURL(image.url)
    }

    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <img src={image.url} onDragStart={handleDragStart} />
            </div>
            {/* <p>{image.label}</p> */}
        </div>
    )
}

export default ImageContainer
