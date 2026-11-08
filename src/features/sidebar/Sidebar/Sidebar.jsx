import React, { lazy, Suspense, useState } from "react";
import '../../../assets/css/sidebar.css';
import { ChevronLeft, Menu } from 'lucide-react';
import { primaryMenuItems, secondaryMenuItems } from './sidebarConfig';

const Product = lazy(() => import('./Product'));
const Images = lazy(() => import('./Images'));
const Text = lazy(() => import('./Text'));
const Templates = lazy(() => import('./Templates'));
const Cliparts = lazy(() => import('./Cliparts'));
const Shape = lazy(() => import('./Shape'));

const panelByMenu = {
    product: Product,
    images: Images,
    text: Text,
    templates: Templates,
    cliparts: Cliparts,
    shapes: Shape,
};

const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState(null); // Changed to null for no default
    const [hoveredMenu, setHoveredMenu] = useState(null);
    const [isPanelPinned, setIsPanelPinned] = useState(false);

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

    const ActivePanel = displayedMenu ? panelByMenu[displayedMenu] : null;

    return (
        <>
            <div className="menu">
                <div className="menu-brand-block">
                    <button type="button" className="menu-brand-logo" aria-label="Brand">K</button>
                    <button type="button" className="menu-hamburger" aria-label="Menu">
                        <Menu size={16} />
                    </button>
                </div>

                <ul className="menu-primary-list">
                    {primaryMenuItems.map((item) => {
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

                <div className="menu-secondary-list">
                    {secondaryMenuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                className="item-menu item-menu-secondary center-text"
                                aria-label={item.ariaLabel}
                            >
                                <Icon size={20} strokeWidth={1.8} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
            
            {showPanel && (
                <div 
                    className={`sidebar-panel ${isPanelPinned ? 'pinned' : 'hover'}`}
                    onMouseEnter={() => !isPanelPinned && setHoveredMenu(displayedMenu)}
                    onMouseLeave={handleMenuLeave}
                >
                    <div className="sidebar-panel-header">
                        <h3 className="sidebar-panel-title">
                            {primaryMenuItems.find(item => item.id === displayedMenu)?.label}
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
                        <Suspense
                            fallback={
                                <div className="grid-message">
                                    <div className="spinner"></div>
                                    <p>Loading panel...</p>
                                </div>
                            }
                        >
                            {ActivePanel ? <ActivePanel /> : null}
                        </Suspense>
                    </div>
                </div>
            )}
        </>
    );
}

export default Sidebar;