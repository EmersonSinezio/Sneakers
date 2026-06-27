import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * Dynamic OG image generator.
 *
 * Usage:
 *   GET /api/og?title=Product%20Name&price=499&image=https://...
 *
 * Returns a 1200x630 PNG optimized for social sharing.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Sneakers";
  const price = searchParams.get("price") ?? "";
  const image = searchParams.get("image") ?? "";

  const formattedPrice = price
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(price))
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          background: "linear-gradient(135deg, #0B0B0F 0%, #1C1C1E 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative orbs */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(239,35,60,0.4) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212,255,0,0.3) 0%, transparent 70%)",
          }}
        />

        {/* Left: Text */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 80px",
            color: "white",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#D4FF00",
              }}
            />
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#D4FF00",
              }}
            >
              Sneakers · Performance
            </div>
          </div>

          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            {title}
          </div>

          {formattedPrice && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  background: "#EF233C",
                  color: "white",
                  padding: "8px 20px",
                  borderRadius: 999,
                  fontSize: 32,
                  fontWeight: 800,
                }}
              >
                {formattedPrice}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                · 10x sem juros
              </div>
            </div>
          )}

          <div
            style={{
              marginTop: 40,
              fontSize: 16,
              color: "rgba(255,255,255,0.5)",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            sneakers.com.br
          </div>
        </div>

        {/* Right: Product image */}
        {image && (
          <div
            style={{
              width: 520,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <img
              src={image}
              alt={title}
              width={420}
              height={420}
              style={{
                objectFit: "contain",
                filter: "drop-shadow(0 30px 60px rgba(239,35,60,0.4))",
                transform: "rotate(-8deg)",
              }}
            />
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
