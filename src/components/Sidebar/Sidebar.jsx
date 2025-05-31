import React, { useRef, useState } from "react";
import '../../assets/css/sidebar.css'
import Product from "./Product";
import Images from "./Images";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShirt, faImages, faFont, faWandSparkles, faStar, faShapes } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';

const Sidebar = () => {
    library.add(faShirt, faImages, faFont, faWandSparkles, faStar, faShapes);
    const [activeMenu, setActiveMenu] = useState("product")
    return <><div className="col column menu">
        <ul>
            <li>
                <div onClick={() => setActiveMenu("product")} className="item-menu center-text">
                    <FontAwesomeIcon icon='shirt' size="xl" style={{ marginBottom: '5px' }} />
                    <span>Product</span>
                </div>
            </li>
            <li>
                <div onClick={() => setActiveMenu("images")} className="item-menu center-text active">
                    <FontAwesomeIcon icon='images' size="xl" style={{ marginBottom: '5px' }} />
                    <span>Images</span>
                </div>
            </li>
            <li>
                <div className="item-menu center-text">
                    <FontAwesomeIcon icon='font' size="xl" style={{ marginBottom: '5px' }} />
                    <span>Text</span>
                </div>
            </li>
            <li>
                <div className="item-menu center-text">
                    <FontAwesomeIcon icon='wand-sparkles' size="xl" style={{ marginBottom: '5px' }} />
                    <span>Templates</span>
                </div>
            </li>
            <li>
                <div className="item-menu center-text">
                    <FontAwesomeIcon icon='star' size="xl" style={{ marginBottom: '5px' }} />
                    <span>Cliparts</span>
                </div>
            </li>
            <li>
                <div className="item-menu center-text">
                    <FontAwesomeIcon icon='shapes' size="xl" style={{ marginBottom: '5px' }} />
                    <span>Shapes</span>
                </div>
            </li>
        </ul>
    </div>
        {activeMenu === "product" && <Product />}
        {activeMenu === "images" && <Images />}
    </>
}

export default Sidebar;