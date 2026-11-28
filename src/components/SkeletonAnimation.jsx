
import "../assets/css/skeleton-animation.css";

export const Skeleton = ({
    width,
    height,
    circle = false,
    radius = 8,
    className = "",
    text = ""
}) => {
    return (
        <div
            className={`skeleton ${className}`}
            style={{
                width,
                height,
                borderRadius: circle ? "50%" : radius
            }}
        >
            {text && <span className="skeleton-text">{text}</span>}
        </div>
    );
};

export const ProductCardSkeleton = () => {
    return (
        <div className="product-card-skeleton">
            <Skeleton width="100%" height={180} radius={10} />

            <div className="skeleton-content">
                <Skeleton width="80%" height={14} />
                <Skeleton width="50%" height={12} />
                <Skeleton width="65%" height={12} />
            </div>
        </div>
    );
};

export const ProfileSkeleton = () => {
    return (
        <div className="profile-skeleton">
            <Skeleton width={45} height={45} circle />

            <div className="profile-skeleton-info">
                <Skeleton width="140px" height={12} />
                <Skeleton width="90px" height={10} />
            </div>
        </div>
    );
};

export const UploadImageSkeleton = ({ id, imagePreview }) => {
    return (
        <div className="image-card-btn">
            <div className="image-card-preview">
                <div className="image-card-skeleton">
                    <Skeleton width="100%" radius={10} className="image-skeleton" />

                    <div className="skeleton-content">
                        <Skeleton width="70%" height={14} className="image-skeleton" />
                        <Skeleton width="90%" height={40} className="image-skeleton" />
                        <Skeleton width="75%" height={12} className="image-skeleton" />
                    </div>
                </div>
                <img style={{ opacity: 0.4 }} id={id} src={imagePreview} alt="" className="image-preview" />
            </div>
        </div>
    );
};

export const CardPreviewAnimationSkeleton = ({ count, className }) => {
    const skeletons = [];
    for (let i = 0; i < count; i++) {
        skeletons.push(
            <div className={`${className}-card-btn`} key={i}>
                <div className={`${className}-card-preview`}>
                    <div className={`${className}-card-skeleton`}>
                        <Skeleton width="100%" radius={10} className="image-skeleton" />

                        <div className="skeleton-content">
                            <Skeleton width="70%" height={14} className="image-skeleton" />
                            <Skeleton width="90%" height={40} className="image-skeleton" />
                            <Skeleton width="75%" height={12} className="image-skeleton" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return <>{skeletons}</>;
};

export const PropertiesAnimationSkeleton = () => {
    return (
        <div className="properties-skeleton">
            <Skeleton width="100%" height={60} radius={10} className="mb-3 mt-3"/>
            <div className="skeleton-content">
                <Skeleton width="100%" height={20} className="mb-1"/>
                <Skeleton width="100%" height={20} className="mb-1"/>
                <Skeleton width="100%" height={20} className="mb-3"/>
                <Skeleton width="100%" height={20} className="mb-1"/>
                <Skeleton width="100%" height={20} className="mb-1"/>
                <Skeleton width="100%" height={20} className="mb-3"/>
                <Skeleton width="100%" height={20} className="mb-1"/>
                <Skeleton width="100%" height={20} className="mb-1"/>
                <Skeleton width="100%" height={20} className="mb-3"/>
                <Skeleton width="100%" height={20} className="mb-1"/>
                <Skeleton width="100%" height={20} className="mb-1"/>
                <Skeleton width="100%" height={20} className="mb-1"/>
            </div>
        </div>
    );
};