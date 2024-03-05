import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
} from "@chakra-ui/react"
import { useCanvas } from 'contexts/EditorContext'
import styles from './Menu.module.css'



const Filter = () => {
    return (
        <div className={styles.container}>
            <div className={styles.filterContainer}>
                <FilterEntry type="GrayScale" />
                <FilterEntry type="Sepia" />
                <FilterEntry type="B/W" />
            </div>
        </div>
    )
}

const FilterEntry = ({ type }) => {
    return (
        <div className={styles.filterEntryContainer}>
            <div style={{ background: 'lightgrey', width: 100, height: 100, borderRadius: '4px' }}>
            </div>
            <p>{type}</p>
        </div>
    )
}

export default Filter


