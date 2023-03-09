# The server side

## To run
1. Sign up for an api key at http://openai.com
2. [Put that key in a `.env` file](putting_your_key_in_a_dotenv_file)
3. `npm install`
4. `npm start`


## Putting your key in a dotenv file
To protect our keys, we should put them in a .env file. The server script [index.js](index.js) reads keys from that environment file.
Create a file called .env and make it look like this:
```bash
OPENAI_API_KEY=<Put your API KEY here>
```
Important: No white space at all on this line, especially around the `=` sign!
