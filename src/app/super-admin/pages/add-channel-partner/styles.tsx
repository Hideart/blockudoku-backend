import { css } from 'styled-components';
import { AppColor, GraphicColor } from '@/core/models/enums/app-color';
import { Breakpoints } from '@/core/models/enums/breakpoints';

export default css`
    &.add-partner {
        height: 100%;
        max-width: 1680px;
        margin: 0 auto;
        padding: 25px;
        padding-right: 29px;
        padding-bottom: 21px;

        .add-partner__content {
            display: flex;
            justify-content: flex-start;
            height: 100%;
            padding: 62px 35px;
            border: 1px solid ${AppColor.contrastGrey};
            border-radius: 8px;

            @media (max-width: ${Breakpoints.medium}) {
                flex-direction: column;
                align-items: center;
            }

            fieldset {
                margin-right: 26px;
                width: 576px;

                @media (max-width: ${Breakpoints.medium}) {
                    margin-bottom: 12px;
                    width: 100%;
                }
            }

            .button {
                width: 282px;

                &:not(:last-of-type) {
                    margin-right: 12px;

                    @media (max-width: ${Breakpoints.medium}) {
                        margin-bottom: 12px;
                        margin-right: 0;
                    }
                }

                &:hover {
                    .icon svg path {
                        stroke: transparent;
                    }
                }

                &[view="second"] {
                    &:hover {
                        .icon svg path {
                            fill: ${AppColor.white};
                        }
                    }
                }
            }

            .image-picker {
                margin-right: 81px;
            }
        }

        .add-partner__error {
            position: absolute;
            top: -22px;
            left: 0;
            padding-left: 21px;
            margin: 0;
            font-size: 12px;
            line-height: 14px;
            color: ${GraphicColor.red};
        }
    }
`;
