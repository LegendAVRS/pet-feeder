import useData from "./hooks/useData";
import LoadingPage from "./LoadingPage";
import NavBar from "./NavBar";
import { unixToDateTimeString } from "./utils/helpers";
import { VideoData } from "./utils/types";
import { CAMERA_URL } from "./utils/global";

const VideoCall = () => {
    const { data, error } = useData<VideoData>(CAMERA_URL);
    if (error) {
        throw new Error(error);
    }
    if (!data) {
        return <LoadingPage></LoadingPage>;
    }
    return (
        <>
            <NavBar label="Pet Call"></NavBar>
            <section className="px-6 flex flex-col items-center">
                <iframe
                    width="100%"
                    height="360"
                    src={data.url}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="aspect-video"
                />

                <p className="text-xl flex flex-col items-center">
                    <span>Started capturing on</span>
                    <span>
                        {unixToDateTimeString(new Date().getTime() / 1000)}
                    </span>
                </p>
            </section>
        </>
    );
};

export default VideoCall;
