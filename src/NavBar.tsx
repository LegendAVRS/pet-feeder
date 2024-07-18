import { useNavigate } from "react-router-dom";

interface Props {
    label: string;
}
const NavBar = ({ label }: Props) => {
    const navigator = useNavigate();
    return (
        <nav className="h-20 p-6 flex items-center">
            <button
                onClick={() => {
                    navigator(-1);
                }}
                className="pr-4 text-xl"
            >
                &lt;
            </button>
            <h1 className=" font-bold text-3xl">{label}</h1>
        </nav>
    );
};

export default NavBar;
