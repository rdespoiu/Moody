chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") { getAnalysis(); }
});

let getAnalysis = () => {
  let pageContent = $('body').text();

  $.post("http://127.0.0.1:5000/", {'data': pageContent}, function(data, status) {
    console.log(`Status: ${status}`);
    console.log(data);
    createModal(data, status);
  });
}

let createModal = (data, status) => {
  $('html').append('<div id="dialog" title="Page Analysis"></div>');

  // Wrapper for append, so that you don't have to keep writing $('#dialog').append(.....)
  let addToDialog = (content) => { $('#dialog').append(content); };

  if (status === 'success') {
    // Get rounded number of positive, negative, and neutral words
    const numPos = Math.round(data.pos.total);
    const numNeg = Math.round(data.neg.total);
    const numNeu = Math.round(data.neu.total);

    // Get original number of words and total number of words that were able to be analyzed meaningfully
    const originalWords = Math.round(data.totalNumberOfWords);
    const analyzedWords = numPos + numNeg + numNeu;

    // Returns a percentage based on num and total
    let percentage = (num, total) => { return (num / total) * 100; };

    // Builds the total data sentence
    let totalSentenceBuilder = (type, num) => { return `<h4>Total: ${num} ${type} words</h4>` };

    // Builds the average data sentence
    let averageSentenceBuilder = (type, num, total) => { return `<h4>Average: ${percentage(num, total)}% of words were ${type}</h4>` };

    // Appends total and average sentences for each block (pos/neg/neu)
    let blockBuilder = (type, num, total) => {
      addToDialog(totalSentenceBuilder(type, num));
      addToDialog(averageSentenceBuilder(type, num, total));
    };

    // Header shows total number of words and how many were analyzed
    addToDialog(`<h3>Total number of words: ${originalWords}</h3>`);
    addToDialog(`<h3>Words able to be meaningfully analyzed: ${analyzedWords}`)

    // Displays total positive words and percentage of total
    addToDialog(`<br><h3>Positive</h3>`);
    blockBuilder('Positive', numPos, analyzedWords);

    // Displays total negative words and percentage of total
    addToDialog(`<br><h3>Negative</h3>`);
    blockBuilder('Negative', numNeg, analyzedWords);

    // Displays total neutral words and percentage of total
    addToDialog(`<br><h3>Neutral</h3>`);
    blockBuilder('Neutral', numNeu, analyzedWords);

    addToDialog(`
      <br>
        <h4>
          Since neutral words are much more common than words with positive polarities, it is difficult to see any meaningful analysis from these results.
          To get a meaningful analysis, we take out neutral words and look at the data this way.
        </h4>
    `);

    const adjAnalyzedWords = analyzedWords - numNeu;

    addToDialog(`<br><h3>Adjusted Analysis Without Neutral Words`);
    addToDialog(`<h3>Words able to be meaningfully analyzed: ${adjAnalyzedWords}`)

    // Displays total positive words and percentage of total
    addToDialog(`<br><h3>Positive</h3>`);
    blockBuilder('Positive', numPos, adjAnalyzedWords);

    // Displays total negative words and percentage of total
    addToDialog(`<br><h3>Negative</h3>`);
    blockBuilder('Negative', numNeg, adjAnalyzedWords);

  }

  else addToDialog(`<h3>An error occurred, sorry!</h3>`);


  const windowWidth = $(window).width();
  const windowHeight = $(window).height();

  const dialogWidth = windowWidth * 0.8;
  const dialogHeight = windowHeight * 0.8;

  $('#dialog').dialog({
    dialogClass: "no-close",
    width: dialogWidth,
    height: dialogHeight,
    buttons: [
      {
        text: "OK",
        click: function() { $(this).dialog("close"); }
      }
    ]
  });
}
