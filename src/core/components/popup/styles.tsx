import { css } from 'styled-components';
import { GraphicColor, AppColor } from '@/core/models/enums/app-color';

export default css`
    position: absolute;
    width: calc(100% - 65px);
    height: calc(100% - 65px);
    z-index: 10;
    left: 65px;
    top: 65px;
    display: ${(props: any): string => props.visible ? 'block' : 'none'};

    & .shade {
        background-color: rgba(21, 125, 241, 0.29);
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    & .popup {
        position: absolute;
        top: 50%;
        left: 50%;
        max-width: 500px;
        padding: 45px 70px;
        transform: translate(-50%, -50%);
        box-shadow: 0px 10px 30px rgba(0, 94, 199, 0.2);
        border-radius: 10px;
        overflow: hidden;
        background-color: ${AppColor.white};
    }

    .popup {
        position: relative;

        &__title {
            margin: 0 auto;
            margin-bottom: 25px;
            font-size: 14px;
            line-height: 16px;
            color: #1D4745;
            text-align: center;
            white-space: normal;
            max-width: 350px;
        }

        &__close {
            position: absolute;
            top: 27px;
            right: 39px;
            width: 12px;
            height: 12px;
            padding: 0;
            background-color: transparent;
            border: none;
            text-indent: -9999px;
            cursor: pointer;

            :focus {
                outline:none;
            }

            ::-moz-focus-inner {
                border:0;
            }

            &::before {
                position: absolute;
                content: '';
                top: 1px;
                left: 50%;
                width: 2px;
                height: 14px;
                background-color: ${GraphicColor.blue};
                transform: rotate(45deg) translateX(-50%);
            }

            &::after {
                position: absolute;
                content: '';
                top: 0;
                left: 50%;
                width: 2px;
                height: 14px;
                background-color: ${GraphicColor.blue};
                transform: rotate(-45deg) translateX(-50%);
            }
        }
    }
`;
