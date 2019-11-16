import { css } from 'styled-components';
import { AppColor, GraphicColor } from '@/core/models/enums/app-color';

export default css`

    &&.table-scroll {
        display: flex;
        flex-direction: column;
    	position:relative;
    	margin:auto;
    	overflow:hidden;
        z-index: 1;
    }

    &&.is-fixed-user-col {
        padding-right: 5.357em;
    }

    .load-more-btn {
        margin: 1.43em auto;
    }

    .table-wrapper {
        display: block;
    	width:100%;
    	overflow-x:auto;
    }

    .data-table{
        width:100%;
	    margin:auto;
	    border-collapse:separate;
	    border-spacing:0;
	}

    .data-table thead tr th .dt-header-title {
        color: ${AppColor.black};
        text-align: left;
        white-space: nowrap;
	}

    .data-table td {
        font-weight: 600;
	}

	.data-table td,
    .data-table th {
        vertical-align: middle;
        height: 5.83em;
        min-width: 5.357em;
        white-space: nowrap;
	}

    .data-table th {
		background-color: ${AppColor.tableHead};
        padding: 0 10px;
	}

    .data-table tr {
		background-color: ${AppColor.white};
        cursor: pointer;
	}

    .data-table tr:hover,
    .data-table tr:nth-of-type(even):hover {
		background-color: #EBF3FD;
	}

    .data-table tr:nth-child(even) {
		background-color: ${AppColor.tableRowDark};
	}

    .table-cb {
        text-align: center!important;
        width: 5.357em;
    }

    .table-cb input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .table-cb input {
        border-radius: 0.17em;
        border: 1px solid ${GraphicColor.darkBlue};
    }

    .table-cb input:checked {
        background-color: ${GraphicColor.darkBlue};
    }

    .data-table .dt-sort-btn {
        display: flex;
        align-items: center;
        /* padding: 0.65em; */
        background: none;
        border: none;
    }

    .sorted-asc::after,
    .sorted-desc::after {
        margin-left: 0.65em;
        font-size: 0.7rem;
    }

    .sorted-asc::after {
        content: '▲';
    }

    .sorted-desc::after {
        content: '▼';
    }

    .data-table .user-column {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.7em;
        width: 5.357em;
        border-left: 1px solid ${AppColor.tableHead};
    }

    .data-table .sticky-col {
        position: absolute;
        right: 0;
    }

    .data-table tbody .sticky-col,
    .data-table tbody .table-cb {
        background-color: inherit;
    }
    .table-row {
        padding: 0 15px;
        color: ${AppColor.black};
    }

    .table-row * {
        color: ${AppColor.black};
    }
`;
