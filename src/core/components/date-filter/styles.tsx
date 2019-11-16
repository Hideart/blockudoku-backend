import { css } from 'styled-components';

export default css`
    display: flex;

    label {
        &:not(:last-of-type) {
            margin-right: 16px;
        }
    }
`;
