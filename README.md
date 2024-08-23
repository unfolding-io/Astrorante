# Astrorante | Astro + Storyblok CMS

[![License: CC BY-ND 4.0](https://img.shields.io/badge/License-CC_BY--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nd/4.0/)



## 📝 1. Setting up the .env file

rename the `env.txt` to `.env` and fill in your details

```
STORYBLOK_PREVIEW_TOKEN=XXX
STORYBLOK_PERSONAL_TOKEN=XXX
STORYBLOK_SPACE_ID=000000
LOCALE=en-US
CURRENCY=USD
SITE_LANG=en
```

Also add this to your netlify/vercel deploy settings.


### 🧰 2. Install dependencies

```bash
npm install
```

### 🛠️ 3. Start Development server

```bash
npm run dev
```

### 🔄 4. Sync your Storyblok Space

open `https://localhost:4321/setup`

And sync your Datasources, Components, and stories. it is best to first delete before syncing.

![Astrorante](https://astrorante.unfolding.io/screenshots/sync.png)

### ⚙️ 5. Add your site to the astro.config and set your adapter (vercel or netlify)


```javascript

export default defineConfig({
	site: 'https://your-website.com',
	output: "hybrid",
  	adapter: vercel(), // vercel() or netlify()

    ....

```
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Funfolding-io%2FAstrorante&env=STORYBLOK_PREVIEW_TOKEN,STORYBLOK_PERSONAL_TOKEN,STORYBLOK_SPACE_ID,LOCALE,CURRENCY,SITE_LANG&envDescription=envDescription%3DAll%20ENV%20variables%20are%20mandatory%3A%0A%20%20STORYBLOK_PREVIEW_TOKEN%3D%22Add%20your%20Storyblok%20API%20token%20for%20the%20new%20Space%20here%22%0A%20%20STORYBLOK_PERSONAL_TOKEN%3D%22Add%20your%20Storyblok%20Personal%20token%20here%22%0A%20%20STORYBLOK_SPACE_ID%3D%22Add%20your%20Storyblok%20Space%20ID%20for%20the%20new%20Space%20here%22%0A%20%20LOCALE%3D%22The%20locale%20of%20the%20content%2C%20eg.%20%27en-US%27%22%0A%20%20CURRENCY%3D%22The%20currency%20on%20your%20site%2C%20eg.%20%27USD%27%22%0A%20%20SITE_LANG%3D%22The%20language%20of%20your%20site%2C%20eg.%20%27en%27%22)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/unfolding-io/Astrorante)

## 🛸 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| -------------------------- | ------------------------------------------------ |
| `npm install`              | Installs dependencies                            |
| `npm run dev`              | Starts local dev server at `localhost:4321`      |
| `npm run build`            | Build your production site to `./dist/`          |
| `npm run preview`          | Preview your build locally, before deploying     |
| `npm run astro ...`        | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help`  | Get help using the Astro CL                      |

## 👀 Want to learn more about Astro?

Check out [Astro documentation](https://docs.astro.build) or jump into Astro's [Discord server](https://astro.build/chat).

## 📚 Tech Stack

Astro, Storyblok CMS, Vue, TailwindCSS

## 🛟 Support

If you encounter any issues or bugs, we encourage you to open an issue in the repository. To help us quickly address the problem, please provide detailed information about the bug and steps to reproduce it.

For those seeking priority assistance, we offer premium support services. Feel free to reach out to us by email at [hello@unfolding.io.](mailto:hello@unfolding.io.) We're here to help!


## ☕️ Want to Caffeinate your Developer? 

By [caffeinating](https://www.buymeacoffee.com/unfolding.io) your developer, you're not just getting the best out of them; you're also ensuring a cheerful and energetic work environment.😊

[![buymeacoffee](https://starfunnel.unfolding.io/screenshots/bymeacoffee.webp)](https://www.buymeacoffee.com/unfolding.io)


## 📸 Screenshots

![Astrorante](https://astrorante.unfolding.io/screenshots/Screenshot_0.png)
![Astrorante](https://astrorante.unfolding.io/screenshots/Screenshot_1.png)
![Astrorante](https://astrorante.unfolding.io/screenshots/Screenshot_2.png)
![Astrorante](https://astrorante.unfolding.io/screenshots/Screenshot_3.png)
![Astrorante](https://astrorante.unfolding.io/screenshots/Screenshot_4.png)
![Astrorante](https://astrorante.unfolding.io/screenshots/Screenshot_5.png)
![Astrorante](https://astrorante.unfolding.io/screenshots/sync.png)






