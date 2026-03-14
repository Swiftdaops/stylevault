export const brandImageContentType = 'image/png';

export const brandIconSize = {
	width: 512,
	height: 512,
};

export const brandShareSize = {
	width: 1200,
	height: 1200,
};

function buildContainerStyle({ width, height }) {
	return {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		background: 'linear-gradient(135deg, #fff7ed 0%, #fde68a 50%, #fb7185 100%)',
		padding: Math.round(width * 0.08),
		color: '#1c1917',
		fontFamily: 'Arial, sans-serif',
	};
}

function buildBadgeStyle(width) {
	return {
		display: 'flex',
		alignItems: 'center',
		padding: `${Math.round(width * 0.01)}px ${Math.round(width * 0.022)}px`,
		borderRadius: 9999,
		border: '2px solid rgba(28, 25, 23, 0.16)',
		background: 'rgba(255,255,255,0.7)',
		fontSize: Math.round(width * 0.03),
		fontWeight: 700,
		letterSpacing: '0.08em',
		textTransform: 'uppercase',
	};
}

function buildMarkStyle(width) {
	return {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: Math.round(width * 0.2),
		height: Math.round(width * 0.2),
		borderRadius: Math.round(width * 0.055),
		background: '#1c1917',
		color: '#fbbf24',
		fontSize: Math.round(width * 0.085),
		fontWeight: 800,
		letterSpacing: '-0.04em',
		boxShadow: '0 24px 60px rgba(28, 25, 23, 0.22)',
	};
}

export function renderBrandImage({ width, height }) {
	return (
		<div style={buildContainerStyle({ width, height })}>
			<div style={buildBadgeStyle(width)}>StyleVault</div>

			<div style={{ display: 'flex', flexDirection: 'column', gap: Math.round(width * 0.045) }}>
				<div style={buildMarkStyle(width)}>SV</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: Math.round(width * 0.018) }}>
					<div
						style={{
							fontSize: Math.round(width * 0.11),
							fontWeight: 800,
							lineHeight: 1,
							letterSpacing: '-0.05em',
						}}
					>
						StyleVault
					</div>
					<div
						style={{
							maxWidth: '82%',
							fontSize: Math.round(width * 0.043),
							lineHeight: 1.25,
							color: 'rgba(28, 25, 23, 0.86)',
						}}
					>
						Best barbers and hair specialists. Shareable booking pages that look premium on every screen.
					</div>
				</div>
			</div>

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					fontSize: Math.round(width * 0.03),
					fontWeight: 700,
					color: 'rgba(28, 25, 23, 0.72)',
				}}
			>
				<div>stylevault.site</div>
				<div>Book online • Grow your brand</div>
			</div>
		</div>
	);
}