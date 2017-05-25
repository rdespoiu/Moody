# Moody

### Overview
Moody is comprised of two parts, an API and a Chrome extension.

##### API
Powered by a Flask/Flask_Restful backend, Moody API accepts POST requests with text data as the payload. The API then passes that text into the NLTK (Natural Language Tool Kit) sentiment analyzer, which parses each word in the text corpus and returns a sentiment analysis, indicating how many words are positive, negative, neutral, and it also provides percentages for each category. This data is returned as JSON, which is parsed by the Chrome extension.

##### Chrome Extension
The Moody Chrome extension uses JavaScript and JQuery to take all text content from a webpage via:
```let pageContent = $('body').text();```

and sends a post request to the Moody API with that text via:
```$.post('api-endpoint-url', {'data': pageContent}```

Using the JSON that Moody API returns, Moody Chrome displays a modal with some information about the text on the current page.

Example:
![Alt text](https://raw.githubusercontent.com/rdespoiu/Moody/master/example.png)

The Moody API is deployed on AWS via ElasticBeanstalk and the Moody Chrome extension is not live.

##### Installation
* To install the Chrome extension locally, download the ```MoodyChrome``` directory from this repository.
* In Google Chrome, navigate to ```chrome://extensions```
* Select ```Load unpacked extension``` near the top of the page, and select the ```MoodyChrome``` directory from wherever you downloaded it.
* Open any webpage and you should see the Moody icon
* ![Alt text](https://raw.githubusercontent.com/rdespoiu/Moody/master/MoodyChrome/icon.png)
* Click the icon to analyze the website's contents!
(NOTE: Chrome will likely display a warning on the right side of the URL bar saying:
```This page is trying to load scripts from unauthenticated sources```
Select the option that lets you load the script anyway and click the icon again. This is due to the API not having HTTPS.
After you click the icon again, you should see a modal in the middle of your screen which displays sentiment analysis!
