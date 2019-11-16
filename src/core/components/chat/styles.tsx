import { css } from 'styled-components';
import { AppColor } from '@/core/models/enums/app-color';

export default css`
    &.chat {
        display: flex;
        flex-direction: column;
        background-color: #F8F9FA;

        & * {
            white-space: normal!important;
        }
    }

    .chat {

        &__heading {
            display: flex;
            align-items: center;
            padding: 32px 17px;
        }

        &__user {
            display: flex;
            align-items: center;

            &-avatar {
                position: relative;
                margin-right: 25px;

                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background-color: ${AppColor.blue};
                }

                &::after {
                    position: absolute;
                    content: '';
                    right: 2px;
                    top: 2px;
                    width: 11px;
                    height: 11px;
                    border: 2px solid #F8F9FA;
                    background-color: ${AppColor.blue};
                    border-radius: 50%;
                }
            }

            &-info {
                display: flex;
                flex-direction: column;
            }

            &-name {
                margin: 0;
                margin-bottom: 6px;
                font-size: 14px;
                line-height: 16px;
                color: #1D4745;
            }

            &-status {
                margin: 0;
                font-size: 14px;
                color: #8097B1;
            }
        }

        &__date {
            width: 100%;
            margin-bottom: 30px;
            text-align: center;
            font-size: 14px;
            line-height: 22px;
            color: #8097B1;
        }

        &__hide {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #ABD2FF;
            margin-right: 25px;
            border: none;

            svg {
                transform: translateX(-1px);
            }
        }

        &__main {
            position: relative;
            display: flex;
            flex-direction: column;
            padding: 36px 24px;
            padding-bottom: 114px;
            border-radius: 20px 20px 0px 0px;
            background-color: ${AppColor.white};
            overflow-y: scroll;
            flex-grow: 9999;
        }

        &__controls {
            position: absolute;
            height: 70px;
            width: calc(100% - 48px);
            bottom: 14px;
        }

        &__textarea {
            width: 100%;
            height: 100%;
            resize: none;
            padding: 16px 24px;
            padding-right: 64px;
            background: #F8F9FA;
            border-radius: 5px;
            border: none;
        }

        &__content {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            overflow-y: scroll;
        }

        &__submit {
            position: absolute;
            top: 50%;
            right: 18px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 46px;
            height: 46px;
            background-color: ${AppColor.blue};
            border-radius: 50%;
            transform: translateY(-50%);
            border: none;

            svg {
                transform: translateX(2px);
            }
        }

        &__item {
            display: flex;
            align-items: flex-end;

            &:not(:last-of-type) {
                margin-bottom: 40px;
            }

            &-avatar {
                width: 40px;
                height: 40px;
                margin-right: 8px;
                border-radius: 50%;
                background-color: ${AppColor.blue};
                flex-shrink: 0;
            }

            &-content {
                position: relative;
                padding: 23px 18px;
                padding-left: 25px;
                width: calc(100% - 96px);
                background-color: #E5EBF2;
                margin-bottom: 10px;
                border-radius: 20px 20px 20px 0;

                &::after {
                    position: absolute;
                    content: '';
                    bottom: -10px;
                    left: 0;
                    border: 10px solid transparent;
                    border-left: 10px solid #E5EBF2;
                }
            }

            &-time {
                position: absolute;
                bottom: 5px;
                right: 28px;
                font-size: 11px;
                line-height: 13px;
                color: ${AppColor.black};
            }

            &_self {
                flex-direction: row-reverse;

                .chat__item-content {
                    background-color: ${AppColor.blue};
                    color: ${AppColor.white};
                    border-radius: 20px 20px 0 20px;

                    &::after {
                        position: absolute;
                        content: '';
                        bottom: -10px;
                        right: 0;
                        left: auto;
                        border: 10px solid transparent;
                        border-right: 10px solid  ${AppColor.blue};
                    }
                }

                .chat__item-time {
                    color: ${AppColor.white};
                }

                .chat__item-avatar {
                    margin-right: 0;
                    margin-left: 8px;
                }
            }
        }
    }
`;
