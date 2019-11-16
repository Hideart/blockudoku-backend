import { css } from 'styled-components';
import { AppColor } from '@/core/models/enums/app-color';

export default css`
    .reports {
        &__top-tools {
            display: flex;
            padding: 26px 28px;

            .CustomDatepicker {
                position: relative;
                margin-right: 23px;
                z-index: 3;
            }

            .custom-select {
                position: relative;
                width: 181px;
                z-index: 3;

                &:not(:last-of-type) {
                    margin-right: 25px;
                }

                &:last-of-type {
                    margin-right: 29px;
                }
            }

            .button {
                &:not(:last-of-type) {
                    margin-right: 12px;
                }

                svg {
                    path {
                        stroke: unset;
                    }
                }

                &:hover {
                    svg {
                        path {
                            fill: ${AppColor.white};
                        }
                    }
                }
            }
        }
    }
`;
