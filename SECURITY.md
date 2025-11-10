# Security Policy

## Known Issues

### Electron ASAR Integrity Bypass (Moderate)
- **Package**: electron@28.0.0
- **CVE**: GHSA-vmqv-hx8q-j7mg
- **Severity**: Moderate (6.1/10)
- **Status**: Acknowledged
- **Impact**: ASAR archive integrity bypass via resource modification
- **Mitigation**: This vulnerability requires local file system access. For production use, consider upgrading to Electron 35.7.5+ or later.

## Security Recommendations

For production deployments:

1. **Update Electron**: Upgrade to latest stable version (35.7.5+)
   ```bash
   npm install electron@latest --save-dev
   ```

2. **Code Signing**: Sign your application binaries
3. **ASAR Integrity**: Enable ASAR integrity checking
4. **Update Regularly**: Keep all dependencies up to date
5. **Input Validation**: Validate all user inputs in the UI
6. **File System Access**: Restrict file system access appropriately

## Reporting Security Issues

If you discover a security vulnerability, please email the maintainers directly rather than opening a public issue.

## Best Practices

When using this application:
- Only load project files from trusted sources
- Keep your Node.js and npm versions up to date
- Run `npm audit` regularly to check for new vulnerabilities
- Review code changes before accepting pull requests

## Development vs Production

This application is currently configured for development use. For production:
- Enable code signing
- Use latest Electron version
- Enable Content Security Policy (CSP)
- Implement proper sandboxing
- Remove development tools from production builds
