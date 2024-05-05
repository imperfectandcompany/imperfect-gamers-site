# Contributing to the Imperfect Gamers Site Repository
This documentation outlines the workflow, tools, and protocols that maintain the project's integrity and operational standards, providing a clear guideline for current and future contributors to understand their roles, responsibilities, and the technological stack of the Imperfect Gamers Site.

## Branch Strategy
The project uses a standard two-branch system:

1. **Production Branch**: Serves as the live, production-ready codebase.
2. **Dev Branch**: The staging area for all developments, features, and tests before stability and readiness are confirmed for production release.

## Development and Pull Requests
Developers create task-specific branches off the 'dev' branch. Once a task is completed, a pull request (PR) is opened against the 'dev' branch for comprehensive review and integration. The PR provides a detailed summary of the changes, improvements made to the repository, and the key updates, which are crucial for transparent documentation and review processes.

## Automated Checks
Automated checks are triggered upon PR activities to ensure code quality and adherence to standards:
- **ESLint and Prettier Check**: Ensures coding standards and formatting are consistent. This workflow checks out the code, sets up Node.js, installs dependencies, and runs linting and formatting scripts. If modifications are needed, it commits and pushes the formatting fixes back to the branch.
- **Docker Build and Push Workflow**: Triggered after the PR is merged into the 'dev' branch. This workflow builds a Docker image and pushes it to GitHub Container Registry (GHCR), ensuring that any updates are ready for deployment.

## Deployment and Continuous Integration

### Docker Deployment
Each pushed image in the GHCR is tagged with 'latest' and the specific commit SHA, ensuring version control and traceability. 

### Webhook Listener and PM2 for Automated Deployment
A webhook listener is set up on a virtual machine for web services through our Dedicated Baremetal with Proxmox OS, monitoring for push events to the GHCR. Upon detecting a new Docker image, it pulls the image and uses PM2, a process manager for Node.js applications, to restart the service with the new image. This setup minimizes downtime and ensures that the production environment is always up-to-date with the latest stable changes.

## Comprehensive CI/CD Pipeline
The integration of GitHub Actions for code linting and Docker builds forms a robust CI/CD pipeline that automates the testing, building, and deployment phases. This automation significantly enhances the efficiency of development cycles and ensures high standards of code quality and reliability.

## Onboarding and Contribution Guidelines
For new contributors:
- **Code Style and Guidelines**: Adherence to established coding guidelines is checked automatically via ESLint and Prettier.
- **Testing and Reviews**: Contributors are encouraged to write tests and perform local testing. Changes should pass all automated tests and checks before they are considered for merging.
- **Documentation**: Updates to documentation should accompany functional changes, ensuring that all aspects of the system are well-documented and transparent.

## Security and Best Practices
- **Environmental Variables**: Environment variables critical for application configuration, such as **`STEAM_API_KEY`**, **`AUTHORIZATION_URL`**, etc., are stored in **`.env`** files and are referenced in the Docker composition. This ensures that sensitive information is securely injected into the application runtime without being hardcoded into the source code.

