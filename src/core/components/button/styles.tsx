import { css } from 'styled-components';
import { AppColor, GraphicColor } from '@/core/models/enums/app-color';
import { IOwnProps } from './types';
import { ButtonTypeView } from './types';

export default css`
    min-width: 180px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    padding: 8px;
    border: none;
    font-size: 14px;
    color: ${(props: IOwnProps) => {
        switch (props.view) {
            case ButtonTypeView.MAIN:
                return AppColor.white;
            case ButtonTypeView.SECOND:
                return AppColor.blue;
            default:
                return AppColor.white;
        }
    }};
    line-height: 16px;
    background-color: ${(props: IOwnProps) => {
        switch (props.view) {
            case ButtonTypeView.MAIN:
                return AppColor.blue;
            case ButtonTypeView.SECOND:
                return AppColor.almostWhiteBlue;
            default:
                return AppColor.blue;
        }
    }};
    border-radius: 16px;
    transition: all .3s;

    :focus {
        outline:none;
    }

    ::-moz-focus-inner {
        border:0;
    }

    :hover {
        background-color: ${(props: IOwnProps) => {
            switch (props.view) {
                case ButtonTypeView.MAIN:
                    return AppColor.darkBlue;
                case ButtonTypeView.SECOND:
                    return AppColor.darkBlue;
                default:
                    return AppColor.darkBlue;
            }
        }};
        color: ${(props: IOwnProps) => {
            switch (props.view) {
                case ButtonTypeView.MAIN:
                    return AppColor.white;
                case ButtonTypeView.SECOND:
                    return AppColor.white;
                default:
                    return AppColor.white;
            }
        }};

        .icon {
            svg path {
                transition: all .3s;
                stroke:  ${(props: IOwnProps) => {
                    switch (props.view) {
                        case ButtonTypeView.MAIN:
                            return '';
                        case ButtonTypeView.SECOND:
                            return AppColor.white;
                        default:
                            return AppColor.white;
                    }
                }};
                fill:  ${(props: IOwnProps) => {
                    switch (props.view) {
                        case ButtonTypeView.MAIN:
                            return '';
                        case ButtonTypeView.SECOND:
                            return AppColor.white;
                        default:
                            return AppColor.white;
                    }
                }};
            }
        }
    }

    :disabled {
        background-color: ${GraphicColor.whiteBlue};
        opacity: .5;
        color: ${GraphicColor.darkBlue};
    }


    &.secondary {
        background-color: ${GraphicColor.whiteBlue};
        color: ${GraphicColor.darkBlue};
    }

    .icon {
        display: flex;
        max-height: 100%;
        width: auto;
        margin-right: 8px;
        transition: all .3s;
    }
`;
