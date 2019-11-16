import { css } from 'styled-components';
import { AppColor, GraphicColor } from '@/core/models/enums/app-color';
import { Breakpoints } from '@/core/models/enums/breakpoints';

export default css`
    &.change-info {
        height: 100%;
        max-width: 1680px;
        margin: 0 auto;
        padding: 25px;
        padding-right: 29px;
        padding-bottom: 21px;

        .change-info__content {
            display: flex;
            justify-content: flex-start;
            height: 100%;
            padding: 62px 35px;
            border: 1px solid ${AppColor.contrastGrey};
            border-radius: 8px;

            @media (max-width: ${Breakpoints.small}) {
                flex-direction: column;
            }

            fieldset {
                margin-bottom: 30px;
                width: 598px;

                @media (max-width: ${Breakpoints.small}) {
                    width: 100%;
                }
            }

            .button {
                width: 331px;
            }

            .image-picker {
                margin-right: 81px;

                @media (max-width: ${Breakpoints.small}) {
                    margin-right: 0;
                }
            }
        }

        .change-info__error {
            position: absolute;
            top: -22px;
            left: 0;
            padding-left: 21px;
            margin: 0;
            font-size: 12px;
            line-height: 14px;
            color: ${GraphicColor.red};
        }

        .change-info__wrap {
            padding-top: 20px;
        }
    }
`;
