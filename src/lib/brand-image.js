export const brandImageContentType = "image/png";

export const brandIconSize = {
  width: 512,
  height: 512,
};

export const brandShareSize = {
  width: 1200,
  height: 1200,
};

const logo =
  "https://res.cloudinary.com/dnitzkowt/image/upload/v1773581653/password_tcuqzo.png";

function buildContainerStyle({ width, height }) {
  return {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: "linear-gradient(145deg,#fef2f2 0%,#ffe4e6 60%,#fff7ed 100%)",
    padding: Math.round(width * 0.08),
    color: "#1c1917",
    fontFamily: "SF Pro Display, Arial, sans-serif",
  };
}

function buildTopBar(width) {
  return {
    display: "flex",
    alignItems: "center",
    gap: Math.round(width * 0.02),
    fontSize: Math.round(width * 0.035),
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#7f1d1d",
  };
}

function buildLogoContainer(width) {
  return {
    width: Math.round(width * 0.22),
    height: Math.round(width * 0.22),
    borderRadius: Math.round(width * 0.06),
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 30px 80px rgba(0,0,0,0.12)",
  };
}

export function renderBrandImage({ width, height }) {
  return (
    <div style={buildContainerStyle({ width, height })}>
      
      {/* Top Brand Bar */}
      <div style={buildTopBar(width)}>
        <img
          src={logo}
          width={Math.round(width * 0.06)}
          height={Math.round(width * 0.06)}
          style={{ borderRadius: 12 }}
        />
        StyleVault
      </div>

      {/* Main Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: Math.round(width * 0.05),
        }}
      >
        {/* Logo Card */}
        <div style={buildLogoContainer(width)}>
          <img
            src={logo}
            width={Math.round(width * 0.12)}
            height={Math.round(width * 0.12)}
          />
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: Math.round(width * 0.018),
          }}
        >
          <div
            style={{
              fontSize: Math.round(width * 0.12),
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1,
            }}
          >
            StyleVault
          </div>

          <div
            style={{
              fontSize: Math.round(width * 0.043),
              maxWidth: "82%",
              color: "rgba(28,25,23,0.75)",
              lineHeight: 1.3,
            }}
          >
            Premium booking pages for barbers, hair stylists, nail technicians
            and lash artists. Build your brand and accept appointments online.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: Math.round(width * 0.03),
          fontWeight: 600,
          color: "rgba(28,25,23,0.65)",
        }}
      >
        <div>stylevault.site</div>
        <div>Book • Grow • Manage</div>
      </div>
    </div>
  );
}