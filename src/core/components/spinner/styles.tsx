import { css } from 'styled-components';

export default css`
    &.spinner {
        position: relative;
        width: 33px;
        height: 33px;

        span {
            position: absolute;
            width: 33.333%;
            height: 33.333%;
            border-radius: 50%;

            &:nth-of-type(1) {
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                background-color: #157DF1;
                animation-name: spinner;
                animation-duration: 1s;
                animation-iteration-count: infinite;
            }

            &:nth-of-type(2) {
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                background-color: #C5DFFB;
                animation-name: spinner;
                animation-duration: 1s;
                animation-iteration-count: infinite;
                animation-delay: 0.25s;
            }

            &:nth-of-type(3) {
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                background-color: #ABD2FF;
                animation-name: spinner;
                animation-duration: 1s;
                animation-iteration-count: infinite;
                animation-delay: 0.5s;
            }

            &:nth-of-type(4) {
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                background-color: #75B6FE;
                animation-name: spinner;
                animation-duration: 1s;
                animation-iteration-count: infinite;
                animation-delay: 0.75s;
            }
        }
    }

    @keyframes spinner {
        0% {
            background-color: #157DF1;
        }
        25% {
            background-color: #75B6FE;
        }
        50% {
            background-color: #ABD2FF;
        }
        75% {
            background-color:  #C5DFFB;
        }

        100% {
            background-color: #157DF1;
        }
    }
`;
