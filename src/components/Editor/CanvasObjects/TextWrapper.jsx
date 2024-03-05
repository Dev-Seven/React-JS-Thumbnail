import React, { useState, useEffect } from 'react'
import { Text, Transformer } from 'react-konva';
import ContentEditable from 'react-contenteditable'
import LocalDOMWrapper from './LocalDOMWrapper'
import DOMWrapper from './DOMWrapper'
import Mousetrap from 'mousetrap'
import { ContextMenu } from 'primereact/contextmenu';
import { GiVerticalFlip, GiHorizontalFlip } from 'react-icons/gi'
import { FaRegTrashAlt } from 'react-icons/fa'
import { MdFlipToFront, MdFlipToBack } from 'react-icons/md'

// =============================================================================
// MAIN
// =============================================================================
const TextWrapper = ({ object, objects, updateObjects, isSelected, setSelectedObject, isDoubleClicked, setDoubleClicked, setCopyObject, index }) => {

    const [hover, setHover] = useState(false)
    const [contextMenuCoord, setContextMenuCoord] = React.useState({ x: 0, y: 0 })
    const shapeRef = React.useRef();
    const trRef = React.useRef();
    const contextRef = React.useRef()
    const textBoxRef = React.useRef();
    const MIN_WIDTH = 20;

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => {
        if (hover || isSelected || isDoubleClicked) {
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer().batchDraw();
        }
    })

    // =========================================================================
    // KEYBOARD SHORTCUT BINDINGS
    // =========================================================================
    Mousetrap.bind(['command+c', 'ctrl+c'], () => {
        if (!isSelected) return
        setCopyObject(object)
    });

    Mousetrap.bind(['enter'], () => {
        if (!isSelected) return
        setSelectedObject({})
        setDoubleClicked(null)
    });

    Mousetrap.bind(['del', 'command+backspace'], () => {
        if (!isSelected) return
        handleTextDelete()
    });


    // =========================================================================
    // FUNCTIONS
    // =========================================================================
    const handleTransformEnd = () => { }

    // Handle the Click
    const handleClick = (e) => {
        if (isSelected) {
            console.log(object)
            setDoubleClicked(object.id)
            setSelectedObject(null)
            setHover(false)
            textBoxRef.current.focus()
        }
        else {
            setSelectedObject(object)
        }
    }

    // Handle Resizing of the Transformer
    const handleResize = (size) => {
        let update = objects.map(entry => {
            // return a copy of every element that is not the
            // selected element
            if (entry.id !== object.id) return entry

            // return modified copy of entry
            else {
                return {
                    ...entry,
                    settings: {
                        ...entry.settings,
                        scaleX: 1,
                        scaleY: 1,
                        width: Math.max(size * entry.settings.scaleX, MIN_WIDTH)
                    }
                }
            }
        })
        updateObjects(update)
    }

    const handlePositionUpdate = (e) => {
        let update = objects.map(entry => {
            // return a copy of every element that is not the
            // selected element
            if (entry.id !== object.id) return entry

            // return modified copy of entry
            else {
                return {
                    ...entry,
                    settings: {
                        ...entry.settings,
                        x: e.target.attrs.x,
                        y: e.target.attrs.y
                    }
                }
            }
        })
        updateObjects(update)
    }

    // Handle input for the text input
    const handleTextboxInputChange = (e) => {

        let update = objects.map(entry => {
            // return a copy of every element that is not the
            // selected element
            if (entry.id !== object.id) return entry

            // return modified copy of entry
            else {
                return {
                    ...entry,
                    settings: {
                        ...entry.settings,
                        text: e.target.value
                    }
                }
            }
        })
        updateObjects(update)
    }

    const handleTextDelete = () => {
        let update = objects.filter(entry => entry.id != object.id)
        updateObjects(update)
    }

    // =========================================================================
    // CONTEXT FUNCTIONS
    // =========================================================================
    const handleContext = (e) => {
        setContextMenuCoord({
            x: e.evt.clientX,
            y: e.evt.clientY
        })
        contextRef.current.show(e.evt)
    }

    const handleMoveBackwards = () => {
        if (index === 0) return
        let update = [...objects]

        let temp = update[index];
        update[index] = update[index - 1];
        update[index - 1] = temp;

        updateObjects(update)
    }

    const handleMoveForwards = () => {
        if (index === objects.length - 1) return

        let update = [...objects]

        let temp = update[index];
        update[index] = update[index + 1];
        update[index + 1] = temp;

        updateObjects(update)
    }

    // =========================================================================
    // CONTEXT MENU
    // =========================================================================
    const items = [
        {
            label: <div className="entry"><MdFlipToBack />Move Back</div>,
            className: 'rotate-90-icon',
            command: handleMoveBackwards
        },
        {
            label: <div className="entry"><MdFlipToFront />Move Forward</div>,
            className: 'rotate-90-icon',
            command: handleMoveForwards
        },
        {
            label: <div className="entry"><FaRegTrashAlt />Delete</div>,
            className: 'warning-icon',
            command: handleTextDelete
        }
    ];

    // =========================================================================
    // RETURN
    // =========================================================================
    return (
        <React.Fragment>
            {/* =========================== CONTEXT =========================== */}
            <DOMWrapper>
                <ContextMenu
                    className="custom-context-menu"
                    model={items}
                    ref={contextRef}
                    appendTo={document.body}
                    style={{
                        position: 'absolute',
                        top: contextMenuCoord.y,
                        left: contextMenuCoord.x
                    }} />
            </DOMWrapper>

            {/* ======================= EDITOR ======================= */}
            <LocalDOMWrapper>
                <div onClick={handleClick}>
                    <ContentEditable
                        html={object.settings.text}
                        onChange={handleTextboxInputChange}
                        innerRef={textBoxRef}
                        style={{
                            position: 'absolute',
                            top: object.settings.y,
                            left: object.settings.x,
                            fontSize: object.settings.size,
                            fontWeight: object.settings.style,
                            width: object.settings?.width,
                            color: object.settings?.fill,
                            lineHeight: 1,
                            fontFamily: 'Arial',
                            margin: 0,
                            transformOrigin: '0 0',
                            pointerEvents: isDoubleClicked ? 'auto' : 'none',
                            wordBreak: 'break-all',
                            textAlign: object.settings.align,
                            outline: 'none',
                            opacity: isDoubleClicked ? 1 : 0
                        }}
                    />
                </div>
            </LocalDOMWrapper>

            {/* ======================= TEXT ======================= */}
            <Text
                // General
                ref={shapeRef}
                text={object.settings.text.replaceAll("&nbsp;", " ")}
                fill={object.settings.fill}
                align={object.settings.align}
                fontSize={object.settings.size}
                fontStyle={object.settings.style}
                textDecoration={object.settings.decoration}
                width={object.settings?.width}
                lineHeight={1}
                opacity={isDoubleClicked ? 0 : 1}
                wrap="char"
                draggable
                fontFamily={object.settings?.fontFamily || "Arial"}

                // Positioning
                x={object.settings.x}
                y={object.settings.y}

                // Event Listener
                onMouseEnter={() => (!isSelected || !isDoubleClicked) && setHover(true)}
                onMouseLeave={() => setHover(false)}
                onDragEnd={handlePositionUpdate}
                onClick={handleClick}

                // Filters
                shadowColor={object.filters?.shadowColor || object.settings.fill}
                shadowOffset={{ x: object.filters?.direction?.x || 0, y: object.filters?.direction?.y || 0 }}
                shadowOpacity={object.filters?.shadowOpacity / 100 || 1}
                shadowBlur={object.filters?.shadowBlur || 0}
                onContextMenu={handleContext}
            />

            {/* ======================= TRANSFORMER ======================= */}
            <Transformer
                ref={trRef}
                borderEnabled={(hover || isDoubleClicked || isSelected) ? true : false}
                rotateEnabled={(!isDoubleClicked && !isSelected) ? false : true}
                resizeEnabled={(!isDoubleClicked && !isSelected) ? false : true}
                onTransformEnd={handleTransformEnd}
                anchorStroke={"#869ee3"}
                anchorCornerRadius={15}
                enabledAnchors={['middle-right', 'middle-left']}
                anchorStrokeWidth={1}
                anchorSize={10}
                ignoreStroke={true}
                padding={5}
                boundBoxFunc={(oldBox, newBox) => {
                    console.log(newBox.width)

                    // limit resize
                    if (newBox.width < MIN_WIDTH) {
                        return oldBox;
                    }
                    else {
                        handleResize(newBox.width)
                        return newBox;
                    }
                }}
            />

        </React.Fragment>
    )
}

export default TextWrapper