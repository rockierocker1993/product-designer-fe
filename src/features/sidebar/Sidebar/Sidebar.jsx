import React, { useState } from "react";
import '../../../assets/css/sidebar.css'
import Product from "./Product";
import Images from "./Images";
import Text from "./Text";
import Templates from "./Templates";
import Cliparts from "./Cliparts";
import Shape from "./Shape";
import { 
    ShirtIcon, 
    ImageIcon, 
    TypeIcon, 
    LayoutTemplateIcon, 
    SparklesIcon, 
    ShapesIcon 
} from 'lucide-react';

const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState("product");

    const menuItems = [
        { id: "product", label: "Product", icon: ShirtIcon },
        { id: "images", label: "Images", icon: ImageIcon },
        { id: "text", label: "Text", icon: TypeIcon },
        { id: "templates", label: "Templates", icon: LayoutTemplateIcon },
        { id: "cliparts", label: "Cliparts", icon: SparklesIcon },
        { id: "shapes", label: "Shapes", icon: ShapesIcon },
    ];

    return (
        <>
            <div className="col column menu">
                <ul>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.id}>
                                <div 
                                    onClick={() => setActiveMenu(item.id)} 
                                    className={`item-menu center-text ${activeMenu === item.id ? 'active' : ''}`}
                                >
                                    <Icon size={24} strokeWidth={2} />
                                    <span>{item.label}</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {activeMenu === "product" && <Product />}
            {activeMenu === "images" && <Images />}
            {activeMenu === "text" && <Text />}
            {activeMenu === "templates" && <Templates />}
            {activeMenu === "cliparts" && <Cliparts />}
            {activeMenu === "shapes" && <Shape />}
        </>
    );
}

export default Sidebar;