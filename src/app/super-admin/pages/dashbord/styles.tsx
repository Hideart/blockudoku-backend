import { css } from 'styled-components';
import { AppColor, GraphicColor } from '@/core/models/enums/app-color';
import { Breakpoints } from '@/core/models/enums/breakpoints';

export default css`
    &.dashboard {
        padding: 26px;
    }

    .dashboard {

        &__filters {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 26px;
        }

        &__content {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .card {
                width: calc(20% - 13px);
                margin-bottom: 20px;

                @media (max-width: ${Breakpoints.large}) {
                    padding: 24px;
                }
            }

            .graphic-bar {
                width: 100%;
            }

            .graphic-pie {
                margin-right: 84px;
            }

            .graphicLine {
                width: 100%;
            }
        }

        &__graphic {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            padding: 36px;
            padding-right: 50px;
            margin-bottom: 20px;
            border: 1px solid ${AppColor.contrastGrey};
            border-radius: 8px;

            dl {
                position: relative;
                display: flex;
                padding-left: 17px;

                &:not(:last-of-type) {
                    margin-bottom: 16px;
                }

                &::before {
                    position: absolute;
                    content: '';
                    left: 0;
                    bottom: 1px;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                }

                &:nth-last-of-type(4) {
                    &::before {
                        background-color: ${GraphicColor.darkBlue};
                    }
                }

                &:nth-last-of-type(3) {
                    &::before {
                        background-color: ${GraphicColor.blue};
                    }
                }

                &:nth-last-of-type(2) {
                    &::before {
                        background-color: ${GraphicColor.lightBlue};
                    }
                }

                &:nth-last-of-type(1) {
                    &::before {
                        background-color: ${GraphicColor.whiteBlue};
                    }
                }

                dt,
                dd {
                    margin:0;
                    padding: 0;
                    font-size: 14px;
                    line-height: 16px;
                    color: ${AppColor.black};
                }

                dt {
                    margin-right: 5px;
                    font-weight: bold;
                }
            }

            &_medium {
                width: calc(50% - 10px);

                @media (max-width: ${Breakpoints.large}) {
                    flex-direction: column;
                    align-items: center;

                    .graphic-pie {
                        margin-right: 0;
                        margin-bottom: 20px;
                    }
                }
            }

            &_big {
                width: 100%;
            }

            &_small {
                width: calc(33.3% - 10px);
                align-items: flex-start;

                .graphic-pie {
                    margin-right: 48px;
                }

                @media (max-width: ${Breakpoints.large}) {
                    flex-direction: column;
                    align-items: center;

                    .graphic-pie {
                        margin-right: 0;
                        margin-bottom: 20px;
                    }
                }
            }

            &_red {
                .dashboard__graphic-subtitle {
                    &::before {
                        background-color: #F0425F;
                    }
                }
            }

            &_green {
                .dashboard__graphic-subtitle {
                    &::before {
                        background-color: #3DCA6A;
                    }
                }
            }
        }

        &__graphic-aside {
            display: flex;
            flex-direction: column;
            flex-grow: 5;

            .custom-select {
                margin-bottom: 35px;
            }
        }

        &__graphic-title {
            width: 100%;
            margin: 0;
            margin-bottom: 22px;
            font-size: 17px;
            line-height: 16px;
            color: ${AppColor.black};
        }

        &__graphic-subtitle {
            position: relative;
            width: 100%;
            margin: 0;
            margin-bottom: 40px;
            padding-left: 20px;
            font-size: 14px;
            line-height: 16px;
            color: #20287A;

            &::before {
                position: absolute;
                content: '';
                left: 0;
                top: 50%;
                width: 12px;
                height: 12px;
                background-color: #157DF1;
                border-radius: 50%;
                transform: translateY(-50%);
            }
        }

        &__wrap {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            width: 100%;

            .custom-select {
                margin-bottom: 25px;

                &:not(:last-of-type) {
                    margin-right: 12px;
                }

                &:nth-of-type(1) {
                    width: 138px;
                    margin-left: auto;
                }

                &:nth-of-type(2) {
                    width: 138px;
                }

                &:nth-of-type(3) {
                    width: 343px;
                }
            }
        }
    }
`;
