import useData from "./hooks/useData";
import NavBar from "./NavBar";
import { getImagesInGroup } from "./utils/helpers";
import { ImagesData, VideosData } from "./utils/types";
import { IMAGE_URL, VIDEO_URL } from "./utils/global";
import LoadingPage from "./LoadingPage";

const Gallery = () => {
    const { data: data_image, error: error1 } = useData<ImagesData>(IMAGE_URL);
    const { data: data_video, error: error2 } = useData<VideosData>(VIDEO_URL);

    if (error1) {
        throw new Error(error1);
    }
    if (error2) {
        throw new Error(error2);
    }

    if (!data_image || !data_video) {
        return <LoadingPage></LoadingPage>;
    }
    console.log(data_image);
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
                                        className="aspect-square object-cover"
                                        key={`${image.url} ${ind} ${dateKey}`}
                                    ></video>
                                ) : (
                                    <img
                                        src={image.url}
                                        alt=""
                                        key={`${image.url} ${ind} ${dateKey}`}
                                        className="aspect-square  object-cover"
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
