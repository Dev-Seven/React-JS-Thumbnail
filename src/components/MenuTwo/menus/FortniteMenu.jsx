import { motion } from "framer-motion"
import ImageMenuContainer from 'components/UI/ImageMenuContainer/ImageMenuContainer'
import FortniteJSON from './forniteJSON.json'
import styles from '../MenuTwo.module.css'


const FortniteMenu = () => {
    const images = FortniteJSON

    // Animation Variant
    const variants = {
        hidden: { opacity: 0, marginTop: 25 },
        visible: { opacity: 1, marginTop: 0 },
    }

    // Render
    return (
        <motion.div initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.4, type: "tween", ease: "easeInOut" }}
            className={styles.elementMenu}
        >
            {images.map(image => <ImageMenuContainer key={image.code} image={image} />)}
        </motion.div>
    )
}

export default FortniteMenu 