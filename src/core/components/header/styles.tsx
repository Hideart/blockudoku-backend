import { css } from 'styled-components';
import { AppColor } from '@/core/models/enums/app-color';

export default css`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: fixed;
    left: 0px;
    top: 0;
    width: 100%;
    height: 4.643em;
    padding-left: 6.3em;
    background: ${AppColor.white};
    border-bottom: 1px solid ${AppColor.lightGrey};
    z-index: 10;

    .header-title {
        font-size: 0.9375rem;
        margin-right: auto;
    }

    .header-menu {
        display: flex;
        flex-direction: row;
    }

    .header-menu-item > button,
    .header-menu-item > a
    {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 3.571em;
        height: 3.571em;
        background: none;
        border: none;
    }

    .header-menu-item {
        margin-right: 1.071em;
    }

    .header-menu-item-user {
        margin-left: 1.071em;
    }

    .header-menu-user-avatar {
        width: 2.286em;
        height: 2.286em;
        border-radius: 50%;
    }

    .settings-button {
        margin-right: 1.071em;
        margin-left: 3.214em;
    }
`;
