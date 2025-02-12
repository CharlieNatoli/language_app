# Charlie's language appp

## Intro

I spent a lot of time learning Spanish and Chinese back in school, and try to keep up my skills when I can. However, while I can get point across, I'm never sure if I'm speaking **well** - am I using the right words? the right grammar? Language apps like Duolingo, wile great for learning new languages at more basic level, didn't reallyhelp improve these more subtle and advanced areas.

Language app hopes to change that! You can now converse with an LLM in any language you want. As you go, the tool will also use LLMs to critique your writing, and point out new words you might not know.

Along the way, this also was a chance for me to learn to use React and Javascript, which I hadn't used extensively before.

## Loom Demo

https://www.loom.com/share/b81f46ca389244e9a269ec973a6a0a29?sid=f7b408f1-f32b-487a-994b-cac780a1aaaa

## App

<img src="https://github.com/CharlieNatoli/language_app/blob/master/assets/language_app_screenshot.png" alt="drawing" width="75%"/>

## Running Locally

Set up and run the frontend

- `git clone git@github.com:CharlieNatoli/language_app.git`
- `cd {folder for frontend repo}`
- `npm install`
- `npm run dev`

Set up and run the backend - see [GitHub repo](https://github.com/CharlieNatoli/language_app_backend)

- `git clone git@github.com:CharlieNatoli/language_app_backend.git`
- `cd {folder for backend repo}`
- create an API key with Anthropic
- `touch .env`
- add "ANTHROPIC_API_KEY={your_key}" to the .env file
- `source .venv/bin/activate`
  `flask run --host=0.0.0.0 --port=5001` (note that the frotnend currently expects to call port 5001)
