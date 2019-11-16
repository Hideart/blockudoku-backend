import { css } from 'styled-components';
import { AppColor, GraphicColor } from '@/core/models/enums/app-color';

export default css`
    &.card {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 36px;
        background-color: ${AppColor.lightGrey};
        border-radius: 8px;

        &__title {
            margin: 0;
            margin-bottom: 20px;
            font-size: 17px;
            line-height: 16px;
            color: ${AppColor.grey};
            white-space: pre-line;
        }

        &__value {
            margin: 0;
            font-size: 18px;
            line-height: 22px;
            color: ${GraphicColor.darkBlue};
            white-space: pre-line;
        }
    }


`;
