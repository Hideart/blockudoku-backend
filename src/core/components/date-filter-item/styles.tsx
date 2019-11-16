import { css } from 'styled-components';
import { AppColor } from '@/core/models/enums/app-color';

export default css`
    cursor: pointer;

    input {
        display: none;

        &:checked + span {
            color: ${AppColor.darkBlue};
        }
    }

    span {
        font-size: 14px;
        line-height: 16px;
        color: ${AppColor.black};
        transition: color .3s;
    }
`;
