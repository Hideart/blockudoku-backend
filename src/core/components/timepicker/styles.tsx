import { css } from 'styled-components';
import { AppColor } from '@/core/models/enums/app-color';

import ClockIcon from '@/assets/img/clock.svg';

export default css`

    &.CustomTimepicker {
        display: flex;

        &__wrap {
            width: 155px;
            position: relative;

            &::after {
                position: absolute;
                content: '';
                top: 50%;
                right: 19px;
                width: 16px;
                height: 16px;
                background-image: url(${ClockIcon});
                transform: translateY(-50%);
                background-size: contain;
            }

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
            }

            &:not(:last-of-type) {
                margin-right: 12px;
            }

            p {
                position: absolute;
                top: -8px;
                left: 11px;
                padding: 0 5px;
                font-size: 14px;
                line-height: 16px;
                color: ${AppColor.lightGrey};
                background-color: ${AppColor.white};
                transition: all .3s;
                pointer-events: none;
                user-select: none;
                will-change: transform;
            }

            .react-datepicker {
                color: ${AppColor.black};
                font-family: Stolzl;
                border: none;
                box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
                border-radius: 5px;

                .react-datepicker__triangle::before {
                    border-bottom: none;
                }

                &__current-month {
                    font-weight: normal;
                }

                &__header {
                    border-bottom: none;
                }

                &__day {
                    transition: all .3s;
                    will-change: transform;

                    &--selected {
                        border-radius: 5px;
                        background-color: ${AppColor.darkBlue};
                    }

                    &--in-range {
                        background-color: ${AppColor.lightBlue};
                    }
                }

                &__time-container {
                    width: 130px;
                }

                &__time-box {
                    width: 100%!important;
                }
            }
        }
    }
`;
