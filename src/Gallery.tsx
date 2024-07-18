import { useFeederContext } from "./context/FeederContext";
import NavBar from "./NavBar";
import { getImagesInGroup } from "./utils/helpers";

const Gallery = () => {
    const { data } = useFeederContext();
    const imagesInGroup = getImagesInGroup(data.capturedImages);
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
                                    src={image.src}
                                    alt=""
                                    key={`${image.src} ${ind}`}
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
