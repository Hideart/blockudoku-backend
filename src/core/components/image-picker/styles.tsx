import { css } from 'styled-components';
import { AppColor, GraphicColor } from '@/core/models/enums/app-color';

export default css`
    &.image-picker {
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

        &__button {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 38px;
            height: 38px;
            padding: 0;
            background: ${AppColor.darkBlue};
            border: 4px solid ${AppColor.white};
            transform: translate(50%, 50%);
            border-radius: 50%;

            :focus {
                outline:none;
            }

            ::-moz-focus-inner {
                border:0;
            }

            &::before {
                position: absolute;
                content:'';
                top: 50%;
                left: 50%;
                width: 2px;
                height: 10px;
                background-color: ${AppColor.white};
                transform: translate(-50%, -50%);
            }
            &::after {
                position: absolute;
                content:'';
                top: 50%;
                left: 50%;
                width: 10px;
                height: 2px;
                background-color: ${AppColor.white};
                transform: translate(-50%, -50%);
            }
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
