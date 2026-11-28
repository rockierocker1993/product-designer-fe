import { useEffect, useState, useRef, useCallback } from "react";
import TextProperties from "./TextProperties";
import "../../../assets/css/rightbar.css"
import { PropertiesAnimationSkeleton } from "../../../components/SkeletonAnimation";
import { MoveLeft } from "lucide-react";
import Properties from "./Properties";
import FontPicker from "./FontPicker";
import { fetchFonts } from "./controll/righbarControll";

const Rightbar = () => {
    const FONT_PAGE_SIZE = 30;
    const [pageFont, setPageFont] = useState(1);
    const [searchTermFont, setSearchTermFont] = useState("");
    const [selectedCategoryFont, setSelectedCategoryFont] = useState("");

    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("Text Properties");
    const [subtitle, setSubtitle] = useState("Control your selected text style");
    const [rightbarContent, setRightbarContent] = useState(null);

    const showFontPicker = async () => {
        setLoading(true);
        setTitle(
            <button className='icon-btn' onClick={showProperties}>
                <MoveLeft size={24} />
            </button>
        );
        setLoading(false);    
        setSubtitle(<h4 className="section-title">Font</h4>);
        setRightbarContent(<FontPicker/>);
    }

    useEffect(() => {
        showFontPicker();
    }, [pageFont, searchTermFont, selectedCategoryFont]);


    const showProperties = () => {
        setTitle(<h3>Text Properties</h3>);
        setSubtitle(<p className="section-title">Control your selected text style</p>);
        setRightbarContent(<Properties showFontPicker={showFontPicker} />);
        setLoading(false);
    };
    useEffect(() => {
        setRightbarContent(<Properties showFontPicker={showFontPicker} />);
        setTitle(<h3>Text Properties</h3>);
        setSubtitle("Control your selected text style");
        setLoading(false);
    }, []);

    return (
        <aside className="rightbar-container" aria-label="Editor right sidebar">
            {loading && (
                <PropertiesAnimationSkeleton />
            )}
            <header className="rightbar-container-header">
                {title ? title : null}
                {subtitle ? subtitle : null}
            </header>
            {!loading && rightbarContent}
        </aside>
    );
};

export default Rightbar;