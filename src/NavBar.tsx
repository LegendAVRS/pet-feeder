import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    label: string;
    children?: ReactElement;
}
const NavBar = ({ label, children }: Props) => {
    const navigator = useNavigate();
    return (
        <nav className="h-20 p-6 flex items-center w-full">
            <button
                onClick={() => {
                    navigator(-1);
                }}
                className="pr-4 text-xl"
            >
                &lt;
            </button>
            <div className="flex grow items-center justify-between">
                <h1 className=" font-bold text-3xl">{label}</h1>
                {children}
            </div>
        </nav>
    );
};

export default NavBar;
