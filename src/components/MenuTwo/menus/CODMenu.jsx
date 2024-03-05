import { motion } from "framer-motion"
import ImageMenuContainer from 'components/UI/ImageMenuContainer/ImageMenuContainer'
import codJSON from './codJSON.json'
import styles from '../MenuTwo.module.css'


const CODMenu = () => {

    const images = codJSON

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

export default CODMenu 