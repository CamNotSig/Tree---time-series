import { useState } from "react";

// ── palette ──────────────────────────────────────────────────────────────
const C = {
  bg:       "#f4f7f2",
  bg2:      "#eaf0e6",
  border:   "#c8dcc0",
  muted:    "#7a9470",
  dim:      "#aabca4",

  root:     "#2d6a2d",   // DATOS ECONOMÉTRICOS
  types:    "#3a7d3a",   // sección cruzada / series / panel
  inactive: "#b0c8aa",   // ramas cerradas (Cross / Panel)

  // series de tiempo
  st_root:  "#2d6a2d",
  estac:    "#3a7d3a",
  nonest:   "#5a8f3a",
  ets:      "#7aaa3a",
  nonlin:   "#4a9a6a",
  fda:      "#3a8a7a",
  ml:       "#3a6a9a",

  tag_bg:   "#d4edcc",
  tag_text: "#2d6a2d",
  badge_bg: "#e8f5e2",
};

// ── tag renderer ─────────────────────────────────────────────────────────
function Tags({ tags }) {
  if (!tags) return null;
  const list = tags.split(",").map(t => t.trim());
  return (
    <span style={{ display: "inline-flex", gap: 3, marginLeft: 6, flexShrink: 0 }}>
      {list.map(t => {
        const isPred = t === "+";
        const isDiag = t === "−";
        return (
          <span key={t} style={{
            fontSize: 8,
            fontFamily: "monospace",
            padding: "1px 4px",
            borderRadius: 3,
            background: isPred ? "#d4f0d4" : isDiag ? "#f0e4d4" : C.badge_bg,
            color: isPred ? "#256025" : isDiag ? "#805020" : C.tag_text,
            border: `1px solid ${isPred ? "#a8d8a8" : isDiag ? "#d4b090" : C.border}`,
            fontWeight: 600,
          }}>{t}</span>
        );
      })}
    </span>
  );
}

