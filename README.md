<p align="center">
  <img src="https://cdn.imperfectgamers.org/inc/assets/img/icon/isometric_ig_circle.png" width="100" />
</p>
<p align="center">
    <h1 align="center">IMPERFECT GAMERS SITE</h1>
</p>
<p align="center">
    <em>https://imperfectgamers.org/</em>
</p>


<div align="center">
  
![Imperfect Gamers Wallpaper Rounded](https://cdn.imperfectgamers.org/inc/assets/img/wallpaper/wallpaper_dj_rapper_rounded.jpg)
</div>

<p align="center">
	<img src="https://img.shields.io/github/last-commit/imperfectandcompany/imperfect-gamers-site?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat&logo=Prettier&logoColor=black" alt="Prettier">
	<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white" alt="PostCSS">
	<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=flat&logo=Autoprefixer&logoColor=white" alt="Autoprefixer">
	<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<br>
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white" alt="Docker">
	<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=flat&logo=GitHub-Actions&logoColor=white" alt="GitHub%20Actions">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<hr>

steam-integration demo (oauth implicit grant flow):

pop-up flow:

https://imperfectandcompany.sharepoint.com/:v:/s/ImperfectandCompany2/EZZLemtOjPhEqc62-dKh2qsBffsSDVRdt_qqg5w9OwOK-g

redirect flow:

https://imperfectandcompany.sharepoint.com/:v:/s/ImperfectandCompany2/ETVRdeR7YJlNpNgVznK0YLYBtR6wOd-Lu7sVEDRud5AYvA

Currently living monetization model:

![image](https://github.com/imperfectandcompany/Imperfect-Gamers-Site-Store/assets/3193289/188f0a40-859f-472c-88d7-a968bf54bd18)

Our monetization model from two years ago (on old engine with stability):

https://cdn.imperfectgamers.org/96VFCiW.png

## 🔗 Quick Links

- [📍 Overview](#-overview)
- [📦 Features](#-features)
- [📂 Repository Structure](#-repository-structure)
- [🧩 Files](#-files)
- [🚀 Getting Started](#-getting-started)
  - [⚙️ Installation](#️-installation)
  - [🤖 Running Imperfect Gamers Site](#-running-imperfect-gamers-site)
  - [🧪 Tests](#-tests)
- [🚀 Strategy](#-strategy)
- [🛠 Project Roadmap](#-project-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👏 Acknowledgments](#-acknowledgments)

### External

- [Remix Documentation](https://remix.run/docs/en/main)
- [Remix Website](https://remix.run/)
- [Remix GitHub Repository](https://github.com/remix-run/examples)
- [Remix Discussion Forum](https://remix.run/docs/en/main/discussion/introduction)
- [Remix Guide](https://remix.guide/)
- [Digestible Remix Guides](https://www.jacobparis.com/content)

---

## 📍 Overview

The Imperfect Gamers site project serves as a web front for our platform, emphasizing personalized experiences through Steam integration too aggregate data to your account for looking up stats, purchases, social and more. It provides our users with a member-centric portal where users can manage their data on our services and interact seamlessly within the community. We have a focus on Tailwind-based UI with atomic design principles, to ensure a robust, scalable, and user-friendly interface for our audience. Automated deployment and code quality processes are embedded through CI/CD pipelines, ensuring a reliable and scalable infrastructure, enriching the users and developers journey within our Imperfect Gamers ecosystem as we develop and introduce new features.

---

## 📦 Features


|    | Feature          | Description                                                                                                           |
|----|------------------|-----------------------------------------------------------------------------------------------------------------------|
| ⚙️ | **Architecture** | Currently involves session management through Remix and Steam integration for user authentication while using Tebex for Product management. Uses automated deployment.   |
| 🔩 | **Code Quality** | Code quality ensured by ESLint, Prettier, TypeScript. The codebase includes config files for consistent coding style.  |
| 📄 | **Documentation**| This is a living document and expected to remain under development until we reaach key milestones in our roadmap.  |
| 🔌 | **Integrations** | Integrates with Steam for authentication. Uses Docker for containerization, and GitHub Actions for CI/CD workflows. |
| 🧩 | **Modularity**   | Leveraging Atomic Design Methodology alongside component varients for reusability and building a uniform design.       |
| 🧪 | **Testing**      | We have strict typescript and Eslint as a mandatory requirement before merging into dev. We will introduce jest and enzyme once we put our shop into production.         |
| ⚡️ | **Performance**   | With remix's recent support for Vite, we chose it as our build tool for fast build times, performance metrics will be benchmarked after we introduce testing.                    |
| 🛡️ | **Security**     | Steam integration using OAuth; bcryptjs received on API through rest for hashing passwords.                       |
| 📦 | **Dependencies** | Key libs: React, TailwindCSS, TypeScript, TailwindCSS, Remix, Remix Utilities: ESLint, Prettier, Vite, PostCSS.            |
| 🚀 | **Scalability**  | Uses Remix from Shopify, which is scalable and in competition with Next.JS (although React is backing Next.JS), but follows latest trending support for Server-Side-Rendering Full-Stack Development. |

---

## 📂 Repository Structure
<details closed><summary>View Structure</summary>

### Structure overview

- `entry.client.tsx` & `entry.server.tsx`: Entry points for client and server, respectively, showcasing our SSR strategy.
- `root.tsx`: The root component that wraps the entire application, setting the stage for a cohesive user experience.
- `store.css` & `tailwind.css`: Core styling files, driving the visual consistency and responsiveness of the module.
- `components/atoms`: Basic UI elements like buttons and inputs, forming the building blocks of our interface.
- `components/molecules`: Combinations of atoms into functional units such as forms and cards, enhancing the modularity of our design.
- `components/organisms`: Complex UI segments like membership tiers and FAQ sections, demonstrating advanced composition and functionality.
- `components/templates/store`: High-level layouts specific to the store module, orchestrating the overall user interface.
  
```sh
└── imperfect-gamers-site/
    ├── .github
    │   ├── CODEOWNERS
    │   └── workflows
    │       ├── build_and_deploy.yml
    │       └── eslint_prettier_pr_check.yml
    ├── Dockerfile
    ├── README.md
    ├── app
    │   ├── auth
    │   │   ├── authenticator.server.ts
    │   │   ├── session.ts
    │   │   ├── steam.server.ts
    │   │   ├── storage.server.ts
    │   │   └── user.server.ts
    │   ├── components
    │   │   ├── atoms
    │   │   │   ├── Button
    │   │   │   │   ├── Button.tsx
    │   │   │   │   └── ButtonProps.tsx
    │   │   │   ├── Heading
    │   │   │   │   └── Heading.tsx
    │   │   │   ├── IconElement.tsx
    │   │   │   ├── Image.tsx
    │   │   │   ├── Input
    │   │   │   │   └── Input.tsx
    │   │   │   ├── Link
    │   │   │   │   └── Link.tsx
    │   │   │   ├── Modal
    │   │   │   │   └── Modal.tsx
    │   │   │   ├── Paragraph
    │   │   │   │   └── Paragraph.tsx
    │   │   │   ├── PriceLabel
    │   │   │   │   ├── PriceLabel.module.css
    │   │   │   │   └── PriceLabel.tsx
    │   │   │   ├── Text.tsx
    │   │   │   ├── TextElement.tsx
    │   │   │   └── ToggleSwitch
    │   │   │       ├── ToggleSwitch.module.css
    │   │   │       └── ToggleSwitch.tsx
    │   │   ├── molecules
    │   │   │   ├── AuthorizeForm.tsx
    │   │   │   ├── EventItem.tsx
    │   │   │   ├── FAQItem.tsx
    │   │   │   ├── FeaturedItem.tsx
    │   │   │   ├── FooterLink.tsx
    │   │   │   ├── IconText.tsx
    │   │   │   ├── LoginForm.tsx
    │   │   │   ├── ModalContent
    │   │   │   │   └── ModalContent.tsx
    │   │   │   ├── PriceToggle
    │   │   │   │   ├── PriceToggle.module.css
    │   │   │   │   └── PriceToggle.tsx
    │   │   │   ├── SignUpForm.tsx
    │   │   │   ├── StatisticItem.tsx
    │   │   │   ├── TitleDescription.tsx
    │   │   │   └── UsernameForm.tsx
    │   │   ├── organism
    │   │   │   ├── AuthForms
    │   │   │   │   └── AuthForms.tsx
    │   │   │   ├── ContactForm.tsx
    │   │   │   ├── FAQSection.tsx
    │   │   │   ├── FeaturedPartnership.tsx
    │   │   │   ├── FeaturedSection.tsx
    │   │   │   ├── MembershipCard
    │   │   │   │   ├── MembershipCard.module.css
    │   │   │   │   └── MembershipCard.tsx
    │   │   │   ├── MembershipTier.tsx
    │   │   │   ├── ModalWrapper
    │   │   │   │   ├── ModalWrapper.module.css
    │   │   │   │   └── ModalWrapper.tsx
    │   │   │   ├── StatisticsGroup.tsx
    │   │   │   ├── Testimonial.tsx
    │   │   │   └── UnauthenticatedView.tsx
    │   │   └── templates
    │   │       └── store
    │   │           ├── StoreContact.tsx
    │   │           ├── StoreEvents.tsx
    │   │           ├── StoreFAQ.tsx
    │   │           ├── StoreFeatured.tsx
    │   │           ├── StoreFooter.tsx
    │   │           ├── StoreHeader.tsx
    │   │           ├── StorePartnership.tsx
    │   │           ├── StoreStatistics.tsx
    │   │           ├── StoreTestimonials.tsx
    │   │           ├── StoreTiers.tsx
    │   │           └── index.tsx
    │   ├── entry.client.tsx
    │   ├── entry.server.tsx
    │   ├── root.tsx
    │   ├── routes
    │   │   ├── _index.tsx
    │   │   ├── auth.check.username.tsx
    │   │   ├── auth.finalize.username.tsx
    │   │   ├── authorize.check.steam.tsx
    │   │   ├── authorize.steam.callback.tsx
    │   │   ├── authorize.steam.tsx
    │   │   ├── login.tsx
    │   │   ├── logout.tsx
    │   │   ├── register.tsx
    │   │   ├── store.add.tsx
    │   │   ├── store.create.tsx
    │   │   └── store.tsx
    │   ├── styles
    │   │   ├── MembershipCard.css
    │   │   └── store.css
    │   ├── tailwind.css
    │   └── utils
    │       ├── general.ts
    │       ├── steamAuth.ts
    │       ├── tebex.d.ts
    │       ├── tebex.interface.ts
    │       ├── tebex.server.ts
    │       ├── tebexjs.ts
    │       └── useTebexCheckout.ts
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public
    │   ├── 1.0.0.js
    │   └── favicon.ico
    ├── tailwind.config.ts
    ├── tsconfig.eslint.json
    ├── tsconfig.json
    └── vite.config.ts
```
</details>

---

## 🧩 Files

<details closed><summary>Open Directory</summary>

`This section is currently in process`

<details closed><summary>.</summary>

| File                                                                                                                  | Summary                                                                                                                                                                                                                                                                                                                                                                  |
| ---                                                                                                                   | ---                                                                                                                                                                                                                                                                                                                                                                      |
| [tailwind.config.ts](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/tailwind.config.ts)     | TODO: Document summary for this file                                                                                                                                                                          |
| [Dockerfile](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/Dockerfile)                     | TODO: Document summary for this file              |
| [tsconfig.json](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/tsconfig.json)               | TODO: Document summary for this file                                       |
| [postcss.config.js](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/postcss.config.js)       | TODO: Document summary for this file |
| [vite.config.ts](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/vite.config.ts)             | TTODO: Document summary for this file                                                                                                                                                                                                                                     |
| [package.json](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/package.json)                 | TODO: Document summary for this file            |
| [tsconfig.eslint.json](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/tsconfig.eslint.json) | TTODO: Document summary for this file                                                          |
| [package-lock.json](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/package-lock.json)       | TODO: Document summary for this file                                                                                                                                                                        |

</details>

<details closed><summary>public</summary>

| File                                                                                                 | Summary                                                                                                                                                                                                                                   |
| ---                                                                                                  | ---                                                                                                                                                                                                                                       |
| [1.0.0.js](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/public/1.0.0.js) | TODO: Document summary for this file |

</details>

<details closed><summary>.github</summary>

| File                                                                                                      | Summary                                                                                                                                                                                                                                                                                     |
| ---                                                                                                       | ---                                                                                                                                                                                                                                                                                         |
| [CODEOWNERS](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/.github/CODEOWNERS) | TODO: Document summary for this file |

</details>

<details closed><summary>.github.workflows</summary>

| File                                                                                                                                                    | Summary                                                                                                                                                                                                                                                            |
| ---                                                                                                                                                     | ---                                                                                                                                                                                                                                                                |
| [eslint_prettier_pr_check.yml](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/.github/workflows/eslint_prettier_pr_check.yml) | TODO: Document summary for this file                                               |
| [build_and_deploy.yml](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/.github/workflows/build_and_deploy.yml)                 | TODO: Document summary for this file |

</details>

<details closed><summary>app</summary>

| File                                                                                                              | Summary                                                                                                                                                                                                                                                                                                                                                                                              |
| ---                                                                                                               | ---                                                                                                                                                                                                                                                                                                                                                                                                  |
| [entry.server.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/entry.server.tsx) | TODO: Document summary for this file |
| [entry.client.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/entry.client.tsx) | TODO: Document summary for this file                                                                                                                                                                                    |
| [root.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/root.tsx)                 | TODO: Document summary for this file                                                                                                                                                                                                                                                                                 |
| [tailwind.css](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/tailwind.css)         | TODO: Document summary for this file                                                                                                                                                                                                                      |

</details>

<details closed><summary>app.styles</summary>

| File                                                                                                                         | Summary                                                                                                                                                                                                                                    |
| ---                                                                                                                          | ---                                                                                                                                                                                                                                        |
| [store.css](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/styles/store.css)                   | TODO: Document summary for this file |
| [MembershipCard.css](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/styles/MembershipCard.css) | TODO: Document summary for this file                                                              |

</details>

<details closed><summary>app.utils</summary>

| File                                                                                                                          | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---                                                                                                                           | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [tebexjs.ts](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/utils/tebexjs.ts)                   | TODO: Document summary for this file                                                                                                                                                                               |
| [tebex.d.ts](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/utils/tebex.d.ts)                   | TTODO: Document summary for this file                                                                                                                                                                                                                                                                                            |
| [steamAuth.ts](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/utils/steamAuth.ts)               | TODO: Document summary for this file |
| [general.ts](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/utils/general.ts)                   | TODO: Document summary for this file                                                                                                                                                                                                                                                                 |
| [tebex.interface.ts](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/utils/tebex.interface.ts)   | TODO: Document summary for this file                                                                                                                                                                                                                                                                                                                                        |
| [tebex.server.ts](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/utils/tebex.server.ts)         | TODO: Document summary for this file                                                                                                                                                                                                                                                                                                           |
| [useTebexCheckout.ts](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/utils/useTebexCheckout.ts) | TODO: Document summary for this file                                                                                                                                                                                                                                                                                                                                                                |

</details>

<details closed><summary>app.routes</summary>

| File                                                                                                                                             | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---                                                                                                                                              | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [store.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/routes/store.tsx)                                       | TODO: Document summary for this file                                                                                                                                                                                                                                                                                                                            |
| [authorize.check.steam.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/routes/authorize.check.steam.tsx)       | TTODO: Document summary for this file                                                                                                                                                                                                                                                                                                                                                                           |
| [register.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/routes/register.tsx)                                 | TODO: Document summary for this file                                                                                                                                                                                                                                                                                                                                                                             |
| [logout.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/routes/logout.tsx)                                     | TODO: Document summary for this file                                                                                                                                                                                                                                                                                                                                                                          |
| [auth.check.username.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/routes/auth.check.username.tsx)           | TODO: Document summary for this file |
| [store.add.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/routes/store.add.tsx)                               | TODO: Document summary for this file                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [auth.finalize.username.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/routes/auth.finalize.username.tsx)     | TODO: Document summary for this file                                                                                                                                                                                                                                                                                                                                                                                   |
| [login.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/routes/login.tsx)                                       | TODO: Document summary for this file                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [authorize.steam.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/routes/authorize.steam.tsx)                   | TODO: Document summary for this file                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [authorize.steam.callback.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/routes/authorize.steam.callback.tsx) | TODO: Document summary for this file                                                                                                                                                                                                                                                                                                                                          |
| [store.create.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/routes/store.create.tsx)                         | TODO: Document summary for this file                                                                                                                                            |
| [_index.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/routes/_index.tsx)                                     | TODO: Document summary for this file                                                                                                                                                                                                                                                                                                                                                                           |

</details>

<details closed><summary>app.components.templates.store</summary>

| File                                                                                                                                                   | Summary                                                                                                                                                                                                                                                                                                                                         |
| ---                                                                                                                                                    | ---                                                                                                                                                                                                                                                                                                                                             |
| [StoreFooter.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/templates/store/StoreFooter.tsx)             | TODO: Document summary for this file                                                                                                                                                                                                                                              |
| [StoreFAQ.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/templates/store/StoreFAQ.tsx)                   | TODO: Document summary for this file                                                             |
| [StoreContact.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/templates/store/StoreContact.tsx)           | TODO: Document summary for this file                      |
| [index.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/templates/store/index.tsx)                         | TODO: Document summary for this file.                                                                      |
| [StoreHeader.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/templates/store/StoreHeader.tsx)             | TODO: Document summary for this file                                              |
| [StoreStatistics.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/templates/store/StoreStatistics.tsx)     | TODO: Document summary for this file                                                                                                                                                              |
| [StoreEvents.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/templates/store/StoreEvents.tsx)             | TODO: Document summary for this file                                                                                                                                                                           |
| [StoreTiers.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/templates/store/StoreTiers.tsx)               | TODO: Document summary for this file                                                                                                                                        |
| [StoreFeatured.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/templates/store/StoreFeatured.tsx)         | TODO: Document summary for this file                                                                                                                                                             |
| [StoreTestimonials.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/templates/store/StoreTestimonials.tsx) | TODO: Document summary for this file                                                                                                                                                                                       |
| [StorePartnership.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/templates/store/StorePartnership.tsx)   | TODO: Document summary for this file |

</details>

<details closed><summary>app.components.atoms</summary>

| File                                                                                                                             | Summary                                                                                                                                                                                                                                                                                                                                  |
| ---                                                                                                                              | ---                                                                                                                                                                                                                                                                                                                                      |
| [TextElement.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/atoms/TextElement.tsx) | TODO: Document summary for this file                                                                                                  |
| [IconElement.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/atoms/IconElement.tsx) | TODO: Document summary for this file                                                                     |
| [Text.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/atoms/Text.tsx)               | TODO: Document summary for this file |
| [Image.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/atoms/Image.tsx)             | TODO: Document summary for this file                                                                                                                                                       |

</details>

<details closed><summary>app.components.atoms.Button</summary>

| File                                                                                                                                    | Summary                                                                                                                                                                                                                                                                                   |
| ---                                                                                                                                     | ---                                                                                                                                                                                                                                                                                       |
| [Button.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/atoms/Button/Button.tsx)           | TODO: Document summary for this file                           |
| [ButtonProps.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/atoms/Button/ButtonProps.tsx) | TODO: Document summary for this file |

</details>

<details closed><summary>app.components.atoms.PriceLabel</summary>

| File                                                                                                                                                    | Summary                                                                                                                                                                                                                                                                                                                                                           |
| ---                                                                                                                                                     | ---                                                                                                                                                                                                                                                                                                                                                               |
| [PriceLabel.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/atoms/PriceLabel/PriceLabel.tsx)               | TODO: Document summary for this file |
| [PriceLabel.module.css](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/atoms/PriceLabel/PriceLabel.module.css) | TODO: Document summary for this file                                                                                                                                                                        |

</details>

<details closed><summary>app.components.atoms.ToggleSwitch</summary>

| File                                                                                                                                                          | Summary                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---                                                                                                                                                           | ---                                                                                                                                                                                                                                                                                                                                                                                                       |
| [ToggleSwitch.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/atoms/ToggleSwitch/ToggleSwitch.tsx)               | TODO: Document summary for this file                                                                                                                                                                                       |
| [ToggleSwitch.module.css](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/atoms/ToggleSwitch/ToggleSwitch.module.css) | TODO: Document summary for this file |

</details>

<details closed><summary>app.components.atoms.Paragraph</summary>

| File                                                                                                                                   | Summary                                                                                                                                              |
| ---                                                                                                                                    | ---                                                                                                                                                  |
| [Paragraph.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/atoms/Paragraph/Paragraph.tsx) | TODO: Document summary for this file |

</details>

<details closed><summary>app.components.atoms.Modal</summary>

| File                                                                                                                       | Summary                                                                                                                                                                      |
| ---                                                                                                                        | ---                                                                                                                                                                          |
| [Modal.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/atoms/Modal/Modal.tsx) | TODO: Document summary for this file |

</details>

<details closed><summary>app.components.atoms.Link</summary>

| File                                                                                                                    | Summary                                                                                                                                                    |
| ---                                                                                                                     | ---                                                                                                                                                        |
| [Link.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/atoms/Link/Link.tsx) | TODO: Document summary for this file |

</details>

<details closed><summary>app.components.atoms.Heading</summary>

| File                                                                                                                             | Summary                                                                                                                                                                                                                                          |
| ---                                                                                                                              | ---                                                                                                                                                                                                                                              |
| [Heading.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/atoms/Heading/Heading.tsx) | TTODO: Document summary for this file |

</details>

<details closed><summary>app.components.atoms.Input</summary>

| File                                                                                                                       | Summary                                                                                                                                    |
| ---                                                                                                                        | ---                                                                                                                                        |
| [Input.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/atoms/Input/Input.tsx) | TODO: Document summary for this file |

</details>

<details closed><summary>app.components.organism</summary>

| File                                                                                                                                                | Summary                                                                                                                                                                                                                                                                                                                                                     |
| ---                                                                                                                                                 | ---                                                                                                                                                                                                                                                                                                                                                         |
| [FeaturedPartnership.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/organism/FeaturedPartnership.tsx) | TODO: Document summary for this file                                                                                                                                                                                                       |
| [Testimonial.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/organism/Testimonial.tsx)                 | TODO: Document summary for this file                                                                                               |
| [MembershipTier.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/organism/MembershipTier.tsx)           | TODO: Document summary for this file |
| [ContactForm.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/organism/ContactForm.tsx)                 | TODO: Document summary for this file                                                                 |
| [FAQSection.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/organism/FAQSection.tsx)                   | TODO: Document summary for this file                                                                         |
| [UnauthenticatedView.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/organism/UnauthenticatedView.tsx) | TODO: Document summary for this file                                                                                                                                                                                          |
| [FeaturedSection.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/organism/FeaturedSection.tsx)         | TODO: Document summary for this file                                                                                                                                      |
| [StatisticsGroup.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/organism/StatisticsGroup.tsx)         | TODO: Document summary for this file                                                                                                                                                                                           |

</details>

<details closed><summary>app.components.organism.ModalWrapper</summary>

| File                                                                                                                                                             | Summary                                                                                                                                                                                   |
| ---                                                                                                                                                              | ---                                                                                                                                                                                       |
| [ModalWrapper.module.css](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/organism/ModalWrapper/ModalWrapper.module.css) | TODO: Document summary for this file |
| [ModalWrapper.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/organism/ModalWrapper/ModalWrapper.tsx)               | TODO: Document summary for this file  |

</details>

<details closed><summary>app.components.organism.MembershipCard</summary>

| File                                                                                                                                                                   | Summary                                                                                                                                                                                                                                                                      |
| ---                                                                                                                                                                    | ---                                                                                                                                                                                                                                                                          |
| [MembershipCard.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/organism/MembershipCard/MembershipCard.tsx)               | TODO: Document summary for this file  |
| [MembershipCard.module.css](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/organism/MembershipCard/MembershipCard.module.css) | TODO: Document summary for this file |

</details>

<details closed><summary>app.components.organism.AuthForms</summary>

| File                                                                                                                                      | Summary                                                                                                                                                                                                                                                                                                                                                               |
| ---                                                                                                                                       | ---                                                                                                                                                                                                                                                                                                                                                                   |
| [AuthForms.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/organism/AuthForms/AuthForms.tsx) | TODO: Document summary for this file |

</details>

<details closed><summary>app.components.molecules</summary>

| File                                                                                                                                           | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---                                                                                                                                            | ---                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [UsernameForm.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/molecules/UsernameForm.tsx)         | TODO: Document summary for this file                                                                                                                                                                                                                                                                                 |
| [EventItem.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/molecules/EventItem.tsx)               | TODO: Document summary for this file                                                                                       |
| [FAQItem.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/molecules/FAQItem.tsx)                   | TODO: Document summary for this file                                                                                                                                                                                                                                                                                       |
| [LoginForm.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/molecules/LoginForm.tsx)               | TODO: Document summary for this file                                                                                                                                                                                                         |
| [FeaturedItem.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/molecules/FeaturedItem.tsx)         | TODO: Document summary for this file                                                                                                        |
| [SignUpForm.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/molecules/SignUpForm.tsx)             | TODO: Document summary for this file                                                                                                                                                                                                    |
| [TitleDescription.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/molecules/TitleDescription.tsx) | TODO: Document summary for this file                                                                                                                                                                                                                                                    |
| [FooterLink.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/molecules/FooterLink.tsx)             | TODO: Document summary for this file                                                                                                                                                                                  |
| [StatisticItem.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/molecules/StatisticItem.tsx)       | TODO: Document summary for this file                                                                                                                                                                                                                                                              |
| [IconText.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/molecules/IconText.tsx)                 | TODO: Document summary for this file |
| [AuthorizeForm.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/molecules/AuthorizeForm.tsx)       | TODO: Document summary for this file                                                                                                                                                                                                                                                                                                                    |

</details>

<details closed><summary>app.components.molecules.ModalContent</summary>

| File                                                                                                                                                | Summary                                                                                                                                                                                                             |
| ---                                                                                                                                                 | ---                                                                                                                                                                                                                 |
| [ModalContent.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/molecules/ModalContent/ModalContent.tsx) | TODO: Document summary for this file |

</details>

<details closed><summary>app.components.molecules.PriceToggle</summary>

| File                                                                                                                                                           | Summary                                                                                                                                                                                                   |
| ---                                                                                                                                                            | ---                                                                                                                                                                                                       |
| [PriceToggle.tsx](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/molecules/PriceToggle/PriceToggle.tsx)               | TODO: Document summary for this file |
| [PriceToggle.module.css](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/components/molecules/PriceToggle/PriceToggle.module.css) | TODO: Document summary for this file          |

</details>

<details closed><summary>app.auth</summary>

| File                                                                                                                                 | Summary                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---                                                                                                                                  | ---                                                                                                                                                                                                                                                                                                                                                                                                              |
| [user.server.ts](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/auth/user.server.ts)                   | TODO: Document summary for this file                                                                                                                                                  |
| [session.ts](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/auth/session.ts)                           | TODO: Document summary for this file |
| [storage.server.ts](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/auth/storage.server.ts)             | TODO: Document summary for this file                                                                                          |
| [steam.server.ts](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/auth/steam.server.ts)                 | TODO: Document summary for this file                                                                                                                                                                                                                            |
| [authenticator.server.ts](https://github.com/imperfectandcompany/imperfect-gamers-site/blob/master/app/auth/authenticator.server.ts) | TODO: Document summary for this file                                                                                                                                                                                    |
</details>

</details>

---

## 🚀 Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **NPM**: `version >=18.x`
  [Download npm](https://www.npmjs.com/get-npm) | 
  [Update npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#updating-npm) | 
  [npm install](https://docs.npmjs.com/cli/v7/commands/npm-install)

### ⚙️ Installation

To get a local copy up and running, follow these simple steps:

1. **Clone the repository:**
```sh
git clone https://github.com/imperfectandcompany/imperfect-gamers-site.git
```

3. **Navigate to the project directory:**
```sh
cd imperfect-gamers-site
```
3. **Install dependencies:**
```sh
npm install
```

### 🤖 Running imperfect-gamers-site

Use the following command to run imperfect-gamers-site:

```sh
npm run dev
```

### 🧪 Tests

`Pending (view Project Roadmap)`

---

## 🚀 Strategy

<details closed><summary>Phases</summary>

### Phase 1: Foundation and Core Setup
- [x] **Milestone 1: Project Initialization**
  - [x] Repository setup and initial commit
  - [x] Base tooling and framework selection
- [x] **Milestone 2: Environment Setup**
  - [x] Integration of Tailwind CSS
  - [x] Setup of build and deployment pipelines
- [ ] **Milestone 3: Developer Tooling**
  - [ ] Integrate Jest and Enzyme for testing

### Phase 2: Feature Development and Integration
- [x] **Milestone 4: Authentication System**
  - [x] Implement basic AuthForms and session management
  - [x] E2E login, registration, and logout implementation
  - [x] Secure Steam integration
- [x] **Milestone 5: Validation**
  - [x] Validate Onboarding
  - [x] Validate Account Steam integration

### Phase 3: Store Page MVP
- [ ] **Milestone 6: Store Module Functionality**
  - [x] Ensure user meets all requirements before triggering store
  - [x] Allow user to complete onboarding and steam integration within flow
  - [ ] Create webhook and perform delivery for payment event

### Phase 4: User Experience Enhancement
- [x] **Milestone 7: User Interface Polish**
  - [x] Complete Atomic Design conversion for components
  - [x] Enhance signup and login flow with UX improvements
- [x] **Milestone 8: Advanced Features Integration**
  - [x] Integrate Headless Tebex API features for behind-the-scenes product management
  - [x] Integrate TebexJS 1.0.0 Checkout Modal for a seamless checkout experience

### Phase 5: Optimization and Scaling
- [ ] **Milestone 9: Performance Tuning**
  - [ ] Optimize application loading times
  - [ ] Implement comprehensive caching strategies
- [ ] **Milestone 10: Preparation for Scale**
  - [ ] Maximize test coverage to ensure stability
  - [ ] Perform benchmark tests for future comparison
  - [ ] Review infrastructure scalability for anticipated growth

### Phase 6: Store Pre-Launch and Launch
- [ ] **Milestone 11: Pre-Launch Checks**
  - [ ] Conduct final security audits
  - [ ] Perform user acceptance testing (UAT)
- [ ] **Milestone 12: Launch**
  - [ ] Go-live with the store page
  - [ ] Document real-time user feedback on Discord and from staff
  - [ ] Monitor system performance

### Phase 7: Post-Launch Activities
- [ ] **Milestone 13: Post-Launch Support and Maintenance**
  - [ ] Address immediate post-launch feedback and issues
  - [ ] Plan and initiate the next iteration of features and improvements

### Phase 8: Automated Feedback Loop
- [ ] **Milestone 14: Continuous Feedback Implementation**
  - [ ] E2E implementation of contact form for guests
  - [ ] E2E implementation of support tickets for users
  - [ ] E2E implementation for reviews

### Phase 9: Account Permissions Utility
- [ ] **Milestone 15: Role-Based Access Control**
  - [ ] Map logged-in user to role
  - [ ] Create wrapper passed with expected permission for rendering

### Phase 10: Admin Dashboard
- [ ] **Milestone 16: Admin Tools and Reviews**
  - [ ] E2E implementation of support tickets for users
  - [ ] E2E implementation for reviews (product/site/server/general)

</details>

## 🛠 Project Roadmap

<details closed><summary>Tasks</summary>

### Completed Tasks
- [X] Integrate Tailwind CSS for styling
- [X] Create Store page layout
- [X] Design and split the page into sections using the Atomic Design methodology
- [X] Convert all components to use Atomic Design, with detailed examples in the Button folder under molecules
- [X] Introduce default prop fallbacks, design tokens, and variants
- [X] Setup modal for Premium Membership CTA
- [X] Implement AuthForms with conditional rendering
  - [X] SignUp/SignIn/LoggedInView
  - [X] OnboardingRequiredView/SteamIntegrationRequiredView/LoggedInAndValidatedView
- [X] Integrate `remix-validated-form` with Zod for form validation
- [X] Design and set up the sign-up process
- [X] Set up Remix session storage for state management
- [X] Implement end-to-end login and onboarding validation
- [X] Add live check for username availability during onboarding
- [X] Integrate Steam validation and flow within the product flow
- [X] Add Tebex product management API calls
- [X] Integrate ESLint and Prettier to enforce coding style
- [X] Setup `remix-utilities` for header IP fetching
- [X] Call Tebex API with user IP and UID to create and manage user basket
  - [X] Automatically add Premium Membership to user basket
- [X] Implement `remix-dev` for easier testing
- [X] Setup logout with user data cleanup
- [X] Setup validation/error handling for Tebex API
- [X] Add cookie session management for Tebex checkout API data
- [X] Document files across the project
- [X] Set up dev branch, rename master to production
- [X] Integrate TebexJS 1.0.0 for e-commerce checkout popup
- [X] Secure Steam integration
- [X] Finalize logout functionality with token invalidation
- [X] Finish registration process
- [X] Enforce cookie typing for checkout process
- [X] Setup protected dev branch for PR merges
- [X] Setup GitHub Action for ESLint compliance checks
- [X] Setup GitHub Action to build Docker image (`remix vite:build`)
- [X] Setup webhook action for server updates

### Upcoming Tasks
- [ ] Refactor other existing pages on ImperfectGamers.org
- [ ] Further enhance the integration of design tokens across components
- [ ] Expand the Tebex integration to support additional product types
- [ ] Optimize performance and loading times across all modules
- [ ] Extend authentication flows to include more third-party integrations
- [ ] Develop more comprehensive user analytics features
- [ ] Add jest / enzyme unit and integration test coverage across components

</details>

---

## 📄 License

```
/* © Imperfect and Company LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and Read-only, April 2024
 */
```

---

## 👏 Acknowledgments

Case Study / Strategic Partnership with [Tebex](https://www.tebex.io/).

<a href="https://imperfectgamers.org"><img src="https://cdn.imperfectgamers.org/inc/assets/img/textlogo.png" width="15" height="15" title="Imperfect Gamers" alt="Logo"></a> Copyright 2020 © <a href="https://imperfectgamers.org" target="_blank">Imperfect Gamers</a>.

[**Return**](#-quick-links)

---
