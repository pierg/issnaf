import { Logo } from "./styled";
import { BikeWhiteIcon } from "components";
import { logo } from "assets";

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    return (
        <Logo>
               <img src={logo} alt="ISSNAF" />
        </Logo>
    );
};