// ── tree data ─────────────────────────────────────────────────────────────
const treeData = {
  name: "DATOS ECONOMÉTRICOS",
  color: C.root,
  bold: true,
  children: [
    {
      name: "Sección Cruzada (Cross-sectional)",
      color: C.inactive,
      locked: true,
      desc: "Foto de N unidades en un solo momento. Comparaciones estáticas.",
    },
    {
      name: "Datos de Panel (Longitudinales)",
      color: C.inactive,
      locked: true,
      desc: "Mismas unidades observadas en múltiples períodos. Cross + Time.",
    },
    {
      name: "Series de Tiempo (Time Series)",
      color: C.st_root,
      desc: "Variable observada secuencialmente a intervalos regulares.",
      children: [
        // ── ESTACIONARIAS ────────────────────────────────────────
        {
          name: "ESTACIONARIAS",
          color: C.estac,
          children: [
            {
              name: "Determinísticas",
              color: C.estac,
              children: [
                { name: "Tendencia lineal",             tags: "C, D, EC, +" },
                { name: "Tendencia polinomial",          tags: "C, D, EC, +" },
                { name: "Componente estacional fija",    tags: "C, D, EC, +" },
              ],
            },
            {
              name: "Estocásticas · Modelos de Media",
              color: C.estac,
              children: [
                { name: "White Noise",                   tags: "C, E, EC, −" },
                { name: "AR(p) — Autorregresivo",        tags: "C, E, EC, +" },
                { name: "MA(q) — Media Móvil",           tags: "C, E, EC, +" },
                { name: "ARMA(p,q)",                     tags: "C, E, EC, +" },
                {
                  name: "Memoria Larga",
                  color: C.estac,
                  children: [
                    { name: "ARFIMA(p,d,q) — Granger & Joyeux 1980", tags: "C, E, EC, +" },
                    { name: "FGN — Ruido Gaussiano fraccional",       tags: "E, −" },
                  ],
                },
              ],
            },
            {
              name: "Estocásticas · Modelos de Varianza",
              color: C.estac,
              children: [
                { name: "ARCH(q) — Engle 1982",          tags: "C, E, EC, +" },
                { name: "GARCH(p,q)",                    tags: "C, E, EC, +" },
                { name: "EGARCH — Asimétrico",           tags: "E, EC, +" },
                { name: "GJR-GARCH — Efecto leverage",   tags: "E, EC, +" },
                { name: "FIGARCH — Memoria larga",       tags: "E, EC, +" },
              ],
            },
          ],
        },

        // ── NO ESTACIONARIAS ─────────────────────────────────────
        {
          name: "NO ESTACIONARIAS",
          color: C.nonest,
          children: [
            {
              name: "Con Tendencia Determinística",
              color: C.nonest,
              children: [
                { name: "Regresión con tendencia + errores AR", tags: "C, D, EC, +" },
                { name: "Descomposición STL",                   tags: "EC, +" },
              ],
            },
            {
              name: "Con Raíz Unitaria",
              color: C.nonest,
              children: [
                { name: "Random Walk",                  tags: "C, EC, +" },
                { name: "Random Walk con deriva",       tags: "C, EC, +" },
                {
                  name: "Familia ARIMA",
                  color: C.nonest,
                  children: [
                    { name: "ARIMA(p,d,q)",             tags: "C, EC, +" },
                    { name: "SARIMA — Estacional",      tags: "C, EC, +" },
                    { name: "ARIMAX — Con exógenas",    tags: "C, EC, +" },
                  ],
                },
              ],
            },
            {
              name: "Modelos Multivariados",
              color: C.nonest,
              children: [
                { name: "VAR — Vectorial",              tags: "C, E, EC, +" },
                { name: "VARMA",                        tags: "C, E, EC, +" },
                { name: "VECM — Cointegración",         tags: "C, EC, +" },
                { name: "SVAR — Estructural",           tags: "C, EC, −" },
              ],
            },
            {
              name: "Con Quiebre Estructural",
              color: C.nonest,
              children: [
                { name: "Chow Test",                    tags: "C, EC, −" },
                { name: "Bai-Perron — Múltiples quiebres", tags: "EC, −" },
                { name: "Markov Switching (MS-AR)",     tags: "EC, +" },
              ],
            },
          ],
        },

        // ── ETS ──────────────────────────────────────────────────
        {
          name: "SUAVIZAMIENTO EXPONENCIAL (ETS)",
          color: C.ets,
          children: [
            {
              name: "Sin tendencia ni estacionalidad",
              color: C.ets,
              children: [
                { name: "SES — Simple  ≈ ARIMA(0,1,1)", tags: "C, EC, +" },
              ],
            },
            {
              name: "Con Tendencia",
              color: C.ets,
              children: [
                { name: "Holt — Tendencia aditiva",     tags: "C, EC, +" },
                { name: "Holt amortiguado (Damped)",     tags: "EC, +" },
              ],
            },
            {
              name: "Con Tendencia y Estacionalidad",
              color: C.ets,
              children: [
                { name: "Holt-Winters Aditivo",          tags: "C, EC, +" },
                { name: "Holt-Winters Multiplicativo",   tags: "C, EC, +" },
              ],
            },
            {
              name: "Framework Estado-Espacio (ETS)",
              color: C.ets,
              children: [
                { name: "ETS(A,N,N)",  tags: "EC, +" },
                { name: "ETS(A,A,N)",  tags: "EC, +" },
                { name: "ETS(A,A,A)",  tags: "EC, +" },
                { name: "ETS(M,Ad,M)", tags: "EC, +" },
              ],
            },
          ],
        },

        // ── NO LINEALES ──────────────────────────────────────────
        {
          name: "MODELOS NO LINEALES",
          color: C.nonlin,
          children: [
            { name: "TAR — Threshold autoregressive",         tags: "EC, +" },
            { name: "STAR — Smooth transition AR",            tags: "EC, +" },
            { name: "SETAR — Self-exciting threshold AR",     tags: "EC, +" },
            { name: "TGARCH — Threshold GARCH",               tags: "EC, +" },
          ],
        },

        // ── FDA ──────────────────────────────────────────────────
        {
          name: "DATOS FUNCIONALES (FDA)",
          color: C.fda,
          children: [
            {
              name: "Funcionales Estacionarios",
              color: C.fda,
              children: [
                { name: "ARH(1) / FAR(1) — Bosq 2000", tags: "E, +" },
                { name: "ARH(p)",                       tags: "E, +" },
                { name: "ARHD — Con derivada",          tags: "E, +" },
                { name: "CARH / ARHX — Con exógenas",   tags: "E, +" },
              ],
            },
            {
              name: "Funcionales con Estacionalidad",
              color: C.fda,
              children: [
                { name: "SFAR — Estacional funcional",  tags: "E, +" },
                { name: "FARMA — Funcional ARMA",       tags: "E, +" },
                { name: "FMA — Media móvil funcional",  tags: "E, +" },
                { name: "SARMAHX",                      tags: "E, +" },
              ],
            },
            {
              name: "Métodos de Estimación FDA",
              color: C.fda,
              children: [
                { name: "FPCA — Componentes funcionales", tags: "−" },
                { name: "B-Splines",                      tags: "−" },
                { name: "Wavelets",                       tags: "−" },
                { name: "RKHS — Kernel Hilbert",          tags: "−" },
              ],
            },
          ],
        },

        // ── ML ───────────────────────────────────────────────────
        {
          name: "MACHINE LEARNING / IA",
          color: C.ml,
          children: [
            { name: "Random Forest",                tags: "+" },
            { name: "Gradient Boosting / XGBoost",  tags: "+" },
            { name: "LSTM — Redes recurrentes",      tags: "+" },
            { name: "Transformer para series",       tags: "+" },
            { name: "Prophet (Meta/Facebook)",       tags: "+" },
          ],
        },
      ],
    },
  ],
};

