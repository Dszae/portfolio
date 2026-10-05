# DNS-AID deployment

DNS-AID records must be published at the authoritative DNS provider. This domain uses Cloudflare DNS, so these records must be added in the Cloudflare dashboard or through the Cloudflare DNS API.

## Records

Create these SVCB records for `dipeshsapkota7.com.np`:

| Type | Name | Priority | Target | Parameters |
| --- | --- | ---: | --- | --- |
| SVCB | `_index._agents` | `1` | `dipeshsapkota7.com.np.` | `alpn="h2" port=443 mandatory=alpn,port` |
| SVCB | `_a2a._agents` | `1` | `dipeshsapkota7.com.np.` | `alpn="h2" port=443 mandatory=alpn,port` |

The records advertise the HTTPS agent discovery service at the portfolio domain. The agent resources are:

- Agent card: `https://www.dipeshsapkota7.com.np/.well-known/agent-card.json`
- Auth.md: `https://www.dipeshsapkota7.com.np/auth.md`
- API catalog: `https://www.dipeshsapkota7.com.np/.well-known/api-catalog`

## DNSSEC

Enable DNSSEC for `dipeshsapkota7.com.np` in Cloudflare, then publish the resulting DS record at the `.com.np` registrar. DNSSEC is not enabled by a repository file; it requires the registrar and authoritative DNS provider configuration.

## Verification

Query the records through DNS-over-HTTPS after propagation:

```text
https://cloudflare-dns.com/dns-query?name=_index._agents.dipeshsapkota7.com.np&type=SVCB
https://cloudflare-dns.com/dns-query?name=_a2a._agents.dipeshsapkota7.com.np&type=SVCB
```

The DNS-AID scanner should then report `checks.discoverability.dnsAid.status` as `pass`.
