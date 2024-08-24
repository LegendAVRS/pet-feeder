import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import useData from "./hooks/useData";
import NavBar from "./NavBar";
import { getImagesInGroup } from "./utils/helpers";
import { ImagesData, VideosData } from "./utils/types";
import { IMAGE_URL, VIDEO_URL } from "./utils/global";
import LoadingPage from "./LoadingPage";

const Gallery = () => {
    const { data: data_image, error: error1 } = useData<ImagesData>(IMAGE_URL);
    const { data: data_video, error: error2 } = useData<VideosData>(VIDEO_URL);

    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slides, setSlides] = useState([]);

    if (error1) {
        throw new Error(error1);
    }
    if (error2) {
        throw new Error(error2);
    }

    if (!data_image || !data_video) {
        return <LoadingPage></LoadingPage>;
    }

    const stuff = getImagesInGroup(data_image, data_video);
    if (Object.keys(stuff).length === 0) {
        return (
            <>
                <NavBar label="Gallery"></NavBar>
                <section className="px-6">
                    <p className="text-xl font-bold py-2">
                        No images or videos found
                    </p>
                </section>
            </>
        );
    }

    const handleOpenLightbox = (images, index) => {
        setSlides(
            images.map((image) => ({
                src: image.url,
                type: image.isVideo ? "video" : "image",
            }))
        );
        setCurrentIndex(index);
        setOpen(true);
    };

    return (
        <>
            <NavBar label="Gallery"></NavBar>
            <section className="px-6">
                {Object.keys(stuff).map((dateKey) => (
                    <div key={dateKey}>
                        <p className="text-xl font-bold py-2">{dateKey}</p>
                        <div className="grid grid-cols-3 gap-1">
                            {stuff[dateKey].map((image, ind) =>
                                image.isVideo ? (
                                    <video
                                        src={image.url}
                                        className="aspect-square object-cover cursor-pointer"
                                        key={`${image.url} ${ind} ${dateKey}`}
                                        onClick={() =>
                                            handleOpenLightbox(
                                                stuff[dateKey],
                                                ind
                                            )
                                        }
                                    ></video>
                                ) : (
                                    <img
                                        src={image.url}
                                        alt=""
                                        key={`${image.url} ${ind} ${dateKey}`}
                                        className="aspect-square object-cover cursor-pointer"
                                        onClick={() =>
                                            handleOpenLightbox(
                                                stuff[dateKey],
                                                ind
                                            )
                                        }
                                    />
                                )
                            )}
                        </div>
                    </div>
                ))}
            </section>

            {open && (
                <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    slides={slides}
                    plugins={[Thumbnails]}
                    index={currentIndex}
                />
            )}
        </>
    );
};

export default Gallery;
