import { ErrorBoundary } from "react-error-boundary";
import useData from "./hooks/useData";
import NavBar from "./NavBar";
import { getImagesInGroup } from "./utils/helpers";
import { GALLERY_URL, GalleryData } from "./utils/types";
import LoadingPage from "./LoadingPage";

const Gallery = () => {
    const { data, error } = useData<GalleryData>(GALLERY_URL);
    if (error) {
        throw new Error(error);
    }
    if (!data) {
        return <LoadingPage></LoadingPage>;
    }
    console.log(data);
    const imagesInGroup = getImagesInGroup(data.images);
    return (
        <>
            <NavBar label="Gallery"></NavBar>
            <section className="px-6">
                {Object.keys(imagesInGroup).map((dateKey) => (
                    <div key={dateKey}>
                        <p className="text-xl font-bold py-2">{dateKey}</p>
                        <div className="grid grid-cols-3 gap-1">
                            {imagesInGroup[dateKey].map((image, ind) => (
                                <img
                                    src={image.image_url}
                                    alt=""
                                    key={`${image.image_url} ${ind}`}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
};

export default Gallery;
