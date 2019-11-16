import { css } from 'styled-components';
import { GraphicColor } from '@/core/models/enums/app-color';

export default css`
    &.file-picker {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 188px;
        height: 188px;
        border: 1px dashed ${GraphicColor.whiteBlue};
        border-radius: 10px;
        cursor: pointer;
        transition: border-color .3s;

        &:hover {
            border-color: ${GraphicColor.darkBlue};
        }

        :focus {
            outline:none;
        }

        ::-moz-focus-inner {
            border:0;
        }

        img {
            margin-right: 20px;
        }

        p {
            font-size: 14px;
            line-height: 17px;
            color: #ABD2FF;
        }

        &_loaded {
            border: none;
            img {
                object-fit: cover;
                width: 100%;
                height: 100%;
                object-position: center;
                border-radius: 10px;
            }
        }
    }
`;
