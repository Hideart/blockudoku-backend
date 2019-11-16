import { css } from 'styled-components';
import { AppColor, GraphicColor } from '@/core/models/enums/app-color';

export default css`
    position: relative;

    .custom-select__placeholder {
        position: absolute;
        color: ${GraphicColor.darkBlue};
        top: -10px;
        left: 16px;
        padding: 0 5px;
        font-size: 12px;
        line-height: 16px;
        background-color: ${AppColor.white};
        transition: all .3s;
        pointer-events: none;
        user-select: none;
        will-change: transform;
    }

    .select {
        &__control {
            position: relative;
            padding: 8px 17px;
            width: 100%;
            border: none;
            font-size: 14px;
            line-height: 16px;
            color: ${AppColor.black};
            border-radius: 16px;
            border: 1px solid ${AppColor.contrastGrey};
            -moz-appearance: textfield;
            transition: border .3s;
            min-height: auto;

            &::after {
                position: absolute;
                content: '';
                right: 16px;
                top: calc(50% + 2px);
                transform: translateY(-50%);
                border: 3px solid transparent; border-top: 4px solid ${GraphicColor.darkBlue};
            }

            &--menu-is-open {
                &::after {
                    top: calc(50% - 2px);
                    border: 3px solid transparent; border-bottom: 4px solid ${GraphicColor.darkBlue};
                }
            }
        }

        &__indicators {
            display: none;
        }

        &__menu {
            margin: 0;
            padding: 0;
            top: 36px;
            left: auto;
            z-index: 100;

            background-color: ${AppColor.white};
            box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
            border-radius: 5px;
        }

        &__menu-list {
            padding: 0;
        }

        &__value-container {
            padding: 0;
        }

        &__option {
            padding: 7px 15px;
            font-size: 13px;
            line-height: 20px;
            color: #828282;
            cursor: pointer;

            &--is-selected {
               color:  ${GraphicColor.darkBlue};
               background-color:  ${GraphicColor.lightBlue};
            }
         }

        &__placeholder {
            font-size: 12px;
            line-height: 16px;
            color: #1D4745;
        }

        &__placeholder,
        &__single-value {
            & + div {
                padding: 0;
                margin: 0;
            }
        }
    }
`;
