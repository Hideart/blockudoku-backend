import { css } from 'styled-components';
import { GraphicColor } from '@/core/models/enums/app-color';

export default css`
    padding-top: 65px;
    padding-left: 65px;

    .test-class {
        background-color: ${GraphicColor.darkBlue};
    }
`;
