import { css } from 'styled-components';
import { AppColor, GraphicColor } from '@/core/models/enums/app-color';
import { Breakpoints } from '@/core/models/enums/breakpoints';

export default css`
    &.edit-channel-part {
        display: flex;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        max-width: 1680px;
        margin: 0 auto;
        padding: 25px;
        padding-right: 29px;
        padding-bottom: 21px;

        .edit-channel-part__content {
            display: flex;
            justify-content: flex-start;
            align-content: flex-start;
            flex-wrap: wrap;
            height: 100%;
            width: calc(100% - 533px);
            margin-right: 25px;
            padding: 62px 35px;
            border: 1px solid ${AppColor.contrastGrey};
            border-radius: 8px;

            @media (max-width: ${Breakpoints.large}) {
                width: calc(100% - 433px);
            }

            .image-picker {
                width: 102px;
                height: 102px;
                margin-right: auto;
                margin-bottom: 41px;

                .image-picker__button {
                     width: 35px;
                     height: 35px;
                 }
            }

            .button {
                width: calc(50% - 12.5px);

                @media (max-width: ${Breakpoints.medium}) {
                    width: 100%;
                }
            }
        }

        .edit-channel-part__subtitle {
            width: 100%;
            margin-bottom: 25px;
            font-size: 14px;
            line-height: 16px;
            color: ${AppColor.black}
        }

        .edit-channel-part__error {
            position: absolute;
            top: -22px;
            left: 0;
            padding-left: 21px;
            margin: 0;
            font-size: 12px;
            line-height: 14px;
            color: ${GraphicColor.red};
        }

        .edit-channel-part__wrap {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;

            fieldset {
                margin-bottom: 20px;
                width: calc(50% - 12.5px);

                @media (max-width: ${Breakpoints.medium}) {
                    width: 100%;
                }
            }

            .edit-channel-part__phone-wrap {
                display: flex;
                width: calc(50% - 12.5px);
                margin-bottom: 20px;

                fieldset {
                    margin-bottom: 0;
                    width: calc(100% - 135px);

                    &:first-of-type {
                        width: 123px;
                        margin-right: 12px;
                    }
                }

                @media (max-width: ${Breakpoints.medium}) {
                    width: 100%;
                }
            }
        }

        .edit-channel-part__payment {
            display: flex;
            flex-direction: column;
            margin-bottom: 25px;
        }

        .edit-channel-part__payment {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 508px;
            padding: 45px 35px;
            background: #EBF3FD;
            border-radius: 8px;
            margin-bottom: 25px;

            @media (max-width: ${Breakpoints.large}) {
                width: 408px;
            }

            .edit-channel-part__payment-title {
                margin-bottom: 36px;
                font-size: 17px;
                line-height: 16px;
                color: ${AppColor.black};
            }

            .edit-channel-part__type {
                margin-bottom: 36px;
                font-size: 14px;
                line-height: 16px;
                color: ${AppColor.blue};
            }

            fieldset {
                width: 100%;

                p {
                    background-color: #EBF3FD;
                    color: ${GraphicColor.lightBlue};
                }

                input {
                    background-color: transparent;
                    color: ${GraphicColor.lightBlue};
                    border-color: ${GraphicColor.lightBlue};
                }
            }
        }
    }
`;
