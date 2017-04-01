# Kujira.js

This is a project to query JIRA via cli and return json, csv or tsv data as a result of the search

## Pre-requisites 

To get started you'll need to have the following requirements installed

- Git
- Node.js 6.0.0 or greater<sup>1</sup>
- npm

<sup>1</sup>See https://nodejs.org/

## Dependencies 

- jira-miner <sup>2</sup>
- prompt <sup>3</sup>
- colors <sup>4</sup>
- readline-sync <sup>5</sup>
    
<sup>2</sup> See https://www.npmjs.com/package/jira-miner

<sup>3</sup> See https://www.npmjs.com/package/prompt

<sup>4</sup> See https://www.npmjs.com/package/colors

<sup>5</sup> See https://www.npmjs.com/package/readline-sync

## Getting started
    
    git clone <this repo>
    cd into the new directory
	npm install
    
## Commands
     

    node setup
    node kujira
   
Initial setup run 
```bash
$ node setup
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
   
-->:Enter the project name e.g. "RHMAP or RAINCATCH": RAINCATCH
 project: RAINCATCH
````

Stand alone query run 
```bash
$ node kujira
Enter format either json or csv ,enter for default tsv : json
Enter the field you wish to search for : Assignee
Enter the value you wish to search for : "Austin Cunningham"
Enter "y" quit or enter to continue :

```