/**
 * Created by austin on 17/03/2017.
 */

//search that finds issue type == Bug and takes a command line argument
// query search.js --key=RAINCATCH-623 --json
// jira-miner query search.js --issuetype=Bug

const search = [
  ctx => {
    const args = ctx.args;
    console.log(ctx.args);
    return ctx.collection.chain()
/*        .where(issue => {
          return issue['key'] === args.key;//command line key
        })*/
        .where (issue => {
          return issue['Issue Type'] === args.issuetype;
        })
        .where(issue => {
          return issue['key'] === 'RAINCATCH-623';
        });
 /*       .where(issue => {
          return issue['Issue Type'] === args.issuetype;//command line key
        })

        .where (issue => {
          return issue['Fix Version/s'] === args.fixVersion;
        });*/
  },
];

module.exports.query = search;

