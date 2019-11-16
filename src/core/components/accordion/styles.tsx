import { css } from 'styled-components';
import { AppColor } from '@/core/models/enums/app-color';
import arrowAccordion from '@/assets/img/slidedown.svg';

export default css`
    &.accordion {
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        border: 1px solid #E8E9EB;
        overflow: hidden;

        &_opened {
            .accordion__heading {
                &::after {
                    transform: rotate(180deg) translateY(50%);
                }
            }
        }
    }

    .accordion {
        &__heading {
            position: relative;
            display: flex;
            align-items: center;
            padding: 35px;
            height: 95px;
            background-color: #EBF3FD;
            cursor: pointer;

            &::after {
                position: absolute;
                content:'';
                top: 50%;
                right: 34px;
                width: 10px;
                height: 6px;
                background-image: url(${arrowAccordion});
                transform: translateY(-50%);
            }

            p {
                font-size: 14px;
                line-height: 16px;
                color: ${AppColor.blue};
            }
        }

        &__content {
            padding: 35px;
            padding-top: 40px;
        }
    }
`;