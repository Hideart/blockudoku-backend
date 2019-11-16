import { css } from 'styled-components';
import { AppColor, GraphicColor } from '@/core/models/enums/app-color';

export default css`
    position: relative;

    input {
        width: 100%;
        padding: 8px 17px;
        border: none;
        font-size: 14px;
        line-height: 16px;
        color: ${AppColor.black};
        border-radius: 16px;
        border: 1px solid ${AppColor.contrastGrey};
        -moz-appearance: textfield;
        transition: border .3s;
        background-color: ${AppColor.white};

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
        }

        :-webkit-autofill + p {
            color: ${GraphicColor.darkBlue};
            top: -8px;
            font-size: 12px;
        }
    }


    p {
        position: absolute;
        top: 7px;
        left: 16px;
        padding: 0 5px;
        font-size: 14px;
        line-height: 16px;
        color: ${AppColor.contrastGrey};
        background-color: ${AppColor.white};
        transition: all .3s;
        pointer-events: none;
        user-select: none;
        will-change: transform;
    }
`;
