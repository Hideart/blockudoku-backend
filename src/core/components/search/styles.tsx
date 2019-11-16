import { css } from 'styled-components';
import { AppColor, GraphicColor } from '@/core/models/enums/app-color';

import searchIcon from '@/assets/img/search.svg';

export default css`

    position: relative;
    margin-top: 11px;

    input {
        width: 100%;
        padding: 8px 17px;
        padding-right: 38px;
        border: none;
        font-size: 14px;
        line-height: 16px;
        color: ${AppColor.grey};
        border-radius: 16px;
        background-color: ${AppColor.searchGrey};
        -moz-appearance: textfield;
        transition: border .3s;
        border: 1px solid ${AppColor.searchGrey};

        :focus {
            outline:none;
        }
        ::-moz-focus-inner {
            border:0;
        }

        ::-webkit-inner-spin-button,
        ::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }

        :focus {
            border: 1px solid ${AppColor.darkBlue};
        }

        :not(.placeholder-shown) {
            border: 1px solid ${AppColor.darkBlue};
        }

        :not(.placeholder-shown) + p {
            color: ${GraphicColor.darkBlue};
            top: -8px;
            font-size: 12px;
            background-image: linear-gradient(#ffffff,  #F2F3F5);
        }
    }


    p {
        position: absolute;
        top: 7px;
        left: 11px;
        padding: 0 5px;
        font-size: 14px;
        line-height: 16px;
        color: ${AppColor.grey};
        transition: all .3s;
        pointer-events: none;
        user-select: none;
        will-change: transform;
    }

    button {
        position: absolute;
        top: 50%;
        right: 22px;
        padding: 0;
        width: 14px;
        height: 14px;
        background-color: transparent;
        background-image: url(${searchIcon});
        background-size: contain;
        background-repeat: no-repeat;
        border: none;
        transform: translateY(-50%);
    }
`;
