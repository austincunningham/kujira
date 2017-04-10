/**
 * Created by austin on 17/03/2017.
 */

//search that finds issue type == Bug and takes a command line argument
// query api.js --key=RAINCATCH-623 --json
// jira-miner query api.js --issuetype=Bug

const search = [
  ctx => {
    const args = ctx.args;
    return ctx.collection.chain()
      .where(issue=> {
        if (args.issuetype) {
          return issue['Issue Type'] === args.issuetype;//e.g. Bug
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.key) {
          return issue.key === args.key;//e.g. 'RAINCATCH-623';
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.fixVersion) {
          return issue['Fix Version/s'].includes(args.fixVersion);//e.g. 3.17.0
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.resolution) {
          return issue.Resolution === args.resolution;//e.g. Done
        }

        return issue === issue;
      })
      .where(issue => {// seems to be a null field
        if (args.lastViewed) {
          return issue['Last Viewed'] === args.lastViewed;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.priority) {
          return issue.Priority === args.priority;//e.g. Major
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.labels) {
          return issue.labels.includes(args.labels);//search multiple labels, separating with comma
        } //e.g. ready_for_sprint,ready_for_story_pointing

        return issue === issue;
      })
      .where(issue => {
        if (args.timeestimate) {
          return issue.timeEstimate === args.timeestimate;//seems to be null field
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.aggregatetimeoriginalestimate) {//seems to be a null field
          return issue.aggregatetimeoriginalestimate === args.aggregatetimeoriginalestimate;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.versions) {
          return issue.versions === args.versions;//seems to be and empty array
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.issuelinks) {//search for individual linked issues
          return issue['Linked Issues'].includes(args.issuelinks);//e.g RAINCATCH-489
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.assignee) {
          return issue.Assignee === args.assignee;//need full name quotes e.g. "Austin Cunningham"
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.status) {
          return issue.Status === args.status;//e.g. Closed
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.components) {//search for individual components
          return issue['Component/s'].includes(args.components);//e.g. raincatcher-camera
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.aggregatetimeestimate) {
          return issue.aggregatetimeestimate === args.aggregatetimeestimate;//seems to be null field
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.creator) {//user name in quotes
          return issue.Creator === args.creator;//e.g. "Tom Jackman"
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.subtasks) {
          return issue.subtasks === args.subtasks;//e.g. RAINCATCH-230,RAINCATCH-231
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.reporter) {
          return issue.Reporter.includes(args.reporter);//e.g. "Tom Jackman"
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.aggregateprogress) {//Takes number
          return issue['Σ Progress'] === args.aggregateprogress;//e.g.  =0 or =<1
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.progress) {//Takes number
          return issue.progress === args.progress;//e.g.  =0 or =<1
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.votes) {//Takes number
          return issue.Votes === args.votes;//e.g. =0 or =<1
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.worklog) {
          return issue.worklog === args.worklog;//seems to be deprecated in jql
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.timespent) {
          return issue.timespent === args.timespent;//takes a number , but mostly null, 0 returns
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.project) {
          return issue.Project.includes(args.project);//e.g. RainCatcher or FeedHenry
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.aggregatetimespent) {//takes a number , but mostly null, 0 returns
          return issue.aggregatetimespent === args.aggregatetimespent;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.resolutiondate) {//you can search any date using the ~ , string builder doesn't cater for this
          return issue.Resolved === args.resolutiondate;//e.g. ~2016-11-24
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.workratio) {
          return issue.workratio === args.workratio;//takes a number , but mostly null, 0 returns
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.watches) {
          return issue.Watches === args.watches;//takes a number , but mostly null, 0 returns
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.thumbnail) {//looks to be deprecated
          return issue.Image === args.thumbnail;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.created) {//takes time stamp
          return issue.Created === args.created;//e.g. 2016-04-21T14:17:23.000Z
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.updated) {//takes exact timestamp
          return issue.Updated === args.updated;//e.g. 2016-11-22T10:48:39.000Z
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.timeoriginalestimate) {//takes a number , but mostly null, 0 returns
          return issue.timeoriginalestimate === args.timeoriginalestimate;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.description) {//you can search any string using the ~ for about
          return issue.Description === args.description;// e.g. comment~"raincatch"
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.timetracking) {//seems to be deprecated in jira
          return issue.timetracking === args.timetracking;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.security) {// takes a number but mostly null, 0 returns
          return issue.security === args.security;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.attachment) {//doesn't work here as is looking for IS EMPTY , IS NOT EMPTY
          return issue.attachment.includes(args.attachment);
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.summary) {// will take any string
          return issue.Summary.includes(args.summary);//e.g. raincatcher
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.environment) {
          return issue.Environment === args.environment;//seems to be a null field
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.duedate) {
          return issue.duedate === args.duedate;//seems to be a null field
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.comment) {// you can search any string using the ~ for about
          return issue.Comment === args.comment;//e.g. comment~"raincatch"
        }

        return issue === issue;
      });
  },
];

module.exports.query = search;

