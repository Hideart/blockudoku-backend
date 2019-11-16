import { css } from 'styled-components';
import { AppColor, GraphicColor } from '@/core/models/enums/app-color';

import markerIcon from '@/assets/img/marker.svg';

export default css`
    &.graphic-bar {
        display: flex;
        flex-direction: column;
    }
    .graphic-bar {
        display: flex;
        flex-direction: column;

        &__item {
            display: flex;
            align-items: center;

            &:nth-of-type(1) {
                .graphic-bar__item-scale {
                    background-color: ${GraphicColor.pink};

                    .graphic-bar__item-value {
                        background-color: ${GraphicColor.red};
                    }
                }
            }

            &:nth-of-type(2) {
                .graphic-bar__item-scale {
                    background-color: ${GraphicColor.whiteBlue};

                    .graphic-bar__item-value {
                        background-color: ${GraphicColor.darkestBlue};
                    }
                }
            }

            &:nth-of-type(3) {
                .graphic-bar__item-scale {
                    background-color: ${GraphicColor.orangeLight};

                    .graphic-bar__item-value {
                        background-color:  ${GraphicColor.orange};
                    }
                }
            }

            &:nth-of-type(4) {
                .graphic-bar__item-scale {
                    background: ${GraphicColor.lightGreen};

                    .graphic-bar__item-value {
                        background: ${GraphicColor.green};
                    }
                }
            }

            &:not(:last-of-type) {
                margin-bottom: 25px;
            }
        }

        &__item-name {
            width: 47px;
            padding-right: 5px;
            margin: 0;
            margin-right: 14px;
            font-size: 14px;
            line-height: 16px;
            color: ${AppColor.black};
        }

        &__item-scale {
            border-radius: 4px;
            height: 35px;
            flex-grow: 9;
        }

        &__item-value  {
            position: relative;
            height: 100%;
            cursor: pointer;
            border-radius: 4px;

            &:hover {
                span {
                    opacity: 1;
                }
            }

            span {
                position: absolute;
                bottom: 100%;
                right: 0;
                padding-bottom: 43px;
                font-size: 14px;
                line-height: 16px;
                color: #2F80ED;
                transform: translateX(50%);
                opacity: 0;
                transition: opacity .3s;

                &::after {
                    position: absolute;
                    bottom: 0;
                    right: 50%;
                    content: '';
                    width: 35px;
                    height: 39px;
                    background-image: url(${markerIcon});
                    background-size: contain;
                    background-repeat: no-repeat;
                    transform: translateX(50%);
                }
            }
        }
    }
`;