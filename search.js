/**
 * Created by austin on 17/03/2017.
 */

//search that finds issue type == Bug and takes a command line argument
// query search.js --key=RAINCATCH-623 --json

const search = [
  ctx => {
    const args = ctx.args;
    console.log(ctx.args);
    return ctx.collection.chain()
    // find all epics with fix version
        .where(issue => {
          //console.log(issue['Fix Version/s'].includes(args.fixVersion));
          /*if (issue['Issue Type'] === 'Epic'){
           console.log(issue.key, issue.id);
           }*/
          return issue['Issue Type'] === 'Bug';
        })
        .where(issue => {
          return issue['key'] === args.key;//command line key
        });
  },
];

module.exports.query = search;

