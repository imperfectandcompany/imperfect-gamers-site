# Security Policy

## Supported Versions

Below are the versions of our project that are currently supported with security updates:

| Version | Supported          | Notes          |
| ------- | ------------------ | -------------- |
| 1.0.x   | ☐                  | Not released yet |

## 1. Reporting a Vulnerability

At Imperfect Gamers under Imperfect and Company, we prioritize the security of our systems and data. We encourage responsible reporting of any suspected security vulnerabilities you might identify.

### How to Report:

To ensure efficient handling of security issues, please report them discreetly.

- **Contact**: Direct all security concerns to **[daiyaan@imperfectandcompany.com](mailto:daiyaan@imperfectandcompany.com)**.
- **Response Commitment**: We aim to acknowledge receipt within 24 hours and provide a comprehensive evaluation within 48 hours.

### Please Include:
- A clear description of the vulnerability and potential impacts.
- Detailed reproduction steps if possible.
- The affected versions and configurations, if known.
- Optionally, your contact information for our **(future planned)** Security Hall of Fame recognition.

**Please do not post security vulnerabilities publicly** (including on GitHub issues, Discord, in-game, social networks, or any public channels). We appreciate your efforts to disclose your findings responsibly and will acknowledge your contributions accordingly.

## 2. Security Practices

### For Developers:
- **Code Security**: Write secure, clean code with validation and sanitization to prevent injection and other attacks.
- **Dependency Management**: Maintain and update dependencies to mitigate known vulnerabilities and avoid using deprecated libraries.
- **Data Handling**: Encrypt sensitive data both at rest and in transit. Adhere to compliance standards for data handling.
- **Authentication and Authorization**: Implement proper checks and controls to prevent unauthorized access and secure sensitive information from both server-side and client-side exploits.

#### Security Configuration and Policy Recommendations:
- **Authentication**: Implement strong multifactor authentication mechanisms.
- **Access Control**: Regularly review and restrict access permissions.
- **Data Protection**: Use robust encryption methods to protect data like API secrets in GitHub or .env files. Keep our .env.example schema updated.

### For Users:
- **Account Security**: Choose strong passwords and update them regularly. Be cautious of phishing attacks and secure your account with two-factor authentication once we release this functionality.
- **Software Updates**: Regularly update your systems and software to incorporate the latest security patches and updates.
- **Data Sharing**: Exercise caution when sharing information online, especially in public areas such as Imperfect Gamers site, in-game servers, and our Discord server.

## 3. Disclosure Policy

We believe in transparent security practices and will promptly disclose any security incidents to affected parties. We will handle all disclosures in accordance with our internal policies and in line with any legal obligations.

When we receive a security bug report, we will assign it to a primary handler. This person will coordinate the fix and release process, involving the following steps:

### Disclosure Steps:
1. Verify the issue and determine which versions are affected.
2. Audit related components to find potential similar issues.
3. Prepare and release fixes and deployments promptly through appropriate update channels.

## 4. Security Compliance and External Audits
We engage with external security experts to conduct regular and continuous assessments of our products to ensure they meet the highest security standards. These audits are scheduled to begin post-production (v1.0.0) and will occur annually.

### Annual Audits:
- **Details**: We conduct rigorous external audits of our systems and infrastructure to ensure ongoing compliance with the highest security standards. Stakeholders can request detailed reports of these audits under a non-disclosure agreement to ensure transparency while maintaining security.

### Framework and Standards:
- **Framework Identification**: We are in the process of identifying the right standards and frameworks to comply with, whether that is ISMS for ISO, SOC, etc.
- **GDPR Readiness**: Before production, we aim to be GDPR ready to ensure compliance with data protection and privacy laws.

### Tebex Partnership
- We collaborate closely with Tebex to ensure that our store page, checkout system (Tebex.js), and product management (Tebex Headless API) adhere to stringent security standards and regulatory compliance.

## 5. Recognition

Contributors who report security vulnerabilities will be recognized in our ***(future-planned)*** Security Hall of Fame.

## 6. Bounty Program

Currently, Imperfect Gamers does not have a bounty program, but we are actively exploring the possibility to reward those who help keep our systems secure. Further updates will be provided once available.

For further inquiries, contact [daiyaan@imperfectandcompany.com](mailto:daiyaan@imperfectandcompany.com).
