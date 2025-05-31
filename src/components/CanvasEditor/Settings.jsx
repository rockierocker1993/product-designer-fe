import React, { useState, useEffect } from 'react'
import { Input } from 'blocksin-system';

function Settings({ canvas }) {
    const [selectedObject, setSelectedObject] = useState(null);
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [diameter, setDiameter] = useState("");
    const [color, setColor] = useState("");

    useEffect(() => {
        if (canvas) {
            canvas.on("selection:created", (event) => {
                console.log(event.selected[0].type)
                handleObjectSelection(event.selected[0]);
            });

            canvas.on("selection:updated", (event) => {
                handleObjectSelection(event.selected[0]);
            });

            canvas.on("selection:cleared", (event) => {
                setSelectedObject(null);
                clearSettings();
            });

            canvas.on("selection:modified", (event) => {
                handleObjectSelection(event.target);

            });

            canvas.on("selection:scaling", (event) => {
                handleObjectSelection(event.target);
            });

        }
    }, [canvas]);

    const handleObjectSelection = (object) => {
        if (!object) return;

        setSelectedObject(object);

        if (object === 'react') {
            setWidth(Math.round(object.width * object.scaleX));
            setHeight(Math.round(object.height * object.scaleY));
            setColor(object.fill);
            setDiameter("");
        } else if (object.type === 'circle') {
            setDiameter(Math.round(object.radius * 2 * object.scaleX));
            setColor(object.fill);
            setWidth("");
        }

    }

    const clearSettings = () => {
        setWidth("");
        setColor("");
        setHeight("");
        setDiameter("");
    }

    const handleWidthChange = () => {}
    const handleHeightChange = () => {}
    const handleColorChange = () => {}
    const handleDiameterChange = () => {}
    

    return (
        <div className='settings darkmode'>
            {selectedObject && selectedObject.type === 'rect' &&
                <>
                    <Input
                        fluid
                        label='width'
                        value={width}
                        onChange={handleWidthChange}
                    >
                    </Input>
                </>
            }
        </div>
    )
}

export default Settings;