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






