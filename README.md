# Kujira.js

This is a project to query JIRA via cli and return json, csv or tsv data as a result of the search

## Pre-requisites 

To get started you'll need to have the following requirements installed

- Git
- Node.js 6.0.0 or greater<sup>1</sup>
- npm

<sup>1</sup>See https://nodejs.org/

## Dependencies 

- jira-miner.js<sup>2</sup>
- prompt.js<sup>3</sup>
    
<sup>2</sup> See https://www.npmjs.com/package/jira-miner

<sup>3</sup> See https://www.npmjs.com/package/prompt

## Getting started
    
    git clone <this repo>
    cd into the new directory
	npm install
    
## Commands
     

    node app
    node target
    node populate
    node query 
    
```bash
$ node target
Enter username, password and url e.g. "issues.jboss.org"
-->:Enter your Jira Username: enterUserName
-->:Enter your Jira password: *********    
-->:Enter Jira URL e.g. "issues.jboss.org": issues.jboss.org
Command-line input received:
 username: enterUserName
 password: ********
 url: https://issues.jboss.org
stdout: { url: 'https://issues.jboss.org', user: 'enterUserName' } 'Successfu
lly targeted JIRA'

````

````bash
$ node populate    
-->:Enter the project name e.g. "RHMAP or RAINCATCH": RAINCATCH
 project: RAINCATCH
````