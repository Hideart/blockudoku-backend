    import { css } from 'styled-components';

    import loginBg from '@/assets/img/login_bg.jpg';
    import { AppColor, GraphicColor } from '@/core/models/enums/app-color';

    export default css`
        &.login {
            background-color: rgba(138, 190, 248, 0.46);
            height: 100%;
            width: 100%;
            background-image: url(${loginBg});
            background-size: contain;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
        }

        .login__title {
            margin: 0 auto;
            margin-bottom: 28px;
            font-size: 17px;
            line-height: 16px;
            color: ${GraphicColor.blue};
        }

        .login__error {
            position: absolute;
            top: -18px;
            left: 0;
            padding-left: 21px;
            margin: 0;
            font-size: 12px;
            line-height: 14px;
            color: ${GraphicColor.red};
        }

        .login__forget {
            margin-bottom: 25px;
            font-size: 12px;
            line-height: 14px;
            cursor: pointer;
            color: ${GraphicColor.blue};
        }

        .login__header {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 80px;
            padding: 0 40px;
            display: flex;
            align-items: center;
        }
        .login__content {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
        .login__form-wrapper {
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

                fieldset {
                    width: 100%;
                    margin-bottom: 24px;

                    &:last-of-type {
                        margin-bottom: 26px;
                    }
                }

                .button {
                    width: 100%;
                }
            }
        }
    `;
