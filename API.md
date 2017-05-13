## API Documentation

This the Kujira API.It is built using JavaScript/Node.js, ExpressJS and the jira-miner npm.

** Target **
----
Added a successful login to the .jira-miner file on your home directory

* **URL**

  `/api/target`

* **Method:**

  `POST`

*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    "{ url: 'https://issues.jboss.org', user: 'jiraUsername' } 'Successfully targeted JIRA'\n"
    ```

* **Error Response:**

* **Code:** 200<br />
  **Content:**

  ```javascript
  { "" }
  ```

* **Sample Call:**

  ```javascript
  $.ajax({
    url: "/api/target",
    dataType: "json",
    type : "POST",
    body: {
           	"username": "jiraUsername",
            "password": "jiraPassword",
            "url": "issues.jboss.org"
           },
    success : function(r) {
      console.log(r);
    }
  });
  ```


**Populate**
----
  Successful populate downloads the results of a the JQL query entered in the body. The results are stored in
  the .jira-minerdb file in the $Home directory off your pc.

* **URL**

  `/api/populate`

* **Method:**

  `POST`

*  **URL Params**

   **Required:**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
     "Updated and stored collection default in \\Users\\$HOME\\.jira-minerdb\n"
    ```

* **Error Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    "{\"name\":\"jira-miner\",\"hostname\":\"PCHOSTNAME\",\"pid\":7788,\"level\":50,\"err\":{\"name\":\"StatusCodeError\",\"statusCode\":400,\"message\":\"400 - {\\\"errorMessages\\\":[\\\"The value 'Entered value' does not exist for the field 'project'.\\\"],\\\"errors\\\":{}}\",\"error\":{\"errorMessages\":[\"The value 'enteredValue' does not exist for the field 'project'.\"],\"errors\":{}},\"options\":{\"auth\":{\"user\":\"JiraUserName\",\"pass\":\"JiraPassword\"},\"rejectUnauthorized\":true,\"method\":\"POST\",\"uri\":\"https://issues.jboss.org:443/rest/api/2/search\",\"json\":true,\"followAllRedirects\":true,\"body\":{\"jql\":\"project in (enteredValue)\",\"maxResults\":1,\"startAt\":0,\"fields\":[\"*navigable\"],\"validateQuery\":true,\"expand\":[\"changelog\",\"names\"]},\"simple\":true,\"resolveWithFullResponse\":false},\"response\":{\"statusCode\":400,\"body\":\"[Circular]\",\"headers\":{\"server\":\"Apache-Coyote/1.1\",\"x-arequestid\":\"887x13713746x2\",\"x-asen\":\"SEN-1095081\",\"set-cookie\":[\"JSESSIONID=48B9AEC9700AADBB107CD6CF172A4D28; Path=/; HttpOnly\",\"atlassian.xsrf.token=AQZJ-FV3A-N91S-UDEU|cac2ab1c39329eb55dca9622f1f5c49d3de860e9|lin; Path=/\"],\"x-seraph-loginreason\":\"OK\",\"x-asessionid\":\"339ujm\",\"x-ausername\":\"JiraUserName\",\"cache-control\":\"no-cache, no-store, no-transform\",\"x-content-type-options\":\"nosniff\",\"content-type\":\"application/json;charset=UTF-8\",\"transfer-encoding\":\"chunked\",\"date\":\"Sat, 13 May 2017 18:47:09 GMT\",\"connection\":\"close\"},\"request\":{\"uri\":{\"protocol\":\"https:\",\"slashes\":true,\"auth\":null,\"host\":\"issues.jboss.org:443\",\"port\":\"443\",\"hostname\":\"issues.jboss.org\",\"hash\":null,\"search\":null,\"query\":null,\"pathname\":\"/rest/api/2/search\",\"path\":\"/rest/api/2/search\",\"href\":\"https://issues.jboss.org:443/rest/api/2/search\"},\"method\":\"POST\",\"headers\":{\"authorization\":\"Basic SomeKeyGoesHere=\",\"accept\":\"application/json\",\"content-type\":\"application/json\",\"content-length\":133}}}},\"query\":\"project in (enteredValue)\",\"msg\":\"Unable to fetch issues from JIRA\",\"time\":\"2017-05-13T18:47:03.215Z\",\"v\":0}\n"
    ```

* **Sample Call:**

  ```javascript
  $.ajax({
    url: "/api/populate",
    dataType: "json",
    type : "POST",
    body : {
           	"project":"ProjectName"
           },
    success : function(r) {
      console.log(r);
    }
  });
  ```



**Query**
----
  Passes a key value pair to the local .jira-minerdb file and returns the result of the search.

* **URL**

  `/api/query/`

* **Method:**

  `POST`

*  **URL Params**

   **Required:**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    [
    	{
    		"id": "12681043",
    		"self": "https://issues.jboss.org/rest/api/2/issue/12681043",
    		"key": "RAINCATCH-630",
    		"Fix Version/s": [
    			"3.17.0"
    		],
    		"Resolution": "Done",
    		"Fix Build": {
    			"self": "https://issues.jboss.org/rest/api/2/customFieldOption/11255",
    			"value": "RC1",
    			"id": "11255"
    		},
    		"Deployment Notes": null,
    		"Sprint": [
    			"com.atlassian.greenhopper.service.sprint.Sprint@1fdd4900[id=5820,rapidViewId=3504,state=CLOSED,name=IR301 - Monorail!,startDate=2017-03-10T11:17:23.728-05:00,endDate=2017-03-24T10:17:00.000-04:00,completeDate=2017-03-24T12:15:14.526-04:00,sequence=5820]"
    		],
    		"Last Viewed": "2017-05-12T22:58:38.632Z",
    		"Parent Link": null,
    		"Priority": "Major",
    		"Labels": [
    			"team-rmad"
    		],
    		"Security Sensitive Issue": [],
    		"Involved": [],
    		"Remaining Estimate": null,
    		"Σ Original Estimate": null,
    		"Target Release": null,
    		"Affects Version/s": [],
    		"Linked Issues": [],
    		"Assignee": "Austin Cunningham",
    		"Status": "Closed",
    		"Component/s": [
    			"raincatcher-demo-cloud",
    			"raincatcher-demo-mobile",
    			"raincatcher-workorder-angular"
    		],
    		"Tester": "Tom Jackman",
    		"Epic/Theme": [],
    		"Help Desk Ticket Reference": null,
    		"Number of comments": "6.0",
    		"Story Points": 3,
    		"Σ Remaining Estimate": null,
    		"Number of attachments": "0.0",
    		"Creator": "Niall Donnelly",
    		"Sub-Tasks": [],
    		"Reporter": "Niall Donnelly",
    		"Σ Progress": {
    			"progress": 0,
    			"total": 0
    		},
    		"Time in Status": "1_*:*_2_*:*_325279000_*|*_10007_*:*_1_*:*_17116000_*|*_3_*:*_2_*:*_316422000_*|*_6_*:*_1_*:*_0_*|*_10011_*:*_1_*:*_533012000_*|*_10015_*:*_1_*:*_3090353000",
    		"Date of First Comment": "2017-03-14T09:05:24.000Z",
    		"Team": null,
    		"Progress": {
    			"progress": 0,
    			"total": 0
    		},
    		"Votes": {
    			"self": "https://issues.jboss.org/rest/api/2/issue/RAINCATCH-630/votes",
    			"votes": 0,
    			"hasVoted": false
    		},
    		"Issue Type": "Task",
    		"Time Spent": null,
    		"Project": "FeedHenry RainCatcher",
    		"Σ Time Spent": null,
    		"Git Pull Request": [
    			"https://github.com/feedhenry-raincatcher/raincatcher-workorder-angular/pull/5"
    		],
    		"Flagged": [],
    		"Resolved": "2017-03-23T09:22:44.000Z",
    		"Work Ratio": -1,
    		"Watchers": {
    			"self": "https://issues.jboss.org/rest/api/2/issue/RAINCATCH-630/watchers",
    			"watchCount": 3,
    			"isWatching": true
    		},
    		"Created": "2017-03-09T19:04:11.000Z",
    		"Stackoverflow ID": null,
    		"Updated": "2017-04-28T08:33:53.000Z",
    		"Original Estimate": null,
    		"Description": "h3. What\r\n\r\nThis was an existing TODO in the Raincatcher workorder functionality to assign colors to the workorder \r\n\r\nhttps://github.com/feedhenry-raincatcher/raincatcher-workorder-angular/pull/1/files/19f0f0731c86c9330e5d731dcfe460905aa37ba7#diff-c74f899cd4e2dde477cf966b30036625R22",
    		"Rank (Obsolete)": "9223372036854775807",
    		"Summary": "Update the color class for the fh-wfm-workorder-angular module",
    		"Environment": null,
    		"Release Notes Text": null,
    		"SFDC Cases Links": null,
    		"SFDC Cases Counter": "0.0",
    		"Due Date": null,
    		"Epic Link": null,
    		"Release Notes Docs Status": null,
    		"Rank": "2|hybovr:",
    		"History": {
    			"Fix Version/s": [
    				{
    					"author": "Niall Donnelly",
    					"change": "2017-03-09T19:04:11.000Z",
    					"from": [],
    					"to": []
    				},
    				{
    					"author": "Austin Cunningham",
    					"change": "2017-03-23T05:22:44.000-0400",
    					"from": [],
    					"to": [
    						"3.17.0"
    					]
    				}
    			],
    			"Resolution": [
    				{
    					"author": "Niall Donnelly",
    					"change": "2017-03-09T19:04:11.000Z",
    					"from": null,
    					"to": null
    				},
    				{
    					"author": "Austin Cunningham",
    					"change": "2017-03-23T05:22:44.000-0400",
    					"from": null,
    					"to": "Done"
    				}
    			],
    			"Fix Build": [
    				{
    					"author": "Niall Donnelly",
    					"change": "2017-03-09T19:04:11.000Z",
    					"from": null,
    					"to": null
    				},
    				{
    					"author": "Peter Braun",
    					"change": "2017-04-27T10:49:26.000-0400",
    					"from": null,
    					"to": "RC1"
    				}
    			],
    			"Sprint": [
    				{
    					"author": "Niall Donnelly",
    					"change": "2017-03-09T19:04:11.000Z",
    					"from": [],
    					"to": []
    				},
    				{
    					"author": "Leigh Griffin",
    					"change": "2017-03-10T11:14:27.000-0500",
    					"from": [],
    					"to": [
    						"IR301 - Monorail!"
    					]
    				}
    			],
    			"Labels": [
    				{
    					"author": "Niall Donnelly",
    					"change": "2017-03-09T19:04:11.000Z",
    					"from": [],
    					"to": []
    				},
    				{
    					"author": "Tom Jackman",
    					"change": "2017-03-16T06:05:54.000-0400",
    					"from": [],
    					"to": [
    						"team-rmad"
    					]
    				}
    			],
    			"Assignee": [
    				{
    					"author": "Niall Donnelly",
    					"change": "2017-03-09T19:04:11.000Z",
    					"from": null,
    					"to": null
    				},
    				{
    					"author": "Austin Cunningham",
    					"change": "2017-03-13T09:25:05.000-0400",
    					"from": null,
    					"to": "Austin Cunningham"
    				},
    				{
    					"author": "Austin Cunningham",
    					"change": "2017-03-13T11:01:09.000-0400",
    					"from": "Austin Cunningham",
    					"to": null
    				},
    				{
    					"author": "Austin Cunningham",
    					"change": "2017-03-13T11:03:05.000-0400",
    					"from": null,
    					"to": "Austin Cunningham"
    				}
    			],
    			"Status": [
    				{
    					"author": "Niall Donnelly",
    					"change": "2017-03-09T19:04:11.000Z",
    					"from": "Open",
    					"to": "Open"
    				},
    				{
    					"author": "Austin Cunningham",
    					"change": "2017-03-13T09:25:27.000-0400",
    					"from": "Open",
    					"to": "Coding In Progress"
    				},
    				{
    					"author": "Austin Cunningham",
    					"change": "2017-03-15T06:40:30.000-0400",
    					"from": "Coding In Progress",
    					"to": "Pull Request Sent"
    				},
    				{
    					"author": "Austin Cunningham",
    					"change": "2017-03-21T10:44:02.000-0400",
    					"from": "Pull Request Sent",
    					"to": "Open"
    				},
    				{
    					"author": "Austin Cunningham",
    					"change": "2017-03-21T10:44:05.000-0400",
    					"from": "Open",
    					"to": "Coding In Progress"
    				},
    				{
    					"author": "Austin Cunningham",
    					"change": "2017-03-23T05:22:44.000-0400",
    					"from": "Coding In Progress",
    					"to": "Ready for QA"
    				},
    				{
    					"author": "Tom Jackman",
    					"change": "2017-03-23T10:08:00.000-0400",
    					"from": "Ready for QA",
    					"to": "Verified"
    				},
    				{
    					"author": "Peter Braun",
    					"change": "2017-04-28T04:33:53.000-0400",
    					"from": "Verified",
    					"to": "Closed"
    				}
    			],
    			"Component/s": [
    				{
    					"author": "Niall Donnelly",
    					"change": "2017-03-09T19:04:11.000Z",
    					"from": [],
    					"to": []
    				},
    				{
    					"author": "Tom Jackman",
    					"change": "2017-03-23T14:07:57.000Z",
    					"from": [],
    					"to": [
    						"raincatcher-demo-cloud"
    					]
    				},
    				{
    					"author": "Tom Jackman",
    					"change": "2017-03-23T14:07:57.000Z",
    					"from": [],
    					"to": [
    						"raincatcher-demo-mobile"
    					]
    				}
    			],
    			"Tester": [
    				{
    					"author": "Niall Donnelly",
    					"change": "2017-03-09T19:04:11.000Z",
    					"from": null,
    					"to": null
    				},
    				{
    					"author": "Tom Jackman",
    					"change": "2017-03-23T10:07:57.000-0400",
    					"from": null,
    					"to": "Tom Jackman"
    				}
    			],
    			"Git Pull Request": [
    				{
    					"author": "Niall Donnelly",
    					"change": "2017-03-09T19:04:11.000Z",
    					"from": null,
    					"to": null
    				},
    				{
    					"author": "Austin Cunningham",
    					"change": "2017-03-15T06:40:30.000-0400",
    					"from": null,
    					"to": "https://github.com/feedhenry-raincatcher/raincatcher-workorder-angular/pull/2"
    				},
    				{
    					"author": "Tom Jackman",
    					"change": "2017-03-16T06:05:46.000-0400",
    					"from": "https://github.com/feedhenry-raincatcher/raincatcher-workorder-angular/pull/2",
    					"to": "https://github.com/feedhenry-raincatcher/raincatcher-workorder-angular/pull/5"
    				}
    			],
    			"Rank (Obsolete)": [
    				{
    					"author": "Niall Donnelly",
    					"change": "2017-03-09T19:04:11.000Z",
    					"from": null,
    					"to": null
    				},
    				{
    					"author": "Niall Donnelly",
    					"change": "2017-03-09T16:04:09.000-0500",
    					"from": null,
    					"to": "Ranked higher"
    				},
    				{
    					"author": "Niall Donnelly",
    					"change": "2017-03-09T16:04:44.000-0500",
    					"from": null,
    					"to": "Ranked lower"
    				},
    				{
    					"author": "Brendan O Farrell",
    					"change": "2017-03-10T09:21:46.000-0500",
    					"from": null,
    					"to": "Ranked higher"
    				},
    				{
    					"author": "Brendan O Farrell",
    					"change": "2017-03-10T09:21:51.000-0500",
    					"from": null,
    					"to": "Ranked lower"
    				}
    			],
    			"Component Fix Version(s)": [
    				{
    					"author": "Niall Donnelly",
    					"change": "2017-03-09T19:04:11.000Z",
    					"from": null,
    					"to": null
    				},
    				{
    					"author": "Tom Jackman",
    					"change": "2017-03-23T14:07:57.000Z",
    					"from": null,
    					"to": "raincatcher-demo-cloud"
    				},
    				{
    					"author": "Tom Jackman",
    					"change": "2017-03-23T14:07:57.000Z",
    					"from": null,
    					"to": "raincatcher-demo-mobile"
    				}
    			],
    			"Rank": [
    				{
    					"author": "Niall Donnelly",
    					"change": "2017-03-09T19:04:11.000Z",
    					"from": null,
    					"to": null
    				},
    				{
    					"author": "Niall Donnelly",
    					"change": "2017-03-09T16:04:09.000-0500",
    					"from": null,
    					"to": "Ranked higher"
    				},
    				{
    					"author": "Niall Donnelly",
    					"change": "2017-03-09T16:04:44.000-0500",
    					"from": null,
    					"to": "Ranked lower"
    				},
    				{
    					"author": "Brendan O Farrell",
    					"change": "2017-03-10T09:21:46.000-0500",
    					"from": null,
    					"to": "Ranked higher"
    				},
    				{
    					"author": "Brendan O Farrell",
    					"change": "2017-03-10T09:21:51.000-0500",
    					"from": null,
    					"to": "Ranked lower"
    				}
    			]
    		},
    		"meta": {
    			"revision": 0,
    			"created": 1494697452407,
    			"version": 0
    		},
    		"$loki": 958
    	}
    ]
    ```

* **Error Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    []
    ```

* **Sample Call:**

  ```javascript
  $.ajax({
    url: "/api/query",
    dataType: "json",
    type : "POST",
    body: [
          	{
          		"field":"Assignee",
          		"value":"'Austin Cunningham'"	
          	},
          	{
          		"field":"key",
          		"value":"RAINCATCH-630"
          	}
          ],
    success : function(r) {
      console.log(r);
    }
  });
  ```
