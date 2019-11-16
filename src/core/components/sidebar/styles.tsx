import { css } from 'styled-components';
import { GraphicColor } from '@/core/models/enums/app-color';

export default css`
    .sb-expander {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: fixed;
        left: 0px;
        top: 0;
        max-width: 65px;
        height: 100%;
        background: ${GraphicColor.darkBlue};
        border-bottom: 1px solid #4995F1;
        transition: max-width .3s;
        z-index: 100;
    }

    .expanded {
        max-width: 100%;
    }

    .expanded * .sb-title,
    .expanded * .sbi-label {
        max-width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
    }

    .expanded .sidebar-item,
    .expanded .sbi-top {
        padding-right: 50px;
    }

    .expanded .sbi-bottom * {
        transform: rotate(180deg);
    }

    .expanded .sbi-bottom {
        background-color: #4995F1;
    }

    .sidebar-item,
    .sbi-top
    {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: 65px;
        cursor: pointer;
        padding: 0;
        transition: background-color .3s, padding-right .3s;
    }

    .sidebar-items:hover,
    .current{
        background-color: #4995F1;
    }

    .current img {
        opacity: 1!important;
    }

    .sbi-top{
        border-bottom: 1px solid #4995F1;
        cursor: default;
    }

    .sidebar-item img {
        opacity: 0.4;
        transition: opacity .3s;
    }

    .sidebar-items:hover img {
        opacity: 1;
    }

    .sbi-icon {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 65px;
        height: 65px;
    }

    .sbi-icon img {
        max-width: 32px;
        max-height: 32px;
    }

    .sb-title {
        font-family: Gilroy;
        font-size: 1.5rem;
        overflow-x: hidden;
        overflow-y: -webkit-paged-y;
        font-weight: bold;
    }

    .sbi-label {
        overflow-x: hidden;
        overflow-y: -webkit-paged-y;
        line-height: normal;
    }

    .sb-title,
    .sbi-label {
        white-space: nowrap;
        max-width: 0;
        transition: max-width .3s;
        line-height: normal;
    }

    .sbi-bottom {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        outline:none;
        margin-top: auto;
        padding: 0!important;
    }

    .sbi-bottom img {
        opacity: 1;
    }

    .sidebar-items {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .sidebar-subitem {
        display: none;
        width: 100%;
        height: 65px;
        padding-left: 65px;
        align-items: center;
        justify-content: flex-start;
    }

    .sb-expander.expanded .sidebar-items:hover .sidebar-subitem {
        display: flex;
    }
`;
