import { css } from 'styled-components';
import { AppColor } from '@/core/models/enums/app-color';

export default css`
    display: flex;
    .tab {
        cursor: pointer;
        min-width: 120px;
        height: 32px;
        background: ${AppColor.searchGrey};
        max-width: max-content;
        color: ${AppColor.black};
        display: flex;
        align-items: center;
        justify-content: center;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        transition: all .3s;
        margin-right: 2px;
    }
    .tab_active {
        background: ${AppColor.blue};
        color: ${AppColor.white};
    }
`;