// ── TreeNode ──────────────────────────────────────────────────────────────
function TreeNode({ node, depth = 0 }) {
  const isLocked = node.locked;
  const hasChildren = !isLocked && node.children && node.children.length > 0;
  const [collapsed, setCollapsed] = useState(depth >= 2);

  const nodeColor = node.color || C.muted;
  const isLeaf = !hasChildren && !isLocked;
  const isTopType = depth === 1; // Sección cruzada / Panel / ST

  return (
    <div style={{ marginLeft: depth === 0 ? 0 : 16 }}>
      <div
        onClick={() => hasChildren && setCollapsed(!collapsed)}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 7,
          padding: isLeaf ? "3px 8px" : "5px 10px",
          margin: "2px 0",
          borderRadius: 6,
          cursor: hasChildren ? "pointer" : "default",
          background: isLocked
            ? "#f0f4ee"
            : hasChildren
              ? `${nodeColor}18`
              : "transparent",
          border: isLocked
            ? `1px dashed ${C.border}`
            : hasChildren
              ? `1px solid ${nodeColor}40`
              : "none",
          opacity: isLocked ? 0.65 : 1,
        }}
      >
        {/* dot */}
        <div style={{
          width: depth === 0 ? 10 : depth === 1 ? 8 : depth === 2 ? 7 : 6,
          height: depth === 0 ? 10 : depth === 1 ? 8 : depth === 2 ? 7 : 6,
          borderRadius: "50%",
          background: nodeColor,
          flexShrink: 0,
          marginTop: 3,
        }} />

        {/* text block */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{
              color: depth <= 1 ? nodeColor : depth === 2 ? nodeColor : "#3a5030",
              fontSize: depth === 0 ? 14 : depth === 1 ? 12 : depth === 2 ? 11 : 10.5,
              fontWeight: depth <= 1 ? 800 : depth === 2 ? 700 : 400,
              fontFamily: "monospace",
              letterSpacing: depth <= 1 ? "1.2px" : "0.3px",
              textTransform: depth <= 1 ? "uppercase" : "none",
            }}>
              {node.name}
            </span>
            {node.tags && <Tags tags={node.tags} />}
            {isLocked && (
              <span style={{
                fontSize: 8, color: C.muted, marginLeft: 6,
                fontFamily: "monospace", fontStyle: "italic",
              }}>no desplegado</span>
            )}
          </div>
          {node.desc && (
            <div style={{ color: C.muted, fontSize: 8.5, fontFamily: "monospace", marginTop: 1 }}>
              {node.desc}
            </div>
          )}
        </div>

        {/* chevron */}
        {hasChildren && (
          <span style={{
            color: nodeColor,
            fontSize: 10,
            transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            flexShrink: 0,
            marginTop: 3,
          }}>▾</span>
        )}
      </div>

      {hasChildren && !collapsed && (
        <div style={{
          borderLeft: `2px solid ${nodeColor}30`,
          marginLeft: 10,
          paddingLeft: 4,
        }}>
          {node.children.map((child, i) => (
            <TreeNode key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Legend ────────────────────────────────────────────────────────────────
function Legend() {
  const items = [
    { tag: "C",  label: "Clásico",                 bg: C.badge_bg,  border: C.border,  text: C.tag_text },
    { tag: "D",  label: "Determinístico",           bg: C.badge_bg,  border: C.border,  text: C.tag_text },
    { tag: "E",  label: "Estacionario",             bg: C.badge_bg,  border: C.border,  text: C.tag_text },
    { tag: "EC", label: "Usado en econometría",     bg: C.badge_bg,  border: C.border,  text: C.tag_text },
    { tag: "+",  label: "Predicción",               bg: "#d4f0d4",   border: "#a8d8a8", text: "#256025" },
    { tag: "−",  label: "Análisis / diagnóstico",   bg: "#f0e4d4",   border: "#d4b090", text: "#805020" },
  ];
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16,
      padding: "10px 14px",
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
    }}>
      <span style={{ fontSize: 9, color: C.muted, letterSpacing: 2, textTransform: "uppercase", width: "100%", marginBottom: 2 }}>
        Marcación
      </span>
      {items.map(it => (
        <div key={it.tag} style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{
            fontSize: 8, fontFamily: "monospace", fontWeight: 700,
            padding: "1px 5px", borderRadius: 3,
            background: it.bg, border: `1px solid ${it.border}`, color: it.text,
          }}>{it.tag}</span>
          <span style={{ fontSize: 8.5, color: C.muted, fontFamily: "monospace" }}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, padding: "28px 20px", fontFamily: "monospace" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>

        {/* header */}
        <p style={{ color: C.dim, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 4px" }}>
          Econometría · Taxonomía de datos
        </p>
        <h1 style={{ color: C.root, fontSize: 18, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 4px" }}>
          Tipos de Datos → Series de Tiempo
        </h1>
        <p style={{ color: C.dim, fontSize: 9, margin: "0 0 16px" }}>
          Click para expandir / colapsar · Cross-sectional y Panel no desplegados
        </p>
        <div style={{ height: 1, background: `linear-gradient(90deg, ${C.root}60, transparent)`, marginBottom: 18 }} />

        {/* tree */}
        <div style={{
          background: "#fff",
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          padding: "18px 16px",
          boxShadow: "0 1px 6px rgba(60,100,40,0.07)",
        }}>
          <TreeNode node={treeData} depth={0} />
        </div>

        <Legend />

      </div>
    </div>
  );
}