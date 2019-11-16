import { css } from 'styled-components';
import { AppColor, GraphicColor } from '@/core/models/enums/app-color';

export default css`
    position: absolute;
    top: 70px;
    right: 40px;
    width: 476px;
    .notification {
        display: flex;
        justify-content: space-between;
        background-color: ${AppColor.white};
        box-shadow: 0px 10px 30px rgba(0, 94, 199, 0.2);
        border-radius: 10px;
        padding: 25px 30px;
        padding-bottom: 43px;
        z-index: 11;
        margin-bottom: 15px;
        z-index: 999;
        position: relative;
        &:last-child {
            margin-bottom: 0;
        }
    }

    .notification {
        animation: slidedown 5s;
        will-change: transform;
        transition: opacity .3s;

        &__close {
            position: relative;
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

        &__info {
            display: flex;
            flex-direction: column;
            width: 334px;
            padding-top: 10px;
        }

        &__status-img {
            margin-right: 20px;
        }

        &__title {
            margin: 0;
            margin-bottom: 18px;
            font-size: 14px;
            line-height: 16px;
            color: ${AppColor.black};
        }

        &__desc {
            margin: 0;
            font-size: 14px;
            line-height: 16px;
            color:  #1D4745;
        }
    }

    /* @keyframes slidedown {
        0% {
            top: -100px;
        }

        80% {
            top: 40px;
        }

        100% {
            top: 20px;
        }
    } */

    @keyframes slidedown {
        0% {
            opacity: 0;
        }

        20% {
            opacity: 1;
        }
    }

`;
