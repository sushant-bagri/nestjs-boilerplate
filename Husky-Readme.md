<b>Note</b>: follow below steps if Husky fails to recognize eslint and prettier.

<h1> Basic Steps to follow </h1>
    * Add `env.test` file in root <br>
    * run command `npm install`

<br>
<h2> Enable Husky to run GitHooks</h2>
    * run command `export HUSKY=1`<br>
    <b>Note</b>: This is required to enable Husky to run Git-Hooks. if the value is `0` then Husky githooks won't run.

<br>
<h1> Troubleshooting </h1>
 <h2> Setup Eslint Globally if husky fails to recognize eslint after npm install </h2>
 * Install Eslint using `npm install -g eslint@7.32.0`

<br>
 <h2> Setup Prettier Globally if husky fails to recognize prettier after npm install </h2>
    * Install Prettier using npm install -g prettier
    
<br>

<h2> Additional...</h1>
Husky's Git hook scripts present in `.husky` directory might not be executable for the first time. To overcome this, run the following command to make the files executable:

```
chmod +x [git-hook-filename]
example: chmod +x pre-commit
```
