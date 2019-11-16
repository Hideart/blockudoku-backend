import { css } from 'styled-components';
import { AppColor, GraphicColor } from '@/core/models/enums/app-color';

export default css`
    &.change-info {
        height: 100%;
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

            .input {
                margin-bottom: 30px;
                width: 598px;
            }

            .button {
                width: 331px;
            }

            .image-picker {
                margin-right: 81px;
            }
        }

        .change-info__error {
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
