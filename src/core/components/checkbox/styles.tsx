import { css } from 'styled-components';
import { AppColor, GraphicColor } from '@/core/models/enums/app-color';

export default css`
    > label {
        display: inline-flex;
        align-items: center;
        width: auto;
        cursor: pointer;
    }

    .invisible-checkbox {
        display: none;
    }

    .invisible-checkbox:checked ~ .ll-checkbox {
        background-color: ${GraphicColor.darkBlue};
    }

    .invisible-checkbox:checked ~ .ll-checkbox::before {
        opacity: 1;
    }

    .invisible-checkbox:disabled ~ .ll-checkbox {
        background-color: ${AppColor.lightGrey};
        border-color: #4995F1;
    }

    .invisible-checkbox:disabled ~ .cb-label {
        color: ${AppColor.lightGrey};
    }

    .ll-checkbox {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        background-color: ${AppColor.white};
        border: 1px solid ${GraphicColor.darkBlue};
        border-radius: 2px;
        transition: background-color .3s;
    }

    .ll-checkbox::before {
        content: "";
        width: 6px;
        height: 10px;
        border-right: 2px solid ${AppColor.white};
        border-bottom: 2px solid ${AppColor.white};
        transform: rotate(45deg);
        margin-top: -2px;
        opacity: 0;
        transition: opacity .3s;
    }

    .cb-label {
        display: inline-block;
        position: relative;
        margin-left: 10px;
    }
`;
