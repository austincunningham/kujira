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
      .where(issue=> {
        if (args.issuetype) {
          return issue['Issue Type'] === args.issuetype;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.key) {
          return issue.key === args.key;//'RAINCATCH-623';
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.fixVersion) {
          return issue.fixVersion === args.fixVersion;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.resolution) {
          return issue.resolution === args.resolution;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.lastViewed) {
          return issue.lastViewed === args.lastViewed;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.priority) {
          return issue.priority === args.priority;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.labels) {
          return issue.labels === args.labels;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.timeestimate) {
          return issue.timeestimate === args.timeestimate;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.aggregatetimeoriginalestimate) {
          return issue.aggregatetimeoriginalestimate === args.aggregatetimeoriginalestimate;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.versions) {
          return issue.versions === args.versions;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.issuelinks) {
          return issue.issuelinks === args.issuelinks;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.Assignee) {
          return issue.Assignee === args.Assignee;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.Status) {
          return issue.Status === args.Status;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.components) {
          return issue.components === args.components;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.aggregatetimeestimate) {
          return issue.aggregatetimeestimate === args.aggregatetimeestimate;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.creator) {
          return issue.creator === args.creator;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.subtasks) {
          return issue.subtasks === args.subtasks;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.reporter) {
          return issue.reporter === args.reporter;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.aggregateprogress) {
          return issue.aggregateprogress === args.aggregateprogress;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.progress) {
          return issue.progress === args.progress;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.votes) {
          return issue.votes === args.votes;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.worklog) {
          return issue.worklog === args.worklog;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.timespent) {
          return issue.timespent === args.timespent;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.project) {
          return issue.project === args.project;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.aggregatetimespent) {
          return issue.aggregatetimespent === args.aggregatetimespent;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.resolutiondate) {
          return issue.resolutiondate === args.resolutiondate;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.workratio) {
          return issue.workratio === args.workratio;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.watches) {
          return issue.watches === args.watches;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.thumbnail) {
          return issue.thumbnail === args.thumbnail;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.created) {
          return issue.created === args.created;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.updated) {
          return issue.updated === args.updated;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.timeoriginalestimate) {
          return issue.timeoriginalestimate === args.timeoriginalestimate;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.description) {
          return issue.description === args.description;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.timetracking) {
          return issue.timetracking === args.timetracking;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.security) {
          return issue.security === args.security;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.attachment) {
          return issue.attachment === args.attachment;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.summary) {
          return issue.summary === args.summary;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.environment) {
          return issue.environment === args.environment;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.duedate) {
          return issue.duedate === args.duedate;
        }

        return issue === issue;
      })
      .where(issue => {
        if (args.comment) {
          return issue.comment === args.comment;
        }

        return issue === issue;
      });
  },
];

module.exports.query = search;

