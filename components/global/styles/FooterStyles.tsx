import {COLORS} from "../../styles/colors";
import { Container } from "react-bootstrap";
import DIMENSIONS from "../../styles/GlobalDimensions";
import styled from "styled-components";

export const FooterContainer = styled(Container)`
        min-height: 240px;
        background: ${COLORS.StoneClassyDarkColor};
        height: 100%;
`;