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
    ShapesIcon,
    ChevronLeft
} from 'lucide-react';

const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState(null); // Changed to null for no default
    const [hoveredMenu, setHoveredMenu] = useState(null);
    const [isPanelPinned, setIsPanelPinned] = useState(false);

    const menuItems = [
        { id: "product", label: "Product", icon: ShirtIcon },
        { id: "images", label: "Images", icon: ImageIcon },
        { id: "text", label: "Text", icon: TypeIcon },
        { id: "templates", label: "Templates", icon: LayoutTemplateIcon },
        { id: "cliparts", label: "Cliparts", icon: SparklesIcon },
        { id: "shapes", label: "Shapes", icon: ShapesIcon },
    ];

    const handleMenuClick = (menuId) => {
        if (activeMenu === menuId) {
            // If clicking the same menu, toggle off
            setActiveMenu(null);
            setIsPanelPinned(false);
        } else {
            // If clicking different menu, set it as active and pin the panel
            setActiveMenu(menuId);
            setIsPanelPinned(true);
        }
    };

    const handleMenuHover = (menuId) => {
        if (!isPanelPinned) {
            setHoveredMenu(menuId);
        }
    };

    const handleMenuLeave = () => {
        if (!isPanelPinned) {
            setHoveredMenu(null);
        }
    };

    const handleCollapsePanel = () => {
        setActiveMenu(null);
        setIsPanelPinned(false);
    };

    // Determine which menu to show: active (pinned) takes priority over hovered
    const displayedMenu = isPanelPinned ? activeMenu : hoveredMenu;
    const showPanel = displayedMenu !== null;

    const renderContent = () => {
        switch(displayedMenu) {
            case "product": return <Product />;
            case "images": return <Images />;
            case "text": return <Text />;
            case "templates": return <Templates />;
            case "cliparts": return <Cliparts />;
            case "shapes": return <Shape />;
            default: return null;
        }
    };

    return (
        <>
            <div className="col column menu">
                <ul>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.id}>
                                <div 
                                    onClick={() => handleMenuClick(item.id)}
                                    onMouseEnter={() => handleMenuHover(item.id)}
                                    onMouseLeave={handleMenuLeave}
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
            
            {showPanel && (
                <div 
                    className={`sidebar-panel ${isPanelPinned ? 'pinned' : 'hover'}`}
                    onMouseEnter={() => !isPanelPinned && setHoveredMenu(displayedMenu)}
                    onMouseLeave={handleMenuLeave}
                >
                    <div className="sidebar-panel-header">
                        <h3 className="sidebar-panel-title">
                            {menuItems.find(item => item.id === displayedMenu)?.label}
                        </h3>
                        {isPanelPinned && (
                            <button 
                                className="sidebar-collapse-btn" 
                                onClick={handleCollapsePanel}
                                title="Collapse"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        )}
                    </div>
                    <div className="sidebar-panel-content">
                        {renderContent()}
                    </div>
                </div>
            )}
        </>
    );
}

export default Sidebar;