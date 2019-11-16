import { css } from 'styled-components';

import loginBg from '@/assets/img/login_bg.jpg';
import { AppColor, GraphicColor } from '@/core/models/enums/app-color';

export default css`
    &.change-pass {
        background-color: rgba(138, 190, 248, 0.46);
        height: 100%;
        width: 100%;
        max-width: 1680px;
        margin: 0 auto;
        background-image: url(${loginBg});
        background-size: contain;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    .logo {
        img {
            width: 40px;
            height: 40px;
            margin-right: 22px;
        }

        font-size: 24px;
        line-height: 24px;
        color: ${AppColor.white};
    }

    .change-pass__title {
        margin: 0 auto;
        margin-bottom: 28px;
        font-size: 17px;
        line-height: 16px;
        color: ${GraphicColor.blue};
    }

    .change-pass__error {
        padding-left: 21px;
        margin: 0;
        margin-bottom: 8px;
        font-size: 12px;
        line-height: 14px;
        color: ${GraphicColor.red};
    }

    .change-pass__forget {
        margin-bottom: 25px;
        font-size: 12px;
        line-height: 14px;

        color: ${GraphicColor.blue};
    }

    .change-pass__header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        padding: 0 40px;
        display: flex;
        align-items: center;
    }
    .change-pass__content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    .change-pass__form-wrapper {
        display: flex;
        align-items: center;
        width: 518px;
        min-height: 332px;

        background: ${AppColor.white};
        border-radius: 10px;

        form {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 56px 60px;

            .input {
                width: 100%;

                &:not(:last-of-type) {
                    margin-bottom: 14px;
                }

                &:last-of-type {
                    margin-bottom: 25px;
                }
            }

            .button {
                width: 100%;
            }
        }
    }
`;
