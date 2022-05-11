interface LayoutProps {
	columns: number;
}

export default {
	gridLayout: (
		props : LayoutProps,
		{ theme }
	) => ({
		display: 'grid',
		gridTemplateColumns: `${theme.spacing(40)} repeat(${props.columns - 1}, max-content)`,

		paddingBottom: theme.spacing(1),

		'&': {
			overflowX: 'auto'
		}
	}),

	gridCell: (
		props : LayoutProps,
		{ theme }
	) => ({
		minWidth: theme.spacing(10),
		padding: theme.spacing(1),

		'&': {
			textAlign: 'center',
		},

		/**
		 * First column
		 */
		[`&:nth-of-type(${props.columns}n + 1)`]: {
			textAlign: 'left',
		},

		/**
		 * Not first column
		 */
		[`&:not(:nth-of-type(${props.columns}n + 1))`]: {
			borderLeft: `1px solid #000`
		},

		/**
		 * Only even rows
		 */
		[Array.from(
			{length: props.columns},
			(_, i) => `&:nth-of-type(${props.columns * 2}n + ${i + 1})`).join(',')
		]: {
			background: 'rgba(0, 0, 0, 0.05)'
		},
	}),
};