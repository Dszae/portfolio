<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
    xmlns:html="http://www.w3.org/TR/REC-html40"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Dipesh Sapkota</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, follow" />
        <style type="text/css">
          :root {
            --bg: #0B0F0E;
            --surface: #121A16;
            --surface-hover: #17241F;
            --border: #22352B;
            --border-subtle: #192921;
            --mint: #34D399;
            --mint-dark: #065F46;
            --mint-glow: rgba(52, 211, 153, 0.15);
            --text-primary: #F1F5F9;
            --text-secondary: #94A3B8;
            --text-muted: #64748B;
            --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            background-color: var(--bg);
            color: var(--text-primary);
            font-family: var(--font-sans);
            font-size: 14px;
            line-height: 1.5;
            padding: 32px 20px;
            -webkit-font-smoothing: antialiased;
          }

          .container {
            max-width: 1100px;
            margin: 0 auto;
          }

          header {
            margin-bottom: 28px;
            padding-bottom: 24px;
            border-bottom: 1px solid var(--border);
          }

          .badge-row {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;
          }

          .pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 600;
            padding: 4px 10px;
            border-radius: 9999px;
            background: var(--mint-glow);
            color: var(--mint);
            border: 1px solid rgba(52, 211, 153, 0.3);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .pill-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--mint);
          }

          h1 {
            font-size: 26px;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: var(--text-primary);
            margin-bottom: 8px;
          }

          h1 span {
            color: var(--mint);
          }

          p.lead {
            color: var(--text-secondary);
            font-size: 14px;
            max-width: 760px;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 14px;
            margin-bottom: 28px;
          }

          .stat-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 16px 18px;
          }

          .stat-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-muted);
            font-family: var(--font-mono);
            font-weight: 600;
            margin-bottom: 4px;
          }

          .stat-value {
            font-size: 24px;
            font-weight: 700;
            color: var(--text-primary);
            font-feature-settings: "tnum";
          }

          .stat-value.highlight {
            color: var(--mint);
          }

          .info-banner {
            background: rgba(6, 95, 70, 0.15);
            border: 1px solid rgba(52, 211, 153, 0.25);
            border-radius: 10px;
            padding: 12px 16px;
            margin-bottom: 24px;
            display: flex;
            align-items: flex-start;
            gap: 12px;
            color: #D1FAE5;
            font-size: 13px;
          }

          .info-banner strong {
            color: #FFFFFF;
          }

          .table-wrap {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          }

          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
          }

          th {
            background: #0E1612;
            padding: 12px 16px;
            font-size: 11px;
            font-family: var(--font-mono);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: var(--text-muted);
            border-bottom: 1px solid var(--border);
          }

          td {
            padding: 14px 16px;
            border-bottom: 1px solid var(--border-subtle);
            font-size: 13px;
            vertical-align: middle;
          }

          tr:last-child td {
            border-bottom: none;
          }

          tr:hover td {
            background: var(--surface-hover);
          }

          td.url-cell {
            font-family: var(--font-mono);
            font-size: 12.5px;
            font-weight: 500;
            word-break: break-all;
          }

          td.url-cell a {
            color: var(--mint);
            text-decoration: none;
            transition: color 0.15s ease;
          }

          td.url-cell a:hover {
            color: #6EE7B7;
            text-decoration: underline;
          }

          .badge-sitelink {
            display: inline-block;
            font-family: var(--font-mono);
            font-size: 10px;
            font-weight: 700;
            padding: 2px 7px;
            border-radius: 4px;
            background: rgba(52, 211, 153, 0.18);
            color: #34D399;
            border: 1px solid rgba(52, 211, 153, 0.35);
            text-transform: uppercase;
          }

          .badge-resource {
            display: inline-block;
            font-family: var(--font-mono);
            font-size: 10px;
            font-weight: 600;
            padding: 2px 7px;
            border-radius: 4px;
            background: rgba(148, 163, 184, 0.1);
            color: #94A3B8;
            border: 1px solid rgba(148, 163, 184, 0.2);
            text-transform: uppercase;
          }

          .priority-bar {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-family: var(--font-mono);
            font-size: 12px;
            font-weight: 600;
          }

          .priority-high {
            color: var(--mint);
          }

          .priority-med {
            color: #FBBF24;
          }

          .priority-std {
            color: var(--text-secondary);
          }

          .freq-tag {
            font-family: var(--font-mono);
            font-size: 11px;
            color: var(--text-muted);
            text-transform: capitalize;
          }

          .image-count {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 600;
            color: var(--text-secondary);
          }

          footer {
            margin-top: 28px;
            padding-top: 20px;
            border-top: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: gap;
            color: var(--text-muted);
            font-size: 12px;
          }

          footer a {
            color: var(--mint);
            text-decoration: none;
          }

          footer a:hover {
            text-decoration: underline;
          }

          @media (max-width: 768px) {
            body {
              padding: 16px 12px;
            }
            th:nth-child(5), td:nth-child(5),
            th:nth-child(6), td:nth-child(6) {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="badge-row">
              <span class="pill"><span class="pill-dot"></span>XML Sitemap Index</span>
              <span class="pill" style="border-color: rgba(148,163,184,0.3); background: rgba(148,163,184,0.1); color: var(--text-secondary);">sitemaps.org 0.9</span>
            </div>
            <h1>Dipesh Sapkota <span>/</span> Sitemap</h1>
            <p class="lead">
              Official indexation map generated for search engine crawlers (Googlebot, Bingbot). Contains all canonical public pages, sitelinks endpoints, and multimedia metadata.
            </p>
          </header>

          <section class="stats-grid">
            <div class="stat-card">
              <div class="stat-label">Total URLs</div>
              <div class="stat-value highlight"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Core Sitelinks</div>
              <div class="stat-value">9 Pages</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Indexed Images</div>
              <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url/image:image)"/></div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Protocol</div>
              <div class="stat-value" style="font-size: 18px; line-height: 28px;">XML + Images</div>
            </div>
          </section>

          <div class="info-banner">
            <div>
              <strong>Google Sitelinks Optimization:</strong>
              High-priority entries (1.0 - 0.9) correspond directly to primary navigation sitelinks (Home, About, Skills, Projects, Certificates, Resume, Gallery, Contact, Articles) registered in Schema.org <code>SiteNavigationElement</code>.
            </div>
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th style="width: 45px;">#</th>
                  <th>Canonical URL</th>
                  <th style="width: 140px;">Sitelink Role</th>
                  <th style="width: 90px;">Priority</th>
                  <th style="width: 110px;">Frequency</th>
                  <th style="width: 80px;">Images</th>
                  <th style="width: 110px;">Last Mod</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td style="color: var(--text-muted); font-family: var(--font-mono); font-size: 11px;">
                      <xsl:value-of select="position()"/>
                    </td>
                    <td class="url-cell">
                      <a href="{sitemap:loc}" target="_blank" rel="noopener noreferrer">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="sitemap:priority &gt;= 0.9">
                          <span class="badge-sitelink">Primary Sitelink</span>
                        </xsl:when>
                        <xsl:when test="sitemap:priority &gt;= 0.8">
                          <span class="badge-resource">Featured Case</span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="badge-resource">Supporting</span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="sitemap:priority &gt;= 0.9">
                          <span class="priority-bar priority-high">
                            <xsl:value-of select="concat(sitemap:priority * 100, '%')"/>
                          </span>
                        </xsl:when>
                        <xsl:when test="sitemap:priority &gt;= 0.8">
                          <span class="priority-bar priority-med">
                            <xsl:value-of select="concat(sitemap:priority * 100, '%')"/>
                          </span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="priority-bar priority-std">
                            <xsl:value-of select="concat(sitemap:priority * 100, '%')"/>
                          </span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td>
                      <span class="freq-tag"><xsl:value-of select="sitemap:changefreq"/></span>
                    </td>
                    <td>
                      <span class="image-count">
                        <xsl:value-of select="count(image:image)"/>
                      </span>
                    </td>
                    <td style="font-family: var(--font-mono); font-size: 11.5px; color: var(--text-secondary);">
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <footer>
            <div>
              &copy; 2026 <a href="https://www.dipeshsapkota7.com.np/">Dipesh Sapkota</a>. All rights reserved.
            </div>
            <div>
              Generated for Googlebot, Bingbot &amp; Standards Crawlers
            </div>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
