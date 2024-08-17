import useData from "./hooks/useData";
import NavBar from "./NavBar";
import { getImagesInGroup } from "./utils/helpers";
import { GalleryData, IMAGE_URL, VIDEO_URL } from "./utils/types";
import LoadingPage from "./LoadingPage";

const Gallery = () => {
    const { data: data_image, error: error1 } =
        useData<GalleryData[]>(IMAGE_URL);
    const { data: data_video, error: error2 } =
        useData<GalleryData[]>(VIDEO_URL);

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
                                        className="aspect-square"
                                    ></video>
                                ) : (
                                    <img
                                        src={image.url}
                                        alt=""
                                        key={`${image.url} ${ind}`}
                                        className="aspect-square"
                                    />
                                )
                            )}
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
};

export default Gallery;
