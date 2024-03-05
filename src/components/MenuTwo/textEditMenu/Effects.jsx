import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Button
} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import { useCanvas } from 'contexts/EditorContext'
import { IoRefreshCircleOutline } from 'react-icons/io5'
import styles from './Menu.module.css'



const Effects = () => {
    const { objects, updateObjects, selectedObject } = useCanvas()
    const [pageState, setPageState] = useState(selectedObject.filters?.filter || 'none')

    console.log(selectedObject)

    const [direction, setDirection] = useState(selectedObject.filters?.direction?.angle || 0)
    const [filterSettings, setFilterSettings] = useState({ ...selectedObject.filters })


    // =========================================================================
    // FUNCTIONS
    // =========================================================================


    const calculateDirection = (e) => {
        let value = e.value
        let y = Math.sin(value * (Math.PI / 180)) * selectedObject.filters?.offset
        let x = Math.cos(value * (Math.PI / 180)) * selectedObject.filters?.offset

        setDirection(value)
        setFilterSettings({ ...filterSettings, direction: { x: x, y: y, angle: value } })
    }


    const calculateOffset = (e) => {
        let value = e.value
        let y = Math.sin(selectedObject.filters?.direction.angle * (Math.PI / 180)) * value
        let x = Math.cos(selectedObject.filters?.direction.angle * (Math.PI / 180)) * value

        setFilterSettings({
            ...filterSettings,
            direction: {
                x: x,
                y: y,
                angle: filterSettings.direction.angle
            },
            offset: value
        })
    }


    const updateFilters = (effect) => {

        // Switch for specific filters incase there needs to be any processing
        // of the value before the object array update
        if (effect === 'shadow') {
            var setting = {
                direction: {
                    x: 4.5,
                    y: 4.5,
                    angle: 0,
                },
                offset: 5,
                shadowOpacity: 50,
                shadowBlur: 0,
                shadowColor: null,
                filter: 'shadow'
            }
        }

        if (effect === 'lift') {
            setting = {
                direction: {
                    x: 0,
                    y: 0,
                    angle: 0,
                },
                offset: 0,
                shadowOpacity: 0,
                shadowColor: '#000000',
                shadowBlur: 15,
                filter: 'lift'
            }
        }

        if (effect === 'neon') {
            setting = {
                direction: {
                    x: 0,
                    y: 0,
                    angle: 0,
                },
                offset: 0,
                shadowOpacity: 0,
                shadowBlur: 15,
                shadowColor: '#FF5A59',
                filter: 'neon',
            }
        }

        if (effect === 'none') {
            setting = {
                direction: {
                    x: 0,
                    y: 0,
                    angle: 0,
                },
                offset: 0,
                shadowOpacity: 0,
                shadowBlur: 0,
                shadowColor: "#000000",
                filter: 'none'
            }
        }


        // Filter through object and update the selected Object
        let update = objects.map(object => {
            if (object.id != selectedObject.id) return object

            return {
                ...object,
                filters: setting
            }
        })

        // Make the update
        updateObjects(update)
        setPageState(effect)
    }

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => {
        updateObjects(objects.map(entry => {
            if (entry.id != selectedObject.id) return entry
            else return {
                ...entry,
                filters: filterSettings
            }
        }))
    }, [filterSettings])

    return (
        <div className={styles.container}>

            {/*  ===================== EFFECT SELECTOR =====================*/}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                <Button onClick={() => updateFilters('shadow')}>Shadow</Button>
                <Button onClick={() => updateFilters('lift')}>Lift</Button>
                <Button onClick={() => updateFilters('neon')}>Neon</Button>
                <Button onClick={() => updateFilters('none')}>None</Button>
            </div>

            <div>
                {pageState === 'shadow' &&
                    <div className={styles.sliderContainer}>
                        <p>Offset</p>
                        <div className={styles.slider}>
                            <Slider
                                value={selectedObject?.filters?.offset}
                                onChange={calculateOffset}
                                aria-label="image-brightness-slider"
                                max={100}
                                min={0}
                            >
                                <SliderTrack >
                                    <SliderFilledTrack bg="#666" />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                            {/* <IoRefreshCircleOutline
                                onClick={() => updateFilters('brightness', 0)}
                            /> */}
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default Effects


